import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from './db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Optimize bcrypt rounds for development vs production
const BCRYPT_ROUNDS = process.env.NODE_ENV === 'production' ? 12 : 6; // Reduced for faster dev

export interface AuthUser {
  id: string;
  email: string;
  isAdmin?: boolean;
}

// Cache for user data to reduce database calls
const userCache = new Map<string, { user: Record<string, unknown>; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Generate JWT token
export function generateToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
}

// Get user from request (server-side)
export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  const token = req.cookies.get('auth-token')?.value;
  if (!token) return null;
  
  return verifyToken(token);
}

// Get user from cookies (server-side)
export async function getAuthUserFromCookies(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  if (!token) return null;
  
  return verifyToken(token);
}

// Get user with caching - optimized for login
async function getCachedUser(email: string, skipCache = false) {
  if (!skipCache) {
    const cached = userCache.get(email);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.user;
    }
  }
  
  await dbConnect();
  const user = await User.findOne({ email }).lean();
  
  if (user) {
    userCache.set(email, { user, timestamp: Date.now() });
  }
  
  return user;
}

// Clear user cache
export function clearUserCache(email?: string) {
  if (email) {
    userCache.delete(email);
  } else {
    userCache.clear();
  }
}

// Login function - optimized for speed
export async function loginUser(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    const user = await getCachedUser(email, true); // Skip cache for login to get fresh data
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    const authUser: AuthUser = {
      id: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin
    };
    
    return { success: true, user: authUser };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }
}

// Register function
export async function registerUser(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    await dbConnect();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }
    
    // Hash password with optimized rounds
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    
    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      isAdmin: false
    });
    
    const authUser: AuthUser = {
      id: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin
    };
    
    // Clear cache for this user
    clearUserCache(email);
    
    return { success: true, user: authUser };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, error: 'Registration failed' };
  }
} 
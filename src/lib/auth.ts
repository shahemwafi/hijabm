import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from './db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Optimize bcrypt rounds for faster performance
const BCRYPT_ROUNDS = process.env.NODE_ENV === 'production' ? 10 : 4; // Further reduced for faster dev

export interface AuthUser {
  id: string;
  email: string;
  isAdmin?: boolean;
}

// Enhanced cache for user data with better performance
const userCache = new Map<string, { user: Record<string, unknown>; timestamp: number }>();
const CACHE_DURATION = 3 * 60 * 1000; // Reduced to 3 minutes for fresher data

// Generate JWT token with optimized settings
export function generateToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { 
    expiresIn: '7d',
    algorithm: 'HS256' // Explicitly set algorithm for better performance
  });
}

// Verify JWT token with optimized settings
export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as AuthUser;
  } catch {
    return null;
  }
}

// Get user from request (server-side) - optimized
export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  const token = req.cookies.get('auth-token')?.value;
  if (!token) return null;
  
  return verifyToken(token);
}

// Get user from cookies (server-side) - optimized
export async function getAuthUserFromCookies(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  if (!token) return null;
  
  return verifyToken(token);
}

// Get user with enhanced caching - optimized for performance
async function getCachedUser(email: string, skipCache = false) {
  if (!skipCache) {
    const cached = userCache.get(email);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.user;
    }
  }
  
  await dbConnect();
  // Use lean() and select only needed fields for better performance
  const user = await User.findOne({ email })
    .select('_id email password isAdmin')
    .lean()
    .exec();
  
  if (user && !Array.isArray(user)) {
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

// Login function - highly optimized for speed
export async function loginUser(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    const user = await getCachedUser(email, true); // Skip cache for login to get fresh data
    if (!user || Array.isArray(user)) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password as string);
    if (!isValidPassword) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    const authUser: AuthUser = {
      id: String(user._id),
      email: user.email as string,
      isAdmin: user.isAdmin as boolean
    };
    
    return { success: true, user: authUser };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }
}

// Register function - optimized
export async function registerUser(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    await dbConnect();
    
    // Check if user already exists with optimized query
    const existingUser = await User.findOne({ email }).select('_id').lean();
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }
    
    // Hash password with optimized rounds
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    
    // Create user with optimized settings
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
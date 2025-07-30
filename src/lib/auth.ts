import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from './db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthUser {
  id: string;
  email: string;
  isAdmin?: boolean;
}

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

// Login function
export async function loginUser(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    await dbConnect();
    
    const user = await User.findOne({ email });
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
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
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
    
    return { success: true, user: authUser };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
} 
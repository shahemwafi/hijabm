import { NextRequest, NextResponse } from 'next/server';
import { loginUser, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    console.log(`[${requestId}] Login attempt for: ${email}`);
    const result = await loginUser(email, password);
    
    if (!result.success) {
      const endTime = Date.now();
      console.log(`[${requestId}] Login failed for ${email} in ${endTime - startTime}ms`);
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    // Generate token with optimized settings
    const token = generateToken(result.user!);
    
    // Create response with optimized cookie settings
    const response = NextResponse.json({ 
      success: true, 
      user: result.user,
      message: 'Login successful'
    });

    // Set HTTP-only cookie with optimized settings
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    const endTime = Date.now();
    console.log(`[${requestId}] Login successful for ${email} in ${endTime - startTime}ms`);
    
    return response;
  } catch (error) {
    const endTime = Date.now();
    console.error(`[${requestId}] Login API error in ${endTime - startTime}ms:`, error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
} 
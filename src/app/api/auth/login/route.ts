import { NextRequest, NextResponse } from 'next/server';
import { loginUser, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    console.log(`Login attempt for: ${email}`);
    const result = await loginUser(email, password);

    if (!result.success) {
      console.log(`Login failed for ${email}: ${result.error}`);
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken(result.user!);

    // Create response with cookie
    const response = NextResponse.json({ 
      message: 'Login successful',
      user: result.user 
    });

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    const endTime = Date.now();
    console.log(`Login successful for ${email} in ${endTime - startTime}ms`);

    return response;
  } catch (error) {
    const endTime = Date.now();
    console.error(`Login API error in ${endTime - startTime}ms:`, error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
} 
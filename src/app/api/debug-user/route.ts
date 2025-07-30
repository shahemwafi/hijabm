import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser(req);
    
    if (!authUser) {
      return NextResponse.json({ 
        authenticated: false,
        message: 'No authenticated user found'
      });
    }

    // Get full user data from database
    await dbConnect();
    const dbUser = await User.findOne({ email: authUser.email });

    return NextResponse.json({
      authenticated: true,
      authUser: authUser,
      dbUser: dbUser ? {
        email: dbUser.email,
        isAdmin: dbUser.isAdmin,
        id: dbUser._id
      } : null,
      message: 'User found'
    });
  } catch (error) {
    console.error('Debug user error:', error);
    return NextResponse.json({ 
      error: 'Failed to debug user',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 
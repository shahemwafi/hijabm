import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get latest admin status from database
    try {
      await dbConnect();
      const dbUser = await User.findOne({ email: user.email }).select('isAdmin').lean();
      
      if (dbUser) {
        return NextResponse.json({ 
          user: {
            ...user,
            isAdmin: dbUser.isAdmin
          }
        });
      }
    } catch (dbError) {
      console.error('Database error in /api/auth/me:', dbError);
      // Fall back to JWT data if database fails
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
} 
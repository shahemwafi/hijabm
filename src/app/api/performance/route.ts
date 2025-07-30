import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Test database connection with detailed timing
    const dbStartTime = Date.now();
    await dbConnect();
    const dbEndTime = Date.now();
    
    // Test a simple query for performance
    const queryStartTime = Date.now();
    const User = (await import('@/models/User')).default;
    const userCount = await User.countDocuments().lean();
    const queryEndTime = Date.now();
    
    const totalTime = Date.now() - startTime;
    const dbTime = dbEndTime - dbStartTime;
    const queryTime = queryEndTime - queryStartTime;
    
    return NextResponse.json({
      success: true,
      performance: {
        totalResponseTime: totalTime,
        databaseConnectionTime: dbTime,
        databaseQueryTime: queryTime,
        userCount: userCount,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        optimizations: {
          bcryptRounds: process.env.NODE_ENV === 'production' ? 10 : 4,
          cacheDuration: '3 minutes',
          connectionPool: '20 max, 2 min',
          compression: 'enabled'
        }
      },
      status: 'healthy'
    });
  } catch (error) {
    const totalTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: false,
      performance: {
        totalResponseTime: totalTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      status: 'error'
    }, { status: 500 });
  }
} 
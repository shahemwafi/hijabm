import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Test database connection
    const dbStartTime = Date.now();
    await dbConnect();
    const dbEndTime = Date.now();
    
    const totalTime = Date.now() - startTime;
    const dbTime = dbEndTime - dbStartTime;
    
    return NextResponse.json({
      success: true,
      performance: {
        totalResponseTime: totalTime,
        databaseConnectionTime: dbTime,
        timestamp: new Date().toISOString()
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
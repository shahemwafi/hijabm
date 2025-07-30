import { NextResponse } from "next/server";
import { testEmailConnection } from "@/lib/email";

export async function GET() {
  try {
    // Check environment variables
    const emailService = process.env.EMAIL_SERVICE;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    console.log('Email configuration check:', {
      service: emailService,
      user: emailUser,
      hasPassword: !!emailPass
    });

    const isConnected = await testEmailConnection();
    
    if (isConnected) {
      return NextResponse.json({ 
        success: true, 
        message: "Email connection verified successfully",
        configured: true,
        config: {
          service: emailService,
          user: emailUser,
          hasPassword: !!emailPass
        }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "Email connection failed. Check your credentials.",
        configured: false,
        config: {
          service: emailService,
          user: emailUser,
          hasPassword: !!emailPass
        }
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Email test error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Email test failed",
      error: error instanceof Error ? error.message : "Unknown error",
      configured: false
    }, { status: 500 });
  }
} 
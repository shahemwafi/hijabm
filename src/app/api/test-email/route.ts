import { NextResponse } from "next/server";
import { testEmailConnection } from "@/lib/email";

export async function GET() {
  try {
    const isConnected = await testEmailConnection();
    
    if (isConnected) {
      return NextResponse.json({ 
        success: true, 
        message: "Email connection verified successfully",
        configured: true
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "Email connection failed. Check your credentials.",
        configured: false
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
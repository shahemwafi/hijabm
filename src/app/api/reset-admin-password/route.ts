import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await dbConnect();
    
    // Find the user with shahemwafi06@gmail.com
    const user = await User.findOne({ email: "shahemwafi06@gmail.com" });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Set a new password: admin123
    const hashedPassword = await bcrypt.hash("admin123", 10);
    user.password = hashedPassword;
    user.isAdmin = true;
    await user.save();
    
    return NextResponse.json({ 
      message: "Password reset successfully for shahemwafi06@gmail.com",
      newPassword: "admin123",
      user: { email: user.email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
} 
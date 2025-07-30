import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await dbConnect();
    
    // Check if user already exists
    let user = await User.findOne({ email: "hijabmarriagebureau@gmail.com" });
    
    if (user) {
      // Update existing user
      const hashedPassword = await bcrypt.hash("hijab786#", 10);
      user.password = hashedPassword;
      user.isAdmin = true;
      await user.save();
      
      return NextResponse.json({ 
        message: "Admin user updated successfully for hijabmarriagebureau@gmail.com",
        password: "hijab786#",
        user: { email: user.email, isAdmin: user.isAdmin }
      });
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash("hijab786#", 10);
      user = await User.create({
        email: "hijabmarriagebureau@gmail.com",
        password: hashedPassword,
        isAdmin: true
      });
      
      return NextResponse.json({ 
        message: "Admin user created successfully for hijabmarriagebureau@gmail.com",
        password: "hijab786#",
        user: { email: user.email, isAdmin: user.isAdmin }
      });
    }
  } catch (error) {
    console.error("Setup hijab admin error:", error);
    return NextResponse.json({ error: "Failed to setup hijab admin" }, { status: 500 });
  }
} 
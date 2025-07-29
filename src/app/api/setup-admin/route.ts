import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await dbConnect();
    
    // Find the user with shahemwafi06@gmail.com
    const user = await User.findOne({ email: "shahemwafi06@gmail.com" });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Set as admin
    user.isAdmin = true;
    await user.save();
    
    return NextResponse.json({ 
      message: "Admin privileges granted to shahemwafi06@gmail.com",
      user: { email: user.email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    console.error("Setup admin error:", error);
    return NextResponse.json({ error: "Failed to setup admin" }, { status: 500 });
  }
} 
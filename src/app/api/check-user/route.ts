import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    
    const user = await User.findOne({ email: "shahemwafi06@gmail.com" });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      email: user.email,
      isAdmin: user.isAdmin,
      id: user._id,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to check user" }, { status: 500 });
  }
} 
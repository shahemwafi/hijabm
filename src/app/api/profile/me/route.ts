import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser(req);
    if (!authUser || !authUser.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await dbConnect();

    // Find the user by email
    const user = await User.findOne({ email: authUser.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the user's profile
    const profile = await Profile.findOne({ user: user._id }).lean();
    
    if (!profile) {
      return NextResponse.json({ profile: null });
    }

    // Convert ObjectId to string for JSON serialization
    const profileWithStringId = {
      ...profile,
      _id: profile._id.toString(),
      user: profile.user.toString(),
      createdAt: profile.createdAt ? new Date(profile.createdAt).toISOString() : new Date().toISOString()
    };

    return NextResponse.json({ profile: profileWithStringId });
  } catch (error) {
    console.error("Get user profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
} 
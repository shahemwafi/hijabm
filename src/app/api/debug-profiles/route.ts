import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    // Get all profiles
    const profiles = await Profile.find({}).lean();
    const users = await User.find({}).lean();

    // Convert ObjectIds to strings for JSON serialization
    const profilesWithStringIds = profiles.map(profile => ({
      ...profile,
      _id: String(profile._id),
      user: String(profile.user),
      createdAt: profile.createdAt ? new Date(profile.createdAt).toISOString() : new Date().toISOString()
    }));

    const usersWithStringIds = users.map(user => ({
      ...user,
      _id: String(user._id),
      createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString()
    }));

    return NextResponse.json({
      totalProfiles: profiles.length,
      totalUsers: users.length,
      profiles: profilesWithStringIds,
      users: usersWithStringIds
    });
  } catch (error) {
    console.error("Debug profiles error:", error);
    return NextResponse.json(
      { error: "Failed to fetch debug info" },
      { status: 500 }
    );
  }
} 
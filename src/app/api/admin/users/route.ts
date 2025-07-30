import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getAuthUserFromCookies } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    
    // Check if user is admin
    const authUser = await getAuthUserFromCookies();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: authUser.email });
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    // Fetch all users with basic info
    const users = await User.find({})
      .select('_id email isAdmin createdAt')
      .sort({ createdAt: -1 })
      .lean();

    // Convert _id to string for serialization
    const safeUsers = users.map(user => ({
      ...user,
      _id: (user._id as { toString(): string }).toString(),
      createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : '',
      status: "active" // Default status, you can add status field to User model if needed
    }));

    return NextResponse.json({ users: safeUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
} 
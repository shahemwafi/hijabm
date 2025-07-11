import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import { containsContactInfo } from "@/lib/validate";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    if (process.env.MOCK_MODE === "true") {
      return NextResponse.json({
        message: "Mock profile submitted successfully",
        profileId: "mock-id",
      });
    }
    await dbConnect();
    const formData = await req.formData();

    // Extract fields
    const name = formData.get("name") as string;
    const gender = formData.get("gender") as string;
    const age = formData.get("age") as string;
    const maritalStatus = formData.get("maritalStatus") as string;
    const height = formData.get("height") as string;
    const country = formData.get("nationality") as string;
    const city = formData.get("currentCity") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    // Validate required fields
    const requiredFields = {
      name,
      gender,
      age,
      maritalStatus,
      height,
      country,
      city,
      description,
    };
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
      if (containsContactInfo(value)) {
        return NextResponse.json(
          { error: `Contact info is not allowed in ${field}` },
          { status: 400 }
        );
      }
    }
    if (!image) {
      return NextResponse.json(
        { error: "Profile image is required" },
        { status: 400 }
      );
    }

    
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const email = session.user.email;
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const existingUser = await User.findOne({
      email
    });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const existingProfile = await Profile.findOne({
      user: existingUser._id,
    });
    
    if (existingProfile) {
      return NextResponse.json(
        { error: "You already have a profile" },
        { status: 400 }
      );
    }
    // Upload image to Cloudinary
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "hijabm-profiles" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });
    // Save profile to MongoDB
    const profile = new Profile({
      name,
      gender,
      age: Number(age),
      maritalStatus,
      height,
      country,
      city,
      description,
      imageUrl: (uploadResult as { secure_url: string }).secure_url,
      status: "pending",
      user: existingUser._id, 
    });
    await profile.save();

    console.log("Saved profile:", profile);
    return NextResponse.json({
      message: "Profile submitted successfully",
      profileId: profile._id,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
    return NextResponse.json(error, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const filter: Record<string, unknown> = {};
  if (status) {
    filter.status = status;
  }

  try {
    const profiles = await Profile.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ profiles });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}
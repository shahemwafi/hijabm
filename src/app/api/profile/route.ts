import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { getAuthUser } from "@/lib/auth";
import { containsContactInfo } from "@/lib/validate";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Personal Information
    const name = formData.get("name") as string;
    const gender = formData.get("gender") as string;
    const age = formData.get("age") as string;
    const maritalStatus = formData.get("maritalStatus") as string;
    const height = formData.get("height") as string;
    const weight = formData.get("weight") as string;
    const color = formData.get("color") as string;
    const disability = formData.get("disability") as string;
    const nationality = formData.get("nationality") as string;

    // Education & Career
    const qualification = formData.get("qualification") as string;
    const college = formData.get("college") as string;
    const university = formData.get("university") as string;
    const rank = formData.get("rank") as string;
    const income = formData.get("income") as string;
    const natureOfJob = formData.get("natureOfJob") as string;
    const futurePlans = formData.get("futurePlans") as string;

    // Family Information
    const religion = formData.get("religion") as string;
    const caste = formData.get("caste") as string;
    const sect = formData.get("sect") as string;
    const home = formData.get("home") as string;
    const size = formData.get("size") as string;
    const propertyLocation = formData.get("propertyLocation") as string;
    const otherProperties = formData.get("otherProperties") as string;
    const fatherOccupation = formData.get("fatherOccupation") as string;
    const motherOccupation = formData.get("motherOccupation") as string;
    const brothers = formData.get("brothers") as string;
    const sisters = formData.get("sisters") as string;
    const marriedSiblings = formData.get("marriedSiblings") as string;

    // Address
    const currentCity = formData.get("currentCity") as string;
    const homeTown = formData.get("homeTown") as string;
    const addressLocation = formData.get("addressLocation") as string;

    // Requirements
    const reqAgeLimit = formData.get("reqAgeLimit") as string;
    const reqHeight = formData.get("reqHeight") as string;
    const reqCity = formData.get("reqCity") as string;
    const reqCaste = formData.get("reqCaste") as string;
    const reqQualification = formData.get("reqQualification") as string;
    const reqOther = formData.get("reqOther") as string;

    // Other fields
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    // Validate required fields
    const requiredFields = {
      name,
      gender,
      age,
      maritalStatus,
      height,
      nationality,
      currentCity,
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

    // Get authenticated user
    const authUser = await getAuthUser(req);
    if (!authUser || !authUser.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await User.findOne({
      email: authUser.email
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

    // Save profile to MongoDB with all fields
    const profile = new Profile({
      name,
      gender,
      age: Number(age),
      maritalStatus,
      height,
      weight,
      color,
      disability,
      nationality,
      qualification,
      college,
      university,
      rank,
      income,
      natureOfJob,
      futurePlans,
      religion,
      caste,
      sect,
      home,
      size,
      propertyLocation,
      otherProperties,
      fatherOccupation,
      motherOccupation,
      brothers,
      sisters,
      marriedSiblings,
      currentCity,
      homeTown,
      addressLocation,
      reqAgeLimit,
      reqHeight,
      reqCity,
      reqCaste,
      reqQualification,
      reqOther,
      description,
      imageUrl: (uploadResult as { secure_url: string }).secure_url,
      status: "pending",
      user: existingUser._id,
    });
    await profile.save();

    console.log("Saved profile:", profile);
    return NextResponse.json({
      message: "Profile submitted successfully"
    });
  } catch (error) {
    console.error("Profile submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit profile" },
      { status: 500 }
    );
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
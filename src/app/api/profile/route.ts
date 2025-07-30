import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { getAuthUser } from "@/lib/auth";
import { containsContactInfo } from "@/lib/validate";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    console.log(`[${requestId}] Profile submission started`);
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

    // Validate required fields with optimized validation
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

    // Get authenticated user with optimized query
    const authUser = await getAuthUser(req);
    if (!authUser || !authUser.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Find user with optimized query
    const user = await User.findOne({ email: authUser.email }).select('_id').lean() as { _id: string } | null;
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if profile already exists with optimized query
    const existingProfile = await Profile.findOne({ user: user._id }).select('_id').lean();
    if (existingProfile) {
      return NextResponse.json(
        { error: "Profile already exists" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary with optimized settings
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "profiles",
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto", fetch_format: "auto" }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(imageBuffer);
    });

    const uploadResult = await uploadPromise as { secure_url: string };
    const imageUrl = uploadResult.secure_url;

    // Create profile with optimized settings
    const profile = await Profile.create({
      user: user._id,
      name,
      gender,
      age: parseInt(age),
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
      image: imageUrl,
      status: "pending",
      paymentStatus: "pending",
      portfolioVisible: false,
    });

    const endTime = Date.now();
    console.log(`[${requestId}] Profile submission successful in ${endTime - startTime}ms`);

    return NextResponse.json({
      success: true,
      message: "Profile submitted successfully",
      profileId: profile._id.toString(),
    });
  } catch (error) {
    const endTime = Date.now();
    console.error(`[${requestId}] Profile submission error in ${endTime - startTime}ms:`, error);
    return NextResponse.json(
      { error: "Profile submission failed" },
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
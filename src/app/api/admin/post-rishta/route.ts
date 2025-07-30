import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
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
    const AccountHolder = formData.get("AccountHolder") as string;

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
    }
    
    if (!image) {
      return NextResponse.json(
        { error: "Profile image is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Upload image to Cloudinary
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

    // Create profile with admin privileges (auto-approved)
    const profile = await Profile.create({
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
      status: "approved", // Auto-approved when posted by admin
      paymentStatus: "paid", // Auto-marked as paid
      portfolioVisible: true,
      AccountHolder,
      user: null, // No user associated since it's admin-posted
    });

    return NextResponse.json({
      success: true,
      message: "Rishta profile posted successfully by admin",
      profileId: profile._id.toString(),
    });
  } catch (error) {
    console.error("Admin rishta posting error:", error);
    return NextResponse.json(
      { error: "Failed to post rishta profile" },
      { status: 500 }
    );
  }
} 
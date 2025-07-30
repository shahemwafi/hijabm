import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const paymentScreenshot = formData.get("paymentScreenshot") as File;
    const AccountHolder = formData.get("AccountHolder") as string;

    if (!paymentScreenshot) {
      return NextResponse.json(
        { error: "Payment screenshot is required" },
        { status: 400 }
      );
    }

    if (!AccountHolder) {
      return NextResponse.json(
        { error: "Account holder name is required" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const authUser = await getAuthUser(req);
    if (!authUser || !authUser.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const existingUser = await User.findOne({
      email: authUser.email,
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const profile = await Profile.findOne({ user: existingUser._id });

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    if (profile.paymentStatus === "paid") {
      return NextResponse.json(
        { error: "Payment already completed" },
        { status: 400 }
      );
    }

    // Upload payment screenshot to Cloudinary
    const arrayBuffer = await paymentScreenshot.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "hijabm-payments" }, (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error("Upload failed"));
        })
        .end(buffer);
    });

    // Update profile with payment information
    profile.paymentScreenshot = uploadResult.secure_url;
    profile.AccountHolder = AccountHolder;
    profile.paymentStatus = "pending";
    await profile.save();

    return NextResponse.json({
      message: "Payment screenshot uploaded successfully"
    });
  } catch (error) {
    console.error("Payment upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload payment screenshot" },
      { status: 500 }
    );
  }
}

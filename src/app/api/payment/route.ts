import Profile from "@/models/Profile";
import dbConnect from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";


export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("screenshot") as File | null;
    const name = formData.get("name") as string | null;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await User.findOne({
      email: session.user?.email,
    });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!file) {
      return NextResponse.json(
        { error: "No screenshot uploaded." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // Upload to Cloudinary
    const uploadResult = await new Promise<unknown>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "payments" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // Update profile paymentStatus, paymentScreenshot, and AccountHolder in DB
    // Update profile paymentStatus, paymentScreenshot, and AccountHolder in DB
    await dbConnect();
    await Profile.findOneAndUpdate(
      { user: existingUser._id },
      {
        paymentStatus: "paid",
        paymentScreenshot: uploadResult.secure_url,
        ...(name && { AccountHolder: name }), // Only update AccountHolder if provided
      }
    );

    return NextResponse.json({
      message: "Screenshot uploaded and payment status updated.",
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

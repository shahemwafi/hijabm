import Profile from "@/models/Profile";
import dbConnect from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("screenshot") as File | null;
    const name = formData.get("name") as string | null;
    const profileId = formData.get("profileId") as string | null;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json(
        { error: "No screenshot uploaded." },
        { status: 400 }
      );
    }

    if (!profileId) {
      return NextResponse.json(
        { error: "No profileId provided." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "payments" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // Update profile paymentStatus, paymentScreenshot, and AccountHolder in DB
    await dbConnect();
    await Profile.findByIdAndUpdate(
      profileId,
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
    return NextResponse.json( error , { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User exists" }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  return NextResponse.json({ success: true }, { status: 201 });
}
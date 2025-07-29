import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      session: session,
      user: session?.user,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isAdmin: (session?.user as any)?.isAdmin,
      hasSession: !!session,
    });
  } catch {
    return NextResponse.json({ error: "Failed to get session" }, { status: 500 });
  }
} 
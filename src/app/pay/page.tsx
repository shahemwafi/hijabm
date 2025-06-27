import PayPage from "@/components/Postishta";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RegisterPage() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const existingUser = await User.findOne({
    email: session.user?.email,
  });
  let step = 1;
  const profile = await Profile.findOne({ user: existingUser._id });
  if (profile) {
    if (profile.paymentStatus === "paid") {
      step = 3;
    } else {
      step = 2;
    }
  }
  return <PayPage CurrentStep={step} />;
}

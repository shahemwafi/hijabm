import PayPage from "@/components/Postishta";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { getAuthUserFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  await dbConnect();
  const user = await getAuthUserFromCookies();

  if (!user) {
    redirect("/login");
  }

  const existingUser = await User.findOne({
    email: user.email,
  });
  
  if (!existingUser) {
    redirect("/login");
  }

  let step = 1;
  const profile = await Profile.findOne({ user: existingUser._id });
  if (profile) {
    if (profile.paymentStatus === "paid") {
      step = 3;
    } else {
      step = 2;
    }
  }
  return <PayPage CurrentStep={step} profile={profile} />;
}

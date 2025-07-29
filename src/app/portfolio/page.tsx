import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';
import Profiles from '@/components/Profiles';
import { IProfile } from '@/models/Profile';

export default async function PortfolioPageServer() {
  await dbConnect();
  const profiles = await Profile.find({ status: 'approved' }).sort({ createdAt: -1 }).lean();
  // Convert _id and createdAt to string for serialization
  const safeProfiles = profiles.map((profile: IProfile) => ({
    ...profile,
    _id: profile._id.toString(),
    createdAt: profile.createdAt ? new Date(profile.createdAt).toISOString() : '',
  }));
  return <Profiles profiles={safeProfiles} />;
}

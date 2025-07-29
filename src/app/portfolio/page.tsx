import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';
import Profiles from '@/components/Profiles';

export default async function PortfolioPageServer() {
  await dbConnect();
  const profiles = await Profile.find({ status: 'approved' }).sort({ createdAt: -1 }).lean();
  // Convert _id and createdAt to string for serialization
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeProfiles = profiles.map((profile: any) => ({
    ...profile,
    _id: profile._id.toString(),
    createdAt: profile.createdAt ? new Date(profile.createdAt).toISOString() : '',
  }));
  return <Profiles profiles={safeProfiles} />;
}

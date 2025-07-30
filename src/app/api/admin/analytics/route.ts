import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Profile from "@/models/Profile";
import { getAuthUserFromCookies } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Check if user is admin
    const authUser = await getAuthUserFromCookies();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: authUser.email });
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || '30';
    const days = parseInt(range);

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get basic counts
    const totalUsers = await User.countDocuments();
    const totalProfiles = await Profile.countDocuments();
    const approvedProfiles = await Profile.countDocuments({ status: 'approved' });
    const pendingProfiles = await Profile.countDocuments({ status: 'pending' });
    const rejectedProfiles = await Profile.countDocuments({ status: 'rejected' });
    const paidProfiles = await Profile.countDocuments({ paymentStatus: 'paid' });
    const unpaidProfiles = await Profile.countDocuments({ paymentStatus: 'pending' });

    // Get gender distribution
    const genderDistribution = await Profile.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get age distribution
    const ageDistribution = await Profile.aggregate([
      { $match: { age: { $exists: true } } },
      {
        $bucket: {
          groupBy: '$age',
          boundaries: [0, 25, 35, 45, 55, 100],
          default: '55+',
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    // Get city distribution
    const cityDistribution = await Profile.aggregate([
      { $match: { currentCity: { $exists: true, $ne: '' } } },
      { $group: { _id: '$currentCity', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get education distribution
    const educationDistribution = await Profile.aggregate([
      { $match: { qualification: { $exists: true, $ne: '' } } },
      { $group: { _id: '$qualification', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get monthly registrations
    const monthlyRegistrations = await User.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Get recent activity (simplified)
    const recentActivity = await Profile.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'email')
      .lean();

    // Calculate conversion rate (simplified)
    const conversionRate = totalProfiles > 0 ? Math.round((approvedProfiles / totalProfiles) * 100) : 0;

    // Calculate average profile completion (simplified)
    const averageProfileCompletion = 85; // This would need more complex logic

    // Format the data
    const analyticsData = {
      totalUsers,
      totalProfiles,
      approvedProfiles,
      pendingProfiles,
      rejectedProfiles,
      paidProfiles,
      unpaidProfiles,
      monthlyRegistrations: monthlyRegistrations.map(item => ({
        month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
        count: item.count
      })),
      genderDistribution: genderDistribution.map(item => ({
        gender: item._id || 'Unknown',
        count: item.count
      })),
      ageDistribution: ageDistribution.map(item => ({
        range: item._id === '55+' ? '55+' : `${item._id}-${item._id + 9}`,
        count: item.count
      })),
      cityDistribution: cityDistribution.map(item => ({
        city: item._id,
        count: item.count
      })),
      educationDistribution: educationDistribution.map(item => ({
        education: item._id,
        count: item.count
      })),
      recentActivity: recentActivity.map(item => ({
        date: new Date(item.createdAt).toLocaleDateString(),
        action: `Profile ${item.status}`,
        user: item.user?.email || 'Unknown'
      })),
      topCities: cityDistribution.slice(0, 5),
      conversionRate,
      averageProfileCompletion
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
} 
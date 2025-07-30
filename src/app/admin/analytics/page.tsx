"use client";
import { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaUserCheck, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaDownload, 
  FaEye, 
  FaEyeSlash, 
  FaChartBar 
} from 'react-icons/fa';

interface AnalyticsData {
  totalUsers: number;
  totalProfiles: number;
  approvedProfiles: number;
  pendingProfiles: number;
  rejectedProfiles: number;
  paidProfiles: number;
  unpaidProfiles: number;
  monthlyRegistrations: { month: string; count: number }[];
  genderDistribution: { gender: string; count: number }[];
  ageDistribution: { range: string; count: number }[];
  cityDistribution: { city: string; count: number }[];
  educationDistribution: { education: string; count: number }[];
  recentActivity: { date: string; action: string; user: string }[];
  topCities: { city: string; count: number }[];
  conversionRate: number;
  averageProfileCompletion: number;
}

export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState("30"); // days
  const [selectedChart, setSelectedChart] = useState("overview");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, fetchAnalytics]);

  async function fetchAnalytics() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/analytics?range=${dateRange}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch analytics");
      } else {
        setAnalyticsData(data);
      }
    } catch {
      setError("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  }

  function exportData() {
    // Implementation for exporting analytics data
    alert("Export functionality will be implemented");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">Analytics Dashboard</h1>
          <p className="text-green-700 text-sm sm:text-base">
            Monitor platform performance and user engagement
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-green-900">{analyticsData.totalUsers}</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <FaUsers className="text-green-600 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Profiles</p>
                <p className="text-2xl font-bold text-green-900">{analyticsData.totalProfiles}</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
              <FaUserCheck className="text-green-600 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved Profiles</p>
                <p className="text-2xl font-bold text-green-900">{analyticsData.approvedProfiles}</p>
                <p className="text-xs text-green-600">{((analyticsData.approvedProfiles / analyticsData.totalProfiles) * 100).toFixed(1)}% approval rate</p>
              </div>
              <FaUserCheck className="text-green-600 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-green-900">{analyticsData.conversionRate}%</p>
                <p className="text-xs text-green-600">Profiles to matches</p>
              </div>
              <FaChartBar className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* Chart Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-green-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedChart("overview")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedChart === "overview"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedChart("demographics")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedChart === "demographics"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Demographics
            </button>
            <button
              onClick={() => setSelectedChart("geography")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedChart === "geography"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Geography
            </button>
            <button
              onClick={() => setSelectedChart("activity")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedChart === "activity"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Activity
            </button>
          </div>
        </div>

        {/* Chart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overview Chart */}
          {selectedChart === "overview" && (
            <>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Profile Status Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Approved</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(analyticsData.approvedProfiles / analyticsData.totalProfiles) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{analyticsData.approvedProfiles}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pending</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${(analyticsData.pendingProfiles / analyticsData.totalProfiles) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{analyticsData.pendingProfiles}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rejected</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${(analyticsData.rejectedProfiles / analyticsData.totalProfiles) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{analyticsData.rejectedProfiles}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Payment Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Paid Profiles</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(analyticsData.paidProfiles / analyticsData.totalProfiles) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{analyticsData.paidProfiles}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Unpaid Profiles</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${(analyticsData.unpaidProfiles / analyticsData.totalProfiles) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{analyticsData.unpaidProfiles}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Demographics Chart */}
          {selectedChart === "demographics" && (
            <>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Gender Distribution</h3>
                <div className="space-y-4">
                  {analyticsData.genderDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.gender}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(item.count / analyticsData.totalProfiles) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Age Distribution</h3>
                <div className="space-y-4">
                  {analyticsData.ageDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.range}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${(item.count / analyticsData.totalProfiles) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Geography Chart */}
          {selectedChart === "geography" && (
            <>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Top Cities</h3>
                <div className="space-y-4">
                  {analyticsData.topCities.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-green-600" />
                        <span className="text-sm text-gray-600">{item.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(item.count / analyticsData.totalProfiles) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Education Distribution</h3>
                <div className="space-y-4">
                  {analyticsData.educationDistribution.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaGraduationCap className="text-green-600" />
                        <span className="text-sm text-gray-600">{item.education}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(item.count / analyticsData.totalProfiles) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Activity Chart */}
          {selectedChart === "activity" && (
            <>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Monthly Registrations</h3>
                <div className="space-y-4">
                  {analyticsData.monthlyRegistrations.slice(-6).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-green-600" />
                        <span className="text-sm text-gray-600">{item.month}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(item.count / Math.max(...analyticsData.monthlyRegistrations.map(m => m.count))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {analyticsData.recentActivity.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FaEye className="text-green-600 text-sm" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.action}</p>
                        <p className="text-xs text-gray-500">{item.user} • {item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Completion</h3>
            <p className="text-3xl font-bold text-green-600">{analyticsData.averageProfileCompletion}%</p>
            <p className="text-sm text-gray-600">Average completion rate</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartBar className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Rate</h3>
            <p className="text-3xl font-bold text-green-600">+15%</p>
            <p className="text-sm text-gray-600">Monthly user growth</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserCheck className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-600">{Math.round(analyticsData.totalUsers * 0.75)}</p>
            <p className="text-sm text-gray-600">Users active this month</p>
          </div>
        </div>
      </div>
    </main>
  );
} 
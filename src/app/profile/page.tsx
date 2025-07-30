"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

interface UserProfile {
  _id: string;
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  height: string;
  weight?: string;
  color?: string;
  disability?: string;
  nationality?: string;
  qualification?: string;
  college?: string;
  university?: string;
  rank?: string;
  income?: string;
  natureOfJob?: string;
  futurePlans?: string;
  religion?: string;
  caste?: string;
  sect?: string;
  home?: string;
  size?: string;
  propertyLocation?: string;
  otherProperties?: string;
  fatherOccupation?: string;
  motherOccupation?: string;
  brothers?: string;
  sisters?: string;
  marriedSiblings?: string;
  currentCity?: string;
  homeTown?: string;
  addressLocation?: string;
  reqAgeLimit?: string;
  reqHeight?: string;
  reqCity?: string;
  reqCaste?: string;
  reqQualification?: string;
  reqOther?: string;
  description: string;
  imageUrl: string;
  status: string;
  createdAt: string;
  paymentStatus?: "pending" | "paid";
  paymentScreenshot?: string;
  AccountHolder?: string;
  user: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      
      if (data.profiles && data.profiles.length > 0) {
        // Find the user's profile
        const userProfile = data.profiles.find((p: UserProfile) => p.user === session?.user?.email);
        setProfile(userProfile || null);
      } else {
        setProfile(null);
      }
    } catch {
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }

    fetchUserProfile();
  }, [session, status, router, fetchUserProfile]);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    setPasswordLoading(true);
    setPasswordError("");

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordForm(false);
        alert("Password changed successfully!");
      } else {
        setPasswordError(data.error || "Failed to change password");
      }
    } catch {
      setPasswordError("Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-green-900">My Profile</h1>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition"
            >
              <FaEdit /> Change Password
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {!profile ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-green-900 mb-4">No Profile Found</h2>
              <p className="text-green-700 mb-6">You haven&apos;t submitted a profile yet.</p>
              <button
                onClick={() => router.push("/submit")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition"
              >
                Submit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="flex-shrink-0">
                  <Image
                    src={profile.imageUrl}
                    alt={profile.name}
                    width={200}
                    height={200}
                    className="w-48 h-48 rounded-full object-cover border-4 border-green-300 shadow"
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-green-900 mb-4">{profile.name}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        profile.status === "approved" ? "bg-green-100 text-green-800" :
                        profile.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Payment:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        profile.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {profile.paymentStatus === "paid" ? "Paid" : "Pending"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Gender:</span>
                      <span className="text-green-800">{profile.gender}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Age:</span>
                      <span className="text-green-800">{profile.age} years</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Marital Status:</span>
                      <span className="text-green-800">{profile.maritalStatus}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Height:</span>
                      <span className="text-green-800">{profile.height}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-4">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Weight:</span>
                      <span>{profile.weight || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Complexion:</span>
                      <span>{profile.color || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Disability:</span>
                      <span>{profile.disability || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Nationality:</span>
                      <span>{profile.nationality || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-4">Address Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Current City:</span>
                      <span>{profile.currentCity || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Home Town:</span>
                      <span>{profile.homeTown || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Location:</span>
                      <span>{profile.addressLocation || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Education Details */}
                {(profile.qualification || profile.college || profile.university) && (
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-bold text-green-900 mb-4">Education Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Qualification:</span>
                        <span>{profile.qualification || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">College:</span>
                        <span>{profile.college || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">University:</span>
                        <span>{profile.university || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Job Details */}
                {(profile.rank || profile.income || profile.natureOfJob || profile.futurePlans) && (
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="font-bold text-green-900 mb-4">Job Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Rank/Position:</span>
                        <span>{profile.rank || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Income:</span>
                        <span>{profile.income || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Nature of Job:</span>
                        <span>{profile.natureOfJob || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Future Plans:</span>
                        <span>{profile.futurePlans || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 mb-4">About</h3>
                <p className="text-gray-700 whitespace-pre-line">{profile.description}</p>
              </div>

              {/* Created Date */}
              <div className="text-center text-sm text-gray-500">
                Profile created on: {new Date(profile.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Change Password Form */}
        {showPasswordForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-900">Change Password</h2>
              <button
                onClick={() => setShowPasswordForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {passwordError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-green-800 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="w-full border border-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-800 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="w-full border border-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-800 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="w-full border border-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition"
                >
                  <FaSave />
                  {passwordLoading ? "Changing..." : "Change Password"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 
"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  FaCheck, 
  FaTimes, 
  FaClock, 
  FaEye, 
  FaEyeSlash, 
  FaMoneyBillWave,
  FaInfoCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaHome,
  FaUsers,
  FaHeart,
  FaRulerVertical,
  FaPalette,
  FaGlobe,
  FaVenusMars,
  FaUser
} from "react-icons/fa";

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
  status: "pending" | "approved" | "rejected" | "hidden";
  createdAt: string;
  paymentStatus?: "pending" | "paid";
  paymentScreenshot?: string;
  AccountHolder?: string;
  user: string;
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/profile/me");
      const data = await res.json();
      
      if (data.profile) {
        setProfile(data.profile);
      } else {
        setProfile(null);
      }
    } catch {
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/login");
      return;
    }

    fetchUserProfile();
  }, [user, authLoading, router, fetchUserProfile]);

  const getStatusInfo = (status: string, paymentStatus?: string) => {
    const statusConfig = {
      pending: {
        icon: FaClock,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-300",
        message: "Your profile is under review"
      },
      approved: {
        icon: FaCheck,
        color: "text-green-600",
        bgColor: "bg-green-100",
        borderColor: "border-green-300",
        message: "Your profile has been approved and is visible in the portfolio"
      },
      rejected: {
        icon: FaTimes,
        color: "text-red-600",
        bgColor: "bg-red-100",
        borderColor: "border-red-300",
        message: "Your profile has been rejected. Please contact support for details."
      },
      hidden: {
        icon: FaEyeSlash,
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        borderColor: "border-gray-300",
        message: "Your profile is currently hidden"
      }
    };

    const paymentConfig = {
      pending: {
        icon: FaMoneyBillWave,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        borderColor: "border-orange-300",
        message: "Payment is pending. Please complete payment to proceed."
      },
      paid: {
        icon: FaCheck,
        color: "text-green-600",
        bgColor: "bg-green-100",
        borderColor: "border-green-300",
        message: "Payment completed successfully"
      }
    };

    return {
      status: statusConfig[status as keyof typeof statusConfig] || statusConfig.pending,
      payment: paymentConfig[paymentStatus as keyof typeof paymentConfig] || paymentConfig.pending
    };
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-green-900">My Profile</h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/pay")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Update Profile
              </button>
            </div>
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
                onClick={() => router.push("/pay")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition"
              >
                Submit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Status Notifications */}
              {(() => {
                const statusInfo = getStatusInfo(profile.status, profile.paymentStatus);
                return (
                  <div className="space-y-4">
                    {/* Profile Status */}
                    <div className={`p-4 rounded-lg border ${statusInfo.status.borderColor} ${statusInfo.status.bgColor}`}>
                      <div className="flex items-center gap-3">
                        <statusInfo.status.icon className={`text-xl ${statusInfo.status.color}`} />
                        <div>
                          <h3 className="font-semibold text-gray-900">Profile Status</h3>
                          <p className="text-sm text-gray-700">{statusInfo.status.message}</p>
                        </div>
                        <span className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.status.color} ${statusInfo.status.bgColor}`}>
                          {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Payment Status */}
                    <div className={`p-4 rounded-lg border ${statusInfo.payment.borderColor} ${statusInfo.payment.bgColor}`}>
                      <div className="flex items-center gap-3">
                        <statusInfo.payment.icon className={`text-xl ${statusInfo.payment.color}`} />
                        <div>
                          <h3 className="font-semibold text-gray-900">Payment Status</h3>
                          <p className="text-sm text-gray-700">{statusInfo.payment.message}</p>
                        </div>
                        <span className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.payment.color} ${statusInfo.payment.bgColor}`}>
                          {profile.paymentStatus === "paid" ? "Paid" : "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Portfolio Visibility */}
                    <div className={`p-4 rounded-lg border ${
                      profile.status === "approved" ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50"
                    }`}>
                      <div className="flex items-center gap-3">
                        {profile.status === "approved" ? (
                          <FaEye className="text-xl text-green-600" />
                        ) : (
                          <FaEyeSlash className="text-xl text-gray-600" />
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">Portfolio Visibility</h3>
                          <p className="text-sm text-gray-700">
                            {profile.status === "approved" 
                              ? "Your profile is visible in the public portfolio" 
                              : "Your profile is not yet visible in the portfolio"
                            }
                          </p>
                        </div>
                        <span className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${
                          profile.status === "approved" ? "text-green-600 bg-green-100" : "text-gray-600 bg-gray-100"
                        }`}>
                          {profile.status === "approved" ? "Visible" : "Hidden"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

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
                  <h2 className="text-3xl font-bold text-green-900 mb-4">{profile.name}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <FaVenusMars className="text-green-600" />
                      <span className="font-semibold">Gender:</span>
                      <span className="text-green-800">{profile.gender}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-600" />
                      <span className="font-semibold">Age:</span>
                      <span className="text-green-800">{profile.age} years</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaHeart className="text-green-600" />
                      <span className="font-semibold">Marital Status:</span>
                      <span className="text-green-800">{profile.maritalStatus}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaRulerVertical className="text-green-600" />
                      <span className="font-semibold">Height:</span>
                      <span className="text-green-800">{profile.height}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaPalette className="text-green-600" />
                      <span className="font-semibold">Complexion:</span>
                      <span className="text-green-800">{profile.color || "N/A"}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaGlobe className="text-green-600" />
                      <span className="font-semibold">Nationality:</span>
                      <span className="text-green-800">{profile.nationality || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <FaUser className="text-green-600" />
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Weight:</span>
                      <span className="text-green-800">{profile.weight || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Disability:</span>
                      <span className="text-green-800">{profile.disability || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Religion:</span>
                      <span className="text-green-800">{profile.religion || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Caste:</span>
                      <span className="text-green-800">{profile.caste || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Sect:</span>
                      <span className="text-green-800">{profile.sect || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-600" />
                    Address Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Current City:</span>
                      <span className="text-green-800">{profile.currentCity || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Home Town:</span>
                      <span className="text-green-800">{profile.homeTown || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Location:</span>
                      <span className="text-green-800">{profile.addressLocation || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Education Details */}
                {(profile.qualification || profile.college || profile.university) && (
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                      <FaGraduationCap className="text-green-600" />
                      Education Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Qualification:</span>
                        <span className="text-green-800">{profile.qualification || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">College:</span>
                        <span className="text-green-800">{profile.college || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">University:</span>
                        <span className="text-green-800">{profile.university || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Job Details */}
                {(profile.rank || profile.income || profile.natureOfJob || profile.futurePlans) && (
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                      <FaBriefcase className="text-green-600" />
                      Job Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Rank/Position:</span>
                        <span className="text-green-800">{profile.rank || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Income:</span>
                        <span className="text-green-800">{profile.income || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Nature of Job:</span>
                        <span className="text-green-800">{profile.natureOfJob || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Future Plans:</span>
                        <span className="text-green-800">{profile.futurePlans || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Property Details */}
                {(profile.home || profile.size || profile.propertyLocation || profile.otherProperties) && (
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                      <FaHome className="text-green-600" />
                      Property Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Home:</span>
                        <span className="text-green-800">{profile.home || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Size:</span>
                        <span className="text-green-800">{profile.size || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Property Location:</span>
                        <span className="text-green-800">{profile.propertyLocation || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Other Properties:</span>
                        <span className="text-green-800">{profile.otherProperties || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Family Details */}
                {(profile.fatherOccupation || profile.motherOccupation || profile.brothers || profile.sisters || profile.marriedSiblings) && (
                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                      <FaUsers className="text-green-600" />
                      Family Details
                    </h3>
                    <div className="space-y-3">
                                             <div className="flex justify-between items-center">
                         <span className="font-semibold">Father&apos;s Occupation:</span>
                         <span className="text-green-800">{profile.fatherOccupation || "N/A"}</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="font-semibold">Mother&apos;s Occupation:</span>
                         <span className="text-green-800">{profile.motherOccupation || "N/A"}</span>
                       </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Brothers:</span>
                        <span className="text-green-800">{profile.brothers || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Sisters:</span>
                        <span className="text-green-800">{profile.sisters || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Married Siblings:</span>
                        <span className="text-green-800">{profile.marriedSiblings || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {(profile.reqAgeLimit || profile.reqHeight || profile.reqCity || profile.reqCaste || profile.reqQualification || profile.reqOther) && (
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                      <FaHeart className="text-green-600" />
                      Partner Requirements
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Age Limit:</span>
                        <span className="text-green-800">{profile.reqAgeLimit || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Height:</span>
                        <span className="text-green-800">{profile.reqHeight || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">City:</span>
                        <span className="text-green-800">{profile.reqCity || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Caste:</span>
                        <span className="text-green-800">{profile.reqCaste || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Qualification:</span>
                        <span className="text-green-800">{profile.reqQualification || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Other Requirements:</span>
                        <span className="text-green-800">{profile.reqOther || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-green-600" />
                  About
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{profile.description}</p>
              </div>

              {/* Payment Information */}
              {profile.paymentScreenshot && (
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-600" />
                    Payment Proof
                  </h3>
                  <div className="flex items-center gap-4">
                    <Image
                      src={profile.paymentScreenshot}
                      alt="Payment Screenshot"
                      width={200}
                      height={150}
                      className="rounded-lg border border-gray-300"
                    />
                    <div>
                      <p className="text-sm text-gray-600">Payment screenshot uploaded</p>
                      {profile.AccountHolder && (
                        <p className="text-sm text-gray-600">Account: {profile.AccountHolder}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Created Date */}
              <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                Profile created on: {new Date(profile.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
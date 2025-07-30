"use client";
import Image from "next/image";
import { useState } from "react";
import {
  FaCheck,
  FaEnvelope,
  FaEye,
  FaImage,
  FaLock,
  FaMoneyCheckAlt,
  FaTimes,
  FaTrash,
  FaUser,
  FaUserShield,
  FaUserTag,
  FaVenusMars,
  FaCalendar,
  FaMapMarkerAlt,
  FaRulerVertical,
  FaHeart,
  FaClock,
} from "react-icons/fa";

interface Profile {
  _id: string;
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  height: string;
  weight?: string;
  color?: string;
  disability?: string;
  nationality: string;
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
  currentCity: string;
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
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function handleLogin() {
    if (
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
      password === "admin123"
    ) {
      setAuthed(true);
      fetchProfiles();
    } else {
      setError("Incorrect password");
    }
  }

  async function fetchProfiles() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfiles(data.profiles || []);
    } catch {
      setError("Failed to fetch profiles");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    setActionLoading(id + status);
    try {
      const res = await fetch(`/api/profile/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if(res.ok){
        setProfiles((prev) => prev.filter((p) => p._id !== id));
      }else{
        const data = await res.json();
        setError(data.error || "Failed to update status");
      }
    } catch {
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  }

  async function deleteProfile(id: string) {
    if (!confirm("Are you sure you want to delete this profile? This action cannot be undone.")) {
      return;
    }
    
    setActionLoading(id + "delete");
    try {
      const res = await fetch(`/api/profile/${id}`, {
        method: "DELETE",
      });
      if(res.ok){
        setProfiles((prev) => prev.filter((p) => p._id !== id));
      }else{
        const data = await res.json();
        setError(data.error || "Failed to delete profile");
      }
    } catch {
      alert("Failed to delete profile");
    } finally {
      setActionLoading(null);
    }
  }

  function openProfileModal(profile: Profile) {
    setSelectedProfile(profile);
    setShowModal(true);
  }

  function closeProfileModal() {
    setSelectedProfile(null);
    setShowModal(false);
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-green-100 text-center">
          <div className="flex flex-col items-center mb-4">
            <FaUserShield className="text-4xl text-green-700 mb-2" />
            <h1 className="text-3xl font-extrabold text-green-900 mb-2 drop-shadow">
              Admin Dashboard
            </h1>
          </div>
          <p className="mb-6 text-green-800">
            This page is protected. Please log in to manage rishta profiles.
          </p>
          <div className="flex items-center gap-2 mb-4">
            <FaLock className="text-green-600" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
              type="password"
              placeholder="Admin Password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 rounded-full font-bold shadow-xl hover:scale-105 hover:from-green-700 hover:to-blue-600 transition-all text-lg"
          >
            Login
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-5xl w-full border border-green-100">
        <h1 className="text-3xl font-extrabold text-green-900 mb-6 drop-shadow text-center">
          All Rishta Profiles
        </h1>
        {loading ? (
          <div className="text-green-700 text-center">Loading profiles...</div>
        ) : profiles.length === 0 ? (
          <div className="text-green-700 text-center">No pending profiles.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-green-50 rounded-xl shadow p-6 flex flex-col gap-2 border border-green-100"
              >
                <div className="flex items-center gap-4 mb-2">
                  <Image
                    src={profile.imageUrl}
                    alt={profile.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover border-2 border-green-300 shadow"
                  />
                  <div>
                    <div className="font-bold text-green-900 text-lg flex items-center gap-2">
                      <FaUser /> {profile.name}
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        profile.status === "approved" 
                          ? "bg-green-100 text-green-800" 
                          : profile.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {profile.status}
                      </span>
                    </div>
                    <div className="text-green-700 text-sm flex items-center gap-2">
                      <FaVenusMars /> {profile.gender} | Age: {profile.age}
                    </div>
                    <div className="text-green-700 text-sm flex items-center gap-2">
                      <FaEnvelope /> {profile.currentCity}, {profile.nationality}
                    </div>
                  </div>
                </div>
                <div className="text-green-800 text-sm mb-2">
                  {profile.description.length > 100 
                    ? `${profile.description.substring(0, 100)}...` 
                    : profile.description}
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <div>
                    <span className="font-semibold">
                      <FaUserTag className="inline mr-1" /> Account Holder:
                    </span>{" "}
                    <span className="text-green-900">
                      {profile.AccountHolder || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">
                      <FaMoneyCheckAlt className="inline mr-1" /> Payment Status:
                    </span>{" "}
                    <span
                      className={
                        profile.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {profile.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </span>
                  </div>
                  {profile.paymentScreenshot && (
                    <div>
                      <span className="font-semibold">
                        <FaImage className="inline mr-1" /> Payment Screenshot:
                      </span>
                      <a
                        href={profile.paymentScreenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={profile.paymentScreenshot}
                          alt="Payment Screenshot"
                          width={320}
                          height={240}
                          className="mt-2 max-w-xs rounded border"
                        />
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    onClick={() => openProfileModal(profile)}
                  >
                    <FaEye /> View More
                  </button>
                  {profile.status !== "approved" && (
                    <button
                      className="flex-1 bg-green-600 text-white py-2 rounded-full font-semibold shadow hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                      disabled={actionLoading === profile._id + "approved"}
                      onClick={() => updateStatus(profile._id, "approved")}
                    >
                      <FaCheck /> Approve
                    </button>
                  )}
                  {profile.status !== "rejected" && (
                    <button
                      className="flex-1 bg-red-500 text-white py-2 rounded-full font-semibold shadow hover:bg-red-600 transition disabled:opacity-60 flex items-center justify-center gap-2"
                      disabled={actionLoading === profile._id + "rejected"}
                      onClick={() => updateStatus(profile._id, "rejected")}
                    >
                      <FaTimes /> Reject
                    </button>
                  )}
                  <button
                    className="flex-1 bg-gray-600 text-white py-2 rounded-full font-semibold shadow hover:bg-gray-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                    disabled={actionLoading === profile._id + "delete"}
                    onClick={() => deleteProfile(profile._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      </div>

      {/* Profile Detail Modal */}
      {showModal && selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-900">Complete Profile Details</h2>
              <button
                onClick={closeProfileModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-shrink-0">
                <Image
                  src={selectedProfile.imageUrl}
                  alt={selectedProfile.name}
                  width={200}
                  height={200}
                  className="w-48 h-48 rounded-full object-cover border-4 border-green-300 shadow"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-4">{selectedProfile.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaVenusMars className="text-green-600" />
                    <span className="font-semibold">Gender:</span>
                    <span className="text-green-800">{selectedProfile.gender}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-green-600" />
                    <span className="font-semibold">Age:</span>
                    <span className="text-green-800">{selectedProfile.age} years</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaHeart className="text-green-600" />
                    <span className="font-semibold">Marital Status:</span>
                    <span className="text-green-800">{selectedProfile.maritalStatus}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaRulerVertical className="text-green-600" />
                    <span className="font-semibold">Height:</span>
                    <span className="text-green-800">{selectedProfile.height}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-600" />
                    <span className="font-semibold">Location:</span>
                    <span className="text-green-800">{selectedProfile.currentCity}, {selectedProfile.nationality}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaClock className="text-green-600" />
                    <span className="font-semibold">Created:</span>
                    <span className="text-green-800">{new Date(selectedProfile.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Personal Information */}
            <div className="mb-6">
              <h4 className="font-bold text-green-900 mb-3">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Weight:</span>
                  <span className="text-green-800">{selectedProfile.weight || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Complexion:</span>
                  <span className="text-green-800">{selectedProfile.color || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Disability:</span>
                  <span className="text-green-800">{selectedProfile.disability || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Nationality:</span>
                  <span className="text-green-800">{selectedProfile.nationality}</span>
                </div>
              </div>
            </div>

            {/* Education Details */}
            {selectedProfile.qualification && (
              <div className="mb-6">
                <h4 className="font-bold text-green-900 mb-3">Education Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Qualification:</span>
                    <span className="text-blue-800">{selectedProfile.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">College:</span>
                    <span className="text-blue-800">{selectedProfile.college || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">University:</span>
                    <span className="text-blue-800">{selectedProfile.university || "N/A"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Job Details */}
            {(selectedProfile.rank || selectedProfile.income || selectedProfile.natureOfJob || selectedProfile.futurePlans) && (
              <div className="mb-6">
                <h4 className="font-bold text-green-900 mb-3">Job Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Rank/Position:</span>
                    <span className="text-purple-800">{selectedProfile.rank || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Income:</span>
                    <span className="text-purple-800">{selectedProfile.income || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Nature of Job:</span>
                    <span className="text-purple-800">{selectedProfile.natureOfJob || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Future Plans:</span>
                    <span className="text-purple-800">{selectedProfile.futurePlans || "N/A"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Religion Details */}
            {(selectedProfile.religion || selectedProfile.caste || selectedProfile.sect) && (
              <div className="mb-6">
                <h4 className="font-bold text-green-900 mb-3">Religion Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Religion:</span>
                    <span className="text-orange-800">{selectedProfile.religion || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Caste:</span>
                    <span className="text-orange-800">{selectedProfile.caste || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Sect:</span>
                    <span className="text-orange-800">{selectedProfile.sect || "N/A"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Property Details */}
            {(selectedProfile.home || selectedProfile.size || selectedProfile.propertyLocation || selectedProfile.otherProperties) && (
              <div className="mb-6">
                <h4 className="font-bold text-green-900 mb-3">Property Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Home:</span>
                    <span className="text-indigo-800">{selectedProfile.home || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Size:</span>
                    <span className="text-indigo-800">{selectedProfile.size || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Location:</span>
                    <span className="text-indigo-800">{selectedProfile.propertyLocation || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Other Properties:</span>
                    <span className="text-indigo-800">{selectedProfile.otherProperties || "N/A"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Family Details */}
            {(selectedProfile.fatherOccupation || selectedProfile.motherOccupation || selectedProfile.brothers || selectedProfile.sisters || selectedProfile.marriedSiblings) && (
              <div className="mb-6">
                <h4 className="font-bold text-green-900 mb-3">Family Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-pink-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Father's Occupation:</span>
                    <span className="text-pink-800">{selectedProfile.fatherOccupation || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Mother's Occupation:</span>
                    <span className="text-pink-800">{selectedProfile.motherOccupation || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Brothers:</span>
                    <span className="text-pink-800">{selectedProfile.brothers || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Sisters:</span>
                    <span className="text-pink-800">{selectedProfile.sisters || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Married Siblings:</span>
                    <span className="text-pink-800">{selectedProfile.marriedSiblings || "N/A"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Address Details */}
            <div className="mb-6">
              <h4 className="font-bold text-green-900 mb-3">Address Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-teal-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Current City:</span>
                  <span className="text-teal-800">{selectedProfile.currentCity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Home Town:</span>
                  <span className="text-teal-800">{selectedProfile.homeTown || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Location/Area:</span>
                  <span className="text-teal-800">{selectedProfile.addressLocation || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            {(selectedProfile.reqAgeLimit || selectedProfile.reqHeight || selectedProfile.reqCity || selectedProfile.reqCaste || selectedProfile.reqQualification || selectedProfile.reqOther) && (
              <div className="mb-6">
                <h4 className="font-bold text-green-900 mb-3">Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Age Limit:</span>
                    <span className="text-yellow-800">{selectedProfile.reqAgeLimit || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Height:</span>
                    <span className="text-yellow-800">{selectedProfile.reqHeight || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">City:</span>
                    <span className="text-yellow-800">{selectedProfile.reqCity || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Caste:</span>
                    <span className="text-yellow-800">{selectedProfile.reqCaste || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Qualification:</span>
                    <span className="text-yellow-800">{selectedProfile.reqQualification || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Other Demands:</span>
                    <span className="text-yellow-800">{selectedProfile.reqOther || "N/A"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* About */}
            <div className="mb-6">
              <h4 className="font-bold text-green-900 mb-2">About</h4>
              <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                {selectedProfile.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Account Information</h4>
                <div className="flex items-center gap-2 mb-2">
                  <FaUserTag className="text-green-600" />
                  <span className="font-semibold">Account Holder:</span>
                  <span className="text-green-800">{selectedProfile.AccountHolder || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMoneyCheckAlt className="text-green-600" />
                  <span className="font-semibold">Payment Status:</span>
                  <span className={`font-semibold ${
                    selectedProfile.paymentStatus === "paid" ? "text-green-600" : "text-red-600"
                  }`}>
                    {selectedProfile.paymentStatus === "paid" ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Profile Status</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedProfile.status === "approved" 
                      ? "bg-green-100 text-green-800" 
                      : selectedProfile.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {selectedProfile.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            {selectedProfile.paymentScreenshot && (
              <div className="mb-6">
                <h4 className="font-bold text-green-900 mb-2">Payment Screenshot</h4>
                <a
                  href={selectedProfile.paymentScreenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Image
                    src={selectedProfile.paymentScreenshot}
                    alt="Payment Screenshot"
                    width={400}
                    height={300}
                    className="rounded-lg border shadow-lg hover:shadow-xl transition-shadow"
                  />
                </a>
              </div>
            )}
            
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={closeProfileModal}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Close
              </button>
              {selectedProfile.status !== "approved" && (
                <button
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  onClick={() => {
                    updateStatus(selectedProfile._id, "approved");
                    closeProfileModal();
                  }}
                >
                  <FaCheck className="inline mr-2" /> Approve Profile
                </button>
              )}
              {selectedProfile.status !== "rejected" && (
                <button
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                  onClick={() => {
                    updateStatus(selectedProfile._id, "rejected");
                    closeProfileModal();
                  }}
                >
                  <FaTimes className="inline mr-2" /> Reject Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
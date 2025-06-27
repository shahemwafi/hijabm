"use client";
import Image from "next/image";
import { useState } from "react";
import {
  FaCheck,
  FaEnvelope,
  FaImage,
  FaLock,
  FaMoneyCheckAlt,
  FaTimes,
  FaUser,
  FaUserShield,
  FaUserTag,
  FaVenusMars,
} from "react-icons/fa";

interface Profile {
  _id: string;
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  height: string;
  country: string;
  city: string;
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
      const res = await fetch("/api/profile?status=pending");
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
          Pending Rishta Profiles
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
                    </div>
                    <div className="text-green-700 text-sm flex items-center gap-2">
                      <FaVenusMars /> {profile.gender} | Age: {profile.age}
                    </div>
                    <div className="text-green-700 text-sm flex items-center gap-2">
                      <FaEnvelope /> {profile.city}, {profile.country}
                    </div>
                  </div>
                </div>
                <div className="text-green-800 text-sm mb-2">
                  {profile.description}
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
                <div className="flex gap-4 mt-2">
                  <button
                    className="flex-1 bg-green-600 text-white py-2 rounded-full font-semibold shadow hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                    disabled={actionLoading === profile._id + "approved"}
                    onClick={() => updateStatus(profile._id, "approved")}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="flex-1 bg-red-500 text-white py-2 rounded-full font-semibold shadow hover:bg-red-600 transition disabled:opacity-60 flex items-center justify-center gap-2"
                    disabled={actionLoading === profile._id + "rejected"}
                    onClick={() => updateStatus(profile._id, "rejected")}
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      </div>
    </main>
  );
}
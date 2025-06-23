"use client";
import { useState, useRef } from "react";
import { FaInfoCircle, FaUser, FaVenusMars, FaBirthdayCake, FaRing, FaRulerVertical, FaGlobe, FaCity, FaImage } from "react-icons/fa";

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed. Please try again.");
      } else {
        setSuccess("Profile submitted! Awaiting approval.");
        form.reset();
        setImagePreview(null);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <form
        ref={formRef}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full border border-green-100 space-y-6 animate-fade-in"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-green-900 mb-2 text-center drop-shadow">Submit Rishta Profile</h1>
        <p className="text-green-700 text-center mb-6 flex items-center justify-center gap-2"><FaInfoCircle /> All profiles are reviewed for Shariah compliance and privacy. <span className="hidden md:inline">Contact info is not allowed.</span></p>
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-green-800 flex items-center gap-2"><FaUser /> Full Name</label>
            <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" name="name" placeholder="Full Name" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-green-800 flex items-center gap-2"><FaVenusMars /> Gender</label>
            <select className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" name="gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-green-800 flex items-center gap-2"><FaBirthdayCake /> Age</label>
            <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" name="age" type="number" min="18" placeholder="Age" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-green-800 flex items-center gap-2"><FaRing /> Marital Status</label>
            <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" name="maritalStatus" placeholder="Marital Status" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-green-800 flex items-center gap-2"><FaRulerVertical /> Height</label>
            <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" name="height" placeholder="Height (e.g. 5ft 6in)" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-green-800 flex items-center gap-2"><FaGlobe /> Country</label>
            <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" name="country" placeholder="Country" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-green-800 flex items-center gap-2"><FaCity /> City</label>
            <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" name="city" placeholder="City" required />
          </div>
        </div>
        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-green-800 flex items-center gap-2"><FaInfoCircle /> Profile Description</label>
          <textarea className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" name="description" placeholder="Profile Description (no contact info)" rows={4} required />
          <span className="text-xs text-green-600">Share your background, values, and what you're looking for (no contact info).</span>
        </div>
        {/* Image Upload & Preview */}
        <div className="flex flex-col gap-2 items-center">
          <label className="font-semibold text-green-800 flex items-center gap-2"><FaImage /> Profile Image</label>
          <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" name="image" type="file" accept="image/*" required onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Profile Preview" className="mt-2 rounded-full w-24 h-24 object-cover border-2 border-green-300 shadow" />
          )}
          <span className="text-xs text-green-600">Upload a clear, recent photo. Your image is private and secure.</span>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 rounded-full font-bold shadow-xl hover:scale-105 hover:from-green-700 hover:to-blue-600 transition-all text-lg disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Profile"}
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-700 text-sm mt-2">{success}</p>}
      </form>
    </main>
  );
} 
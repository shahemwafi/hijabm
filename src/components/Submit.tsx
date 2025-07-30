"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  FaSpinner,
  FaUpload,
} from "react-icons/fa";

export default function SubmitPage({
  onNext,
}: {
  onNext: (profileId: string) => void;
}) {
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
    const dob = formData.get("dob") as string;
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      formData.append("age", age.toString());
    }
    
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error.message || "Submission failed. Please try again.");
      } else {
        setSuccess("Profile submitted! Awaiting approval.");
        form.reset();
        setImagePreview(null);
        onNext(data.profileId);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 sm:py-12 lg:py-16 w-screen">
      <div className="w-screen px-8 sm:px-12 lg:px-16">
        <div className="bg-white rounded-2xl shadow-2xl p-12 sm:p-16 lg:p-20 w-full max-h-[95vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-900">Submit Your Rishta Profile</h2>
          </div>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-bold text-green-900">Personal Information</h3>
                
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="name"
                  placeholder="Name"
                  required
                />

                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="gender"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="dob"
                  type="date"
                  required
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="maritalStatus"
                  placeholder="Marital Status"
                  required
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="height"
                  placeholder="Height"
                  required
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="weight"
                  placeholder="Weight"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="color"
                  placeholder="Complexion"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="nationality"
                  placeholder="Nationality"
                  required
                />
              </div>

              {/* Education & Career */}
              <div className="space-y-4">
                <h3 className="font-bold text-green-900">Education & Career</h3>
                
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="qualification"
                  placeholder="Qualification"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="college"
                  placeholder="College"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="university"
                  placeholder="University"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="rank"
                  placeholder="Rank/Position"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="income"
                  placeholder="Income"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="natureOfJob"
                  placeholder="Nature of Job"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="futurePlans"
                  placeholder="Future Plans"
                />
              </div>

              {/* Religion Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-green-900">Religion Details</h3>
                
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="religion"
                  placeholder="Religion"
                  required
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="caste"
                  placeholder="Caste"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="sect"
                  placeholder="Sect"
                />
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-green-900">Property Details</h3>
                
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="home"
                  placeholder="Home Type"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="size"
                  placeholder="Property Size"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="propertyLocation"
                  placeholder="Property Location"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="otherProperties"
                  placeholder="Other Properties"
                />
              </div>

              {/* Family Information */}
              <div className="space-y-4">
                <h3 className="font-bold text-green-900">Family Information</h3>
                
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="fatherOccupation"
                  placeholder="Father's Occupation"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="motherOccupation"
                  placeholder="Mother's Occupation"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="brothers"
                  placeholder="Brothers Details"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="sisters"
                  placeholder="Sisters Details"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="marriedSiblings"
                  placeholder="Married Siblings"
                />
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="font-bold text-green-900">Address</h3>
                
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="currentCity"
                  placeholder="Current City"
                  required
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="homeTown"
                  placeholder="Home Town"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="addressLocation"
                  placeholder="Country"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="font-bold text-green-900">Your Requirements</h3>
                
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="reqAgeLimit"
                  placeholder="Age Limit"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="reqHeight"
                  placeholder="Height Preference"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="reqCity"
                  placeholder="City Preference"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="reqCaste"
                  placeholder="Caste Preference"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="reqQualification"
                  placeholder="Qualification Preference"
                />

                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  name="reqOther"
                  placeholder="Other Requirements"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="font-bold text-green-900 mb-2">Description</h3>
                <textarea
                  name="description"
                  rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Tell us about yourself, your values, and what you're looking for. Please do not include any contact information."
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                Share your background, values, and what you&rsquo;re looking for. No contact information allowed.
                </p>
            </div>

            {/* Image Upload */}
            <div className="mt-6">
              <h3 className="font-bold text-green-900 mb-2">Profile Image</h3>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-4 text-gray-400" />
                        <p className="mb-2 text-xs sm:text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        required
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                </div>
                
                {imagePreview && (
                <div className="flex justify-center mt-4">
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Profile Preview"
                        width={100}
                        height={100}
                        className="rounded-full object-cover border-4 border-green-200 shadow-lg w-20 h-20 sm:w-24 sm:h-24"
                      />
                    </div>
                  </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 mt-6 pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FaSpinner className="animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit Profile"
                )}
              </button>
            </div>

            {/* Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base mt-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm sm:text-base mt-4">
                {success}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  FaBriefcase,
  FaCheckCircle,
  FaHome,
  FaImage,
  FaInfoCircle,
  FaListUl,
  FaMapMarkerAlt,
  FaUniversity,
  FaUser,
  FaUsers,
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-4 sm:py-6 lg:py-8">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="form-container bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
                <FaUser className="text-white text-xl sm:text-2xl lg:text-3xl" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              Submit Your Rishta Profile
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
              Create your profile with dignity and respect. All information is kept private and secure.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg shadow-lg">
                1
              </div>
              <div className="w-12 h-1 sm:w-16 sm:h-1.5 lg:w-24 bg-green-200 rounded-full"></div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm sm:text-base lg:text-lg">
                2
              </div>
              <div className="w-12 h-1 sm:w-16 sm:h-1.5 lg:w-24 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm sm:text-base lg:text-lg">
                3
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* PERSONAL INFORMATION */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="input-field"
                    name="gender"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="input-field"
                    name="name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="input-field"
                    name="dob"
                    type="date"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Marital Status <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="input-field"
                    name="maritalStatus"
                    placeholder="e.g., Never Married, Divorced"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Height <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="input-field"
                    name="height"
                    placeholder="e.g., 5ft 6in"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Weight
                  </label>
                  <input
                    className="input-field"
                    name="weight"
                    placeholder="Weight in kg"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Complexion
                  </label>
                  <input
                    className="input-field"
                    name="color"
                    placeholder="e.g., Fair, Wheatish"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="input-field"
                    name="nationality"
                    placeholder="Your nationality"
                    required
                  />
                </div>
              </div>
            </div>

            {/* EDUCATION DETAILS */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaUniversity className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Education Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="input-field"
                    name="qualification"
                    placeholder="e.g., Bachelor's, Master's"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College/University
                  </label>
                  <input
                    className="input-field"
                    name="college"
                    placeholder="College name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University
                  </label>
                  <input
                    className="input-field"
                    name="university"
                    placeholder="University name"
                  />
                </div>
              </div>
            </div>

            {/* JOB DETAILS */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaBriefcase className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Job Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position/Rank
                  </label>
                  <input
                    className="input-field"
                    name="rank"
                    placeholder="e.g., Software Engineer, Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income
                  </label>
                  <input
                    className="input-field"
                    name="income"
                    placeholder="Monthly income"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nature of Job
                  </label>
                  <input
                    className="input-field"
                    name="natureOfJob"
                    placeholder="e.g., Private, Government"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Future Plans
                  </label>
                  <input
                    className="input-field"
                    name="futurePlans"
                    placeholder="Your future career plans"
                  />
                </div>
              </div>
            </div>

            {/* RELIGION DETAILS */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Religion Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Religion <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="input-field"
                    name="religion"
                    placeholder="Your religion"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caste
                  </label>
                  <input
                    className="input-field"
                    name="caste"
                    placeholder="Your caste"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sect
                  </label>
                  <input
                    className="input-field"
                    name="sect"
                    placeholder="Your sect"
                  />
                </div>
              </div>
            </div>

            {/* PROPERTY DETAILS */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaHome className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Property Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Type
                  </label>
                  <input
                    className="input-field"
                    name="home"
                    placeholder="e.g., Owned, Rented"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Size
                  </label>
                  <input
                    className="input-field"
                    name="size"
                    placeholder="e.g., 5 Marla, 1 Kanal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    className="input-field"
                    name="propertyLocation"
                    placeholder="Property location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Properties
                  </label>
                  <input
                    className="input-field"
                    name="otherProperties"
                    placeholder="Any other properties"
                  />
                </div>
              </div>
            </div>

            {/* FAMILY DETAILS */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaUsers className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Family Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father&apos;s Occupation
                  </label>
                  <input
                    className="input-field"
                    name="fatherOccupation"
                    placeholder="Father's profession"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother&apos;s Occupation
                  </label>
                  <input
                    className="input-field"
                    name="motherOccupation"
                    placeholder="Mother's profession"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brothers Details
                  </label>
                  <input
                    className="input-field"
                    name="brothers"
                    placeholder="Number and details of brothers"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sisters Details
                  </label>
                  <input
                    className="input-field"
                    name="sisters"
                    placeholder="Number and details of sisters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Married Siblings
                  </label>
                  <input
                    className="input-field"
                    name="marriedSiblings"
                    placeholder="Number of married siblings"
                  />
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Address</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current City <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="input-field"
                    name="currentCity"
                    placeholder="Your current city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Town
                  </label>
                  <input
                    className="input-field"
                    name="homeTown"
                    placeholder="Your home town"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    className="input-field"
                    name="addressLocation"
                    placeholder="Your country"
                  />
                </div>
              </div>
            </div>

            {/* REQUIREMENTS */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaListUl className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Your Requirements</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Limit
                  </label>
                  <input
                    className="input-field"
                    name="reqAgeLimit"
                    placeholder="Preferred age range"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height Preference
                  </label>
                  <input
                    className="input-field"
                    name="reqHeight"
                    placeholder="Preferred height"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City Preference
                  </label>
                  <input
                    className="input-field"
                    name="reqCity"
                    placeholder="Preferred cities"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caste Preference
                  </label>
                  <input
                    className="input-field"
                    name="reqCaste"
                    placeholder="Preferred caste"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification Preference
                  </label>
                  <input
                    className="input-field"
                    name="reqQualification"
                    placeholder="Preferred qualification"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Requirements
                  </label>
                  <input
                    className="input-field"
                    name="reqOther"
                    placeholder="Any other requirements"
                  />
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaInfoCircle className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Profile Description</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About You <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="input-field"
                  name="description"
                  rows={4}
                  placeholder="Tell us about yourself, your values, and what you're looking for. Please do not include any contact information."
                  required
                />
                                        <p className="text-xs text-gray-500 mt-2">
                          Share your background, values, and what you&apos;re looking for. No contact information allowed.
                        </p>
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="card">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                  <FaImage className="text-white text-sm sm:text-base lg:text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Profile Image</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Photo <span className="text-red-500">*</span>
                  </label>
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
                </div>
                
                {imagePreview && (
                  <div className="flex justify-center">
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
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
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
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm sm:text-base">
                {success}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

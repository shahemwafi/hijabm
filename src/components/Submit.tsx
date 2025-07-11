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
    <main className="min-h-screen flex items-center justify-center">
      <form
        ref={formRef}
        className=" w-full animate-fade-in"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-green-900 mb-2 text-center drop-shadow">
          Submit Rishta Profile
        </h1>
        <p className="text-green-700 text-center mb-5 tracking-tighter flex flex-col justify-center gap-2">
          <span className="flex items-center gap-2">
            <FaInfoCircle />
            All profiles are reviewed for Shariah compliance and privacy.
          </span>
          <span className="flex items-center gap-2">
            <FaInfoCircle /> Contact info is not allowed.
          </span>
        </p>
        {/* PERSONAL INFORMATION */}
        <fieldset className="border-t pt-6">
          <legend className="font-bold text-green-800 text-lg flex items-center gap-2 mb-4">
            <FaUser /> Personal Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800 flex items-center gap-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="gender"
                required
                aria-label="Gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800 flex items-center gap-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="name"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800 flex items-center gap-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="dob"
                type="date"
                placeholder=""
                title="Enter your Date of Birth"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800 flex items-center gap-2">
                Marital Status <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="maritalStatus"
                placeholder="Marital Status"
                title="Enter your marital status"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800 flex items-center gap-2">
                Height <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="height"
                placeholder="Height (e.g. 5ft 6in)"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800 flex items-center gap-2">
                Weight
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="weight"
                placeholder="Weight (kg)"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800 flex items-center gap-2">
                Complexion
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="color"
                placeholder="Complexion (e.g. Fair, Wheatish)"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800 flex items-center gap-2">
                Disability
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="disability"
                placeholder="If any"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800 flex items-center gap-2">
                Nationality <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="nationality"
                placeholder="Nationality"
                required
              />
            </div>
          </div>
        </fieldset>
        {/* EDUCATION DETAILS */}
        <fieldset className="border-t mt-4 pt-6">
          <legend className="font-bold text-green-800 text-lg flex items-center gap-2 mb-4">
            <FaUniversity /> Education Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Qualification <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="qualification"
                placeholder="Qualification"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">College</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="college"
                placeholder="College"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">University</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="university"
                placeholder="University"
              />
            </div>
          </div>
        </fieldset>
        {/* JOB DETAIL */}
        <fieldset className="border-t mt-4 pt-6">
          <legend className="font-bold text-green-800 text-lg flex items-center gap-2 mb-4">
            <FaBriefcase /> Job Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Rank/Position
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="rank"
                placeholder="Rank/Position"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Income</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="income"
                placeholder="Income (per month)"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Nature of Job
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="natureOfJob"
                placeholder="Nature of Job"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Future Plans
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="futurePlans"
                placeholder="Future Plans"
              />
            </div>
          </div>
        </fieldset>
        {/* RELIGION DETAILS */}
        <fieldset className="border-t mt-4 pt-6">
          <legend className="font-bold text-green-800 text-lg flex items-center gap-2 mb-4">
            <FaCheckCircle /> Religion Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Religion <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="religion"
                placeholder="Religion"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Caste</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="caste"
                placeholder="Caste"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Sect</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="sect"
                placeholder="Sect"
              />
            </div>
          </div>
        </fieldset>
        {/* PROPERTY DETAILS */}
        <fieldset className="border-t mt-4 pt-6">
          <legend className="font-bold text-green-800 text-lg flex items-center gap-2 mb-4">
            <FaHome /> Property Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Home</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="home"
                placeholder="Home (type/owned/rented)"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Size</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="size"
                placeholder="Size (marla/kanal/sqft)"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Location</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="propertyLocation"
                placeholder="Property Location"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Other Properties
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="otherProperties"
                placeholder="Other Properties (if any)"
              />
            </div>
          </div>
        </fieldset>
        {/* FAMILY DETAILS */}
        <fieldset className="border-t pt-6 mt-4">
          <legend className="font-bold text-green-800 text-lg flex items-center gap-2 mb-4">
            <FaUsers /> Family Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Father&apos;s Occupation
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="fatherOccupation"
                placeholder="Father's Occupation"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Mother&apos;s Occupation
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="motherOccupation"
                placeholder="Mother's Occupation"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Brothers Details
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="brothers"
                placeholder="Brothers Details"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Sisters Details
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="sisters"
                placeholder="Sisters Details"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Number of Married Siblings
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="marriedSiblings"
                placeholder="Number of Married Siblings"
              />
            </div>
          </div>
        </fieldset>
        {/* ADDRESS */}
        <fieldset className="border-t pt-6 mt-4">
          <legend className="font-bold text-green-800 text-lg flex items-center gap-2 mb-4">
            <FaMapMarkerAlt /> Address
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Current City <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="currentCity"
                placeholder="Current City"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Home Town</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="homeTown"
                placeholder="Home Town"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Location</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="addressLocation"
                placeholder="Location/Area"
              />
            </div>
          </div>
        </fieldset>
        {/* YOUR REQUIREMENTS */}
        <fieldset className="border-t pt-6 mt-4">
          <legend className="font-bold text-green-800 text-lg flex items-center gap-2 mb-4">
            <FaListUl /> Your Requirements
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Age Limit</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="reqAgeLimit"
                placeholder="Age Limit"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Height</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="reqHeight"
                placeholder="Height"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">City</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="reqCity"
                placeholder="City"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">Caste</label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="reqCaste"
                placeholder="Caste"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Qualification
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="reqQualification"
                placeholder="Qualification"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-green-800">
                Any Other Demand
              </label>
              <input
                className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
                name="reqOther"
                placeholder="Any Other Demand"
              />
            </div>
          </div>
        </fieldset>
        {/* Description */}
        <div className="flex flex-col mt-4 gap-2">
          <label className="font-semibold text-green-800 flex items-center gap-2">
            <FaInfoCircle /> Profile Description{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
            name="description"
            placeholder="Profile Description (no contact info)"
            rows={4}
            required
          />
          <span className="text-xs text-green-600">
            Share your background, values, and what you&apos;re looking for (no
            contact info).
          </span>
        </div>
        {/* Image Upload & Preview */}
        <div className="flex flex-col mt-4 gap-2 items-center">
          <label className="font-semibold text-green-800 flex items-center gap-2">
            <FaImage /> Profile Image <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900"
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            placeholder="Upload profile image"
            title="Upload profile image"
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Profile Preview"
              className="mt-2 rounded-full object-cover border-2 border-green-300 shadow"
              width={96}
              height={96}
            />
          )}
          <span className="text-xs text-green-600">
            Upload a clear, recent photo. Your image is private and secure.
          </span>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 rounded-full font-bold shadow-xl hover:scale-105 hover:from-green-700 hover:to-blue-600 transition-all text-lg disabled:opacity-60"
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

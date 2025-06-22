"use client";
import { useState, useRef } from "react";

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <form
        ref={formRef}
        className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full border border-blue-100 space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-green-900 mb-4">Submit Rishta Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input" name="name" placeholder="Full Name" required />
          <select className="input" name="gender" required>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input className="input" name="age" type="number" min="18" placeholder="Age" required />
          <input className="input" name="maritalStatus" placeholder="Marital Status" required />
          <input className="input" name="height" placeholder="Height (e.g. 5'6\")" required />
          <input className="input" name="country" placeholder="Country" required />
          <input className="input" name="city" placeholder="City" required />
        </div>
        <textarea className="input" name="description" placeholder="Profile Description (no contact info)" rows={4} required />
        <input className="input" name="image" type="file" accept="image/*" required />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-full font-semibold shadow hover:bg-green-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Profile"}
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-700 text-sm mt-2">{success}</p>}
        <p className="text-xs text-green-700 mt-2">All profiles are reviewed for Shariah compliance and privacy. Contact info is not allowed.</p>
      </form>
      <style jsx>{`
        .input {
          @apply border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900;
        }
      `}</style>
    </main>
  );
} 
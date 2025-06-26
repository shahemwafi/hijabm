"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen p-5 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col gap-2 border border-indigo-100"
      >
        <div className="flex flex-col items-center">
          <div className="bg-indigo-100 rounded-full p-3 mb-2">
            <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-indigo-700">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join us and start your journey!</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="p-2 rounded-lg border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-base transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="p-2 rounded-lg border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-base transition"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-md hover:from-indigo-600 hover:to-pink-600 transition"
        >
          Register
        </button>
        {error && (
          <p className="text-red-600 bg-red-50 p-2 rounded text-center text-sm mt-2">
            {error}
          </p>
        )}
        <div className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
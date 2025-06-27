"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col gap-2 border border-indigo-100"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="bg-indigo-100 rounded-full p-3 mb-2">
            <svg
              className="w-8 h-8 text-indigo-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-indigo-700">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-1">Login to your account</p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="p-2 text-black rounded-lg border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-base transition"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="p-2 text-black rounded-lg border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-base transition"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-md hover:from-indigo-600 hover:to-pink-600 transition"
        >
          Login
        </button>
        {error && (
          <p className="text-red-600 bg-red-50 p-2 rounded text-center text-sm mt-2">
            {error}
          </p>
        )}
        <div className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
}

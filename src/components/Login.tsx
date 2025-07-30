"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        // Immediate UI feedback with optimized redirect
        setTimeout(() => {
          router.replace("/");
        }, 100);
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-green-800 mb-4 sm:mb-6">
          Login to Your Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-2 sm:py-3 px-4 rounded-md hover:from-green-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        
        <div className="mt-4 sm:mt-6 text-center">
          <a href="/forgot-password" className="text-green-600 hover:text-green-800 text-sm">
            Forgot your password?
          </a>
        </div>
        
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-green-600 hover:text-green-800 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

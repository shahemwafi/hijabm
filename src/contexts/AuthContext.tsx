"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Optimized user refresh with caching
  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      
      if (res.ok) {
        const data = await res.json();
        console.log('User refreshed:', data.user);
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Optimized login with immediate UI feedback
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        console.log('Login successful:', data.user);
        setUser(data.user);
        return true;
      } else {
        console.error("Login failed:", data.error);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Optimized register with immediate UI feedback
  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        console.log('Registration successful:', data.user);
        setUser(data.user);
        return true;
      } else {
        console.error("Registration failed:", data.error);
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  // Optimized logout with immediate state update
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      console.log("User logged out");
      setUser(null);
    }
  };

  // Initialize user state on mount
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 
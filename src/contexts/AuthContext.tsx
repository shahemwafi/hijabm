"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthUser } from '@/lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      console.log('Refreshing user...');
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        console.log('User refreshed:', data.user);
        setUser(data.user);
      } else {
        console.log('No user found');
        setUser(null);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Logging in...', email);
      const startTime = Date.now();
      
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      const endTime = Date.now();
      console.log(`Login response time: ${endTime - startTime}ms`);

      if (res.ok) {
        console.log('Login successful:', data.user);
        setUser(data.user);
        return true;
      } else {
        console.log('Login failed:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Registering...', email);
      const startTime = Date.now();
      
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      const endTime = Date.now();
      console.log(`Register response time: ${endTime - startTime}ms`);

      if (res.ok) {
        console.log('Register successful:', data.user);
        setUser(data.user);
        return true;
      } else {
        console.log('Register failed:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      console.log('User logged out');
      setUser(null);
    }
  };

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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
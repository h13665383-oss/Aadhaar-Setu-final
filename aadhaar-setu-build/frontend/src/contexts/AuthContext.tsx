import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'public' | 'block' | 'district' | 'state' | 'national';

export interface User {
  name: string;
  role: UserRole;
  email: string; // Gmail as per request
  designation?: string;
  state?: string;
  district?: string;
  block?: string;
  location?: string; // Formatted location string
}

interface AuthContextType {
  user: User | null;
  register: (userData: User & { password?: string }) => Promise<void>;
  login: (email: string, password?: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (userData: User & { password?: string }) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error('Registration failed');
      }

      // Assume backend returns the created user
      const data = await res.json();
      const userToSave = data.user || userData;

      setUser(userToSave);
      localStorage.setItem('currentUser', JSON.stringify(userToSave));
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const login = async (email: string, password?: string, role?: UserRole): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

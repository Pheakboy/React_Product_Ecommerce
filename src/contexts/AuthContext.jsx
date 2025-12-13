/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage immediately
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    }
    return null;
  });

  // Derive isAuthenticated from user state instead of separate state + effect
  const isAuthenticated = !!user;

  const login = (email, password) => {
    // Simple authentication - in production, this would be an API call
    // For demo purposes, accepting any email/password
    if (email && password) {
      const userData = {
        email,
        name: email.split("@")[0], // Extract name from email
        loginTime: new Date().toISOString(),
      };
      setUser(userData);
      try {
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error saving user to localStorage:", error);
      }
      return { success: true };
    }
    return { success: false, error: "Email and password are required" };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing user from localStorage:", error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

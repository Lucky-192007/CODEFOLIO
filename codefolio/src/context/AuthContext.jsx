import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/auth";

  // Check for an existing session token on page boot
  useEffect(() => {
    const savedUser = localStorage.getItem("dashboard_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Real Database Login Authentication Context Pipeline
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // Store both user data profile metrics and the verified signed JWT token securely
      const userSession = { ...data.user, token: data.token };
      setUser(userSession);
      localStorage.setItem("dashboard_user", JSON.stringify(userSession));
    } catch (error) {
      alert(error.message);
    }
  };

  // Real Database Registration Context Pipeline
  const register = async (email, username, password) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      const userSession = { ...data.user, token: data.token };
      setUser(userSession);
      localStorage.setItem("dashboard_user", JSON.stringify(userSession));
    } catch (error) {
      alert(error.message);
    }
  };

  // ◄--- NEW STATE SYNCHRONIZATION PIPELINE FOR PROFILE FIELDS
  const updateProfileState = (updatedUserFields) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedSession = { ...prev, ...updatedUserFields };
      localStorage.setItem("dashboard_user", JSON.stringify(updatedSession));
      return updatedSession;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dashboard_user");
  };

  return (
    // Added updateProfileState to the context provider value object below:
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateProfileState }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API}/auth`;

  // Check for an existing session token on page boot
  useEffect(() => {
    const savedUser = localStorage.getItem("dashboard_user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser({
        ...JSON.parse(savedUser),
        token: savedToken
      });
    }
    setLoading(false);
  }, []);

  // Real Database Login Authentication Context Pipeline
  const login = async (email, password) => {
    try {
      // ◄--- CRITICAL SECURITY CLEANUP: WIPE PREVIOUS CACHE BEFORE A NEW USER SESSIONS BEGINS
      localStorage.removeItem("profile");
      localStorage.removeItem("projects");
      localStorage.removeItem("skills");
      localStorage.removeItem("portfolio_views");

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
      const userSession = {
        ...data.user,
        token: data.token,
      };

      setUser(userSession);

      localStorage.setItem("dashboard_user", JSON.stringify(userSession));
      localStorage.setItem("token", data.token);
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

      const userSession = {
        ...data.user,
        token: data.token,
      };

      setUser(userSession);

      localStorage.setItem("dashboard_user", JSON.stringify(userSession));
      localStorage.setItem("token", data.token);
    } catch (error) {
      alert(error.message);
    }
  };

  // STATE SYNCHRONIZATION PIPELINE FOR PROFILE FIELDS
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
    localStorage.removeItem("token");
    
    // ◄--- FIXING BUG 2 DATA LEAK ON LOGOUT
    localStorage.removeItem("profile");
    localStorage.removeItem("projects");
    localStorage.removeItem("skills");
    localStorage.removeItem("portfolio_views");
    
    // Optional: Forces context clean states to clear mounting memory instantly
    window.location.href = "/login"; 
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: user?.token || user?.token,
        login,
        register,
        logout,
        loading,
        updateProfileState
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
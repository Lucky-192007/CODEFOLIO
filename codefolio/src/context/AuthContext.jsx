import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for an existing session on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("dashboard_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  } , []);

  const login = (email, username) => {
    // In a real application, you'd make an API request here
    const mockUser = { email, username: username || email.split("@")[0] };
    setUser(mockUser);
    localStorage.setItem("dashboard_user", JSON.stringify(mockUser));
  };

  const register = (email, username) => {
    const mockUser = { email, username };
    setUser(mockUser);
    localStorage.setItem("dashboard_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dashboard_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
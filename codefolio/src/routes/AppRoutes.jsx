import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import AuthPage from "../pages/AuthPage";         
import LandingPage from "../pages/LandingPage";   // Import your new Vite-themed landing page
import PortfolioPage from "../pages/PortfolioPage";
import MyPortfolioPreview from "../pages/MyPortfolioPreview";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Theme from "../pages/Theme";
import Preview from "../pages/Preview";
import NotFoundPage from "../pages/NotFoundPage";

// A clean component wrapper to isolate protected dashboard pages safely
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Landing View */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth View: If someone is already logged in, skip the form and route to Dashboard */}
      <Route 
        path="/auth" 
        element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
      />
      {/* Common aliases — redirect to the real auth route */}
      <Route path="/login" element={<Navigate to="/auth" replace />} />
      <Route path="/signup" element={<Navigate to="/auth" replace />} />
      <Route path="/register" element={<Navigate to="/auth" replace />} />

      {/* Protected Workspace Layout Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
      <Route path="/theme" element={<ProtectedRoute><Theme /></ProtectedRoute>} />
      <Route path="/preview" element={<ProtectedRoute><Preview /></ProtectedRoute>} />
      {/* Logged-in user's own live preview — reads from PortfolioContext, no username needed */}
      <Route path="/portfolio" element={<ProtectedRoute><MyPortfolioPreview /></ProtectedRoute>} />

      {/* Public portfolio by username — fetches from the API */}
      <Route path="/:username" element={<PortfolioPage />} />

      {/* Catch-all fallback — real 404 page instead of a silent redirect */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
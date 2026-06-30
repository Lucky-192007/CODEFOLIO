import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthPage from "../pages/AuthPage";
import LandingPage from "../pages/LandingPage";
import PortfolioPage from "../pages/PortfolioPage";
import MyPortfolioPreview from "../pages/MyPortfolioPreview";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Theme from "../pages/Theme";
import Preview from "../pages/Preview";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import BillingSuccess from "../pages/BillingSuccess";
import BillingCancel from "../pages/BillingCancel";
import NotFoundPage from "../pages/NotFoundPage";
import { isAppHost } from "../utils/url";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
};

const HomeRoute = () => {
  const isCustomDomain = !isAppHost(window.location.hostname);
  return isCustomDomain ? <PortfolioPage /> : <LandingPage />;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />

      <Route
        path="/auth"
        element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />}
      />

      <Route path="/login" element={<Navigate to="/auth" replace />} />
      <Route path="/signup" element={<Navigate to="/auth" replace />} />
      <Route path="/register" element={<Navigate to="/auth" replace />} />

      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/billing/success" element={<BillingSuccess />} />
      <Route path="/billing/cancel" element={<BillingCancel />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/skills"
        element={
          <ProtectedRoute>
            <Skills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/theme"
        element={
          <ProtectedRoute>
            <Theme />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preview"
        element={
          <ProtectedRoute>
            <Preview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <MyPortfolioPreview />
          </ProtectedRoute>
        }
      />

      <Route path="/:username" element={<PortfolioPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
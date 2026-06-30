import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "../../context/AuthContext"; // Importing Auth hook
import { LogOut } from "lucide-react"; // Optional clean logout icon addition
import ProBadge from "../shared/ProBadge";

function DashboardHeader() {
  const { theme, isPro } = usePortfolio();
  const { user, logout } = useAuth(); // Destructuring user info and logout trigger

  return (
    <div className="mt-8 transition-colors duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className={`text-2xl font-black tracking-tight flex items-center gap-3 ${
          theme === "dark" ? "text-slate-100" : "text-slate-900"
        }`}>
          {/* Changes from 'Dashboard Overview' to 'Welcome, Name' dynamically */}
          {user ? `Welcome, ${user.username || "User"}` : "Welcome back!"}
          <ProBadge isPro={isPro} variant="default" />
        </h2>

        <p className={`text-sm mt-1.5 ${
          theme === "dark" ? "text-slate-400" : "text-gray-500"
        }`}>
          Track your portfolio setup completions, links, and project status.
        </p>
      </div>

      {/* Renders an exit connection button next to greeting metrics if user context exists */}
      {user && (
        <button
          onClick={logout}
          className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs font-bold transition-all duration-200 self-start sm:self-auto ${
            theme === "dark"
              ? "border-red-900/40 text-red-400 hover:bg-red-950/30"
              : "border-red-200 text-red-600 hover:bg-red-50"
          }`}
          title="Sign out of workspace session"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      )}
    </div>
  );
}

export default DashboardHeader;
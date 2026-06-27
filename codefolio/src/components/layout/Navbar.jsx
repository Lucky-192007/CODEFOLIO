import { Link, useLocation } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import { Sun, Moon, LayoutGrid } from "lucide-react";

function Navbar() {
  const { theme, toggleTheme } = usePortfolio();
  const location = useLocation();

  const isPreviewPage = location.pathname === "/preview";

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl transition-all duration-300 gap-4 border shadow-sm ${
      theme === "dark"
        ? "bg-slate-900 border-slate-800 text-white"
        : "bg-white border-slate-100 text-slate-900"
    }`}>
      <div className="flex items-center gap-4">
        <div>
          <h2 className={`text-xl font-black tracking-tight ${
            theme === "dark" ? "text-slate-100" : "text-slate-900"
          }`}>
            Welcome Back 👋
          </h2>

          <p className={`text-xs mt-0.5 font-medium ${
            theme === "dark" ? "text-slate-400" : "text-gray-500"
          }`}>
            Manage your developer portfolio easily
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        {/* Dark/Light mode theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className={`p-2.5 rounded-xl transition duration-150 inline-flex items-center justify-center border ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 hover:text-amber-305"
              : "bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100/80"
          }`}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 animate-pulse" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {!isPreviewPage && (
          <Link 
            to="/preview" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl transition duration-150 font-bold text-sm shadow-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap h-[42px]"
          >
            <LayoutGrid className="w-4 h-4" />
            Preview Skins
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;

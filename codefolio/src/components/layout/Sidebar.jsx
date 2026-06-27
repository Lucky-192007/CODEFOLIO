import { Link, useLocation } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Award,
  Palette,
  Eye,
  Globe,
  Home, 
  Menu
} from "lucide-react";

function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = usePortfolio();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Skills", path: "/skills", icon: Award },
    { name: "Theme", path: "/theme", icon: Palette },
    { name: "Preview", path: "/preview", icon: Eye },
    { name: "Portfolio", path: "/portfolio", icon: Globe },
  ];

  return (
    <aside
      className={`min-h-screen transition-all duration-300 flex-shrink-0 flex flex-col justify-between border-r ${
        sidebarCollapsed ? "w-20" : "w-64"
      } bg-[#1a1a1a] border-white/5 text-slate-100`}
    >
      {/* Top Half: Header & Primary Navigation Area */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Sidebar Header */}
        <div className="p-5 flex items-center justify-between border-b border-white/5 min-h-[81px]">
          {!sidebarCollapsed ? (
            <>
              <Link to="/dashboard" className="inline-block group">
                <h1 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors duration-150 tracking-tight flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-purple-600/30">
                    CF
                  </span>
                  CodeFolio
                </h1>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg bg-[#242424] border border-white/5 hover:bg-neutral-800 text-slate-400 hover:text-white transition shadow-sm cursor-pointer"
                title="Collapse Sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="mx-auto flex flex-col items-center gap-2">
              <Link to="/dashboard" className="block">
                <span className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-sm font-extrabold text-white shadow-md shadow-purple-600/30">
                  CF
                </span>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg bg-[#242424] border border-white/5 hover:bg-neutral-800 text-slate-400 hover:text-white transition shadow-sm cursor-pointer"
                title="Expand Sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Primary Route Links */}
        <nav className="p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition duration-150 ${
                  isActive
                    ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                } ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Half: Static Main Menu Link Container */}
      <div className="p-4 border-t border-white/5 bg-[#141414]">
        <Link
          to="/"
          className={`flex items-center gap-3 p-3 rounded-xl transition duration-150 text-indigo-400 hover:bg-indigo-500/10 ${
            sidebarCollapsed ? "justify-center" : ""
          }`}
          title={sidebarCollapsed ? "Main Menu" : undefined}
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="text-sm font-bold uppercase tracking-wider">Main Menu</span>
          )}
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
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
  BookOpen,
  Menu
} from "lucide-react";

function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, theme } = usePortfolio();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Skills", path: "/skills", icon: Award },
    { name: "Theme", path: "/theme", icon: Palette },
    { name: "Preview", path: "/preview", icon: Eye },
    { name: "Portfolio", path: "/portfolio", icon: Globe },
  ];

  return (
    <aside
      className={`min-h-screen transition-all duration-300 flex-shrink-0 flex flex-col border-r ${
        sidebarCollapsed ? "w-20" : "w-64"
      } bg-slate-900 border-slate-800 text-slate-100`}
    >
      {/* Sidebar Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800/60 min-h-[81px]">
        {!sidebarCollapsed ? (
          <>
            <Link to="/" className="inline-block group">
              <h1 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors duration-150 tracking-tight flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-purple-600/30">
                  CF
                </span>
                CodeFolio
              </h1>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition shadow-sm"
              title="Collapse Sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="mx-auto flex flex-col items-center gap-2">
            <Link to="/" className="block">
              <span className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-sm font-extrabold text-white shadow-md shadow-purple-600/30">
                CF
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition shadow-sm"
              title="Expand Sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
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
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
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
    </aside>
  );
}

export default Sidebar;

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { usePortfolio } from "../context/PortfolioContext";

function DashboardLayout({ children }) {
  const { theme, sidebarCollapsed } = usePortfolio();

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 overflow-auto flex flex-col gap-6 max-w-7xl mx-auto w-full transition-all duration-300">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
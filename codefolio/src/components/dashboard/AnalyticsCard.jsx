import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "../../context/AuthContext";
import { Eye, CalendarClock, Globe2, Copy, Check } from "lucide-react";
import { useState } from "react";

// Phase 6.3 — Portfolio Analytics
// Shows real visitor stats pulled from the backend (views + lastViewed are
// incremented server-side whenever someone hits the public /:username route).
function AnalyticsCard() {
  const { views, lastViewed, theme } = usePortfolio();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const isDark = theme === "dark";
  const username = user?.username;
  const publicPath = username ? `/${username}` : "/your-username";
  const publicUrl = `${window.location.origin}${publicPath}`;

  const formatLastViewed = (date) => {
    if (!date) return "No visits yet";

    const visited = new Date(date);
    const now = new Date();
    const diffMs = now - visited;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return visited.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-sm ${
        isDark
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-200/60 text-slate-900"
      }`}
    >
      <div>
        <h2
          className={`text-lg font-bold flex items-center gap-2 mb-4 ${
            isDark ? "text-slate-100" : "text-slate-800"
          }`}
        >
          <Eye className="w-5 h-5 text-purple-500" />
          Portfolio Analytics
        </h2>

        <div className="space-y-3">
          {/* Views */}
          <div
            className={`p-3.5 rounded-xl flex items-center justify-between border ${
              isDark
                ? "bg-slate-950/60 border-slate-800/80"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <Eye className="w-4 h-4 text-purple-500" />
              Total Views
            </span>
            <span className="text-base font-extrabold">{views.toLocaleString()}</span>
          </div>

          {/* Last visited */}
          <div
            className={`p-3.5 rounded-xl flex items-center justify-between border ${
              isDark
                ? "bg-slate-950/60 border-slate-800/80"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <CalendarClock className="w-4 h-4 text-purple-500" />
              Last Visit
            </span>
            <span className="text-sm font-bold">{formatLastViewed(lastViewed)}</span>
          </div>

          {/* Public URL */}
          <div
            className={`p-3.5 rounded-xl border ${
              isDark
                ? "bg-slate-950/60 border-slate-800/80"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-bold mb-2">
              <Globe2 className="w-4 h-4 text-purple-500" />
              Public URL
            </span>
            <div
              className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-mono ${
                isDark ? "bg-slate-900 text-slate-300" : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              <span className="truncate">{publicPath}</span>
              <button
                onClick={handleCopy}
                className={`shrink-0 p-1.5 rounded-md transition ${
                  isDark
                    ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                    : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                }`}
                title="Copy public URL"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
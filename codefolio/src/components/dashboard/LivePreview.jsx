import { Link } from "react-router-dom";
import { Briefcase, Award, Eye, ExternalLink, MapPin } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "../../context/AuthContext";

function LivePreview() {
  const { profile, projects, skills, templateId, theme } = usePortfolio();
  const { user } = useAuth();

  const isDark = theme === "dark";
  const publicPortfolioPath = user?.username ? `/${user.username}` : "/portfolio";

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-sm ${
        isDark
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-200/60 text-slate-900"
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-lg font-bold flex items-center gap-2 ${
              isDark ? "text-slate-100" : "text-slate-800"
            }`}
          >
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            Live Miniature Preview
          </h2>

          <span
            className={`text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider border ${
              isDark
                ? "bg-purple-950/45 text-purple-300 border-purple-900/40"
                : "bg-purple-50 text-purple-700 border-purple-100"
            }`}
          >
            {templateId}
          </span>
        </div>

        <div
          className={`border rounded-2xl p-5 transition-all duration-300 shadow-inner ${
            templateId === "cyberpunk"
              ? "bg-slate-950 text-cyan-400 border-cyan-500 font-mono"
              : templateId === "corporate"
              ? "bg-slate-50 text-slate-800 border-slate-200"
              : isDark
              ? "bg-slate-950 text-slate-200 border-slate-800"
              : "bg-slate-50 text-slate-900 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <img
              src={
                profile.photo ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"
              }
              alt="Profile"
              referrerPolicy="no-referrer"
              className={`w-14 h-14 rounded-full object-cover shadow-md ${
                templateId === "cyberpunk"
                  ? "border-2 border-cyan-400"
                  : templateId === "corporate"
                  ? "border-2 border-blue-600 rounded-lg"
                  : "border border-slate-200"
              }`}
            />

            <div>
              <h3
                className={`text-base font-extrabold tracking-tight ${
                  templateId === "cyberpunk"
                    ? "text-cyan-400"
                    : templateId === "corporate"
                    ? "text-slate-900"
                    : isDark
                    ? "text-white"
                    : "text-slate-950"
                }`}
              >
                {profile.fullName || "Your Full Name"}
              </h3>

              <p
                className={`text-xs font-bold ${
                  templateId === "cyberpunk"
                    ? "text-pink-500"
                    : templateId === "corporate"
                    ? "text-blue-700"
                    : "text-purple-500"
                }`}
              >
                {profile.title || "Your Job Title"}
              </p>

              {profile.location && (
                <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {profile.location}
                </p>
              )}
            </div>
          </div>

          <p className="text-xs mt-3.5 line-clamp-2 text-slate-400 leading-relaxed">
            {profile.bio || "Tell visitors about yourself in the Profile tab."}
          </p>

          <div className="mt-4 space-y-2">
            <div
              className={`p-2.5 rounded-xl text-xs flex items-center justify-between border ${
                isDark
                  ? "bg-slate-900/60 border-slate-800/80 text-slate-300"
                  : "bg-white border-slate-100 text-slate-700"
              }`}
            >
              <span className="flex items-center gap-1.5 font-bold">
                <Briefcase className="w-3.5 h-3.5 text-purple-500" />
                Featured Projects
              </span>
              <span className="font-extrabold pr-1">{projects.length} added</span>
            </div>

            <div
              className={`p-2.5 rounded-xl text-xs flex items-center justify-between border ${
                isDark
                  ? "bg-slate-900/60 border-slate-800/80 text-slate-300"
                  : "bg-white border-slate-100 text-slate-700"
              }`}
            >
              <span className="flex items-center gap-1.5 font-bold">
                <Award className="w-3.5 h-3.5 text-purple-500" />
                Core Expertise
              </span>
              <span className="font-extrabold pr-1">{skills.length} skills</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-6 flex gap-3 pt-4 border-t ${isDark ? "border-slate-800/60" : "border-slate-100"}`}>
        <Link
          to="/preview"
          className={`flex-1 py-2.5 px-4 rounded-xl transition text-center text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 ${
            isDark
              ? "bg-slate-800 hover:bg-slate-700 text-slate-100"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          <Eye className="w-4 h-4" />
          Interactive Preview
        </Link>

        <Link
          to={publicPortfolioPath}
          target="_blank"
          className={`py-2.5 px-4 border rounded-xl transition text-center text-xs font-bold flex items-center justify-center gap-1 ${
            isDark
              ? "border-slate-800 text-slate-300 hover:bg-slate-800"
              : "border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          Launch Site
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default LivePreview;

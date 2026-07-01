import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { usePortfolio } from "../context/PortfolioContext";
import { useAuth } from "../context/AuthContext";
import MyPortfolioPreview from "./MyPortfolioPreview";
import ShareMenu from "../components/dashboard/ShareMenu";
import {
  Monitor,
  Smartphone,
  ExternalLink,
  Sparkles,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Preview() {
  const { templateId, setTemplateId, theme, savePortfolioData } = usePortfolio();
  const { user } = useAuth();
  const [viewport, setViewport] = useState("desktop");
  const [unDeveloped, setUnDeveloped] = useState(null);

  const handleQuickSwitch = (id) => {
    setTemplateId(id);
    savePortfolioData({ templateId: id });
  };

  const isDark = theme === "dark";
  const publicPortfolioPath = user?.username ? `/${user.username}` : "/portfolio";
  const publicPortfolioUrl = `${window.location.origin}${publicPortfolioPath}`;

  const unavailableThemes = [
    { id: "glassmorphic", name: "Frosted Glassmorphic" },
    { id: "synthwave", name: "Neo-Tokyo Sunset" },
    { id: "aura", name: "Aurora Flow Pastel" },
    { id: "brutalist", name: "Swiss Brutalist Grid" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 transition-colors duration-300">
        <div
          className={`p-5 rounded-2xl border shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 transition ${
            isDark
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-slate-200/60 text-slate-900"
          }`}
        >
          <div>
            <h1 className="text-2xl font-black mt-0.5 tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
              Live Interactive Playground
            </h1>
            <p className={`text-sm mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Simulate and review your responsive portfolio directly on different viewport sizes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`flex items-center gap-1 border p-1 rounded-xl transition ${
                isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
              }`}
            >
              {["minimal", "cyberpunk", "corporate"].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleQuickSwitch(id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-150 capitalize ${
                    templateId === id
                      ? isDark
                        ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                        : "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                      : isDark
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {id === "minimal" ? "Minimalist" : id}
                </button>
              ))}
            </div>

            <select
              onChange={(event) => {
                const selected = unavailableThemes.find((item) => item.id === event.target.value);
                if (selected) setUnDeveloped(selected);
                event.target.value = "";
              }}
              className={`text-xs font-bold px-3 py-1.5 border rounded-xl cursor-pointer outline-none transition duration-150 h-[34px] ${
                isDark
                  ? "bg-purple-950/60 text-purple-300 border-purple-900/40 hover:bg-purple-900/40"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200"
              }`}
            >
              <option value="">Locked undeveloped themes...</option>
              {unavailableThemes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} (undeveloped)
                </option>
              ))}
            </select>

            <div
              className={`flex items-center gap-1 border p-1 rounded-xl transition ${
                isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewport === "desktop"
                    ? isDark
                      ? "bg-slate-800 text-purple-400 shadow-sm border border-slate-700"
                      : "bg-white text-purple-600 shadow-sm border border-slate-100"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewport === "mobile"
                    ? isDark
                      ? "bg-slate-800 text-purple-400 shadow-sm border border-slate-700"
                      : "bg-white text-purple-600 shadow-sm border border-slate-100"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Mobile Mockup View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <a
              href={publicPortfolioPath}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wide shadow-md shadow-purple-600/10 transition-all flex items-center gap-1.5"
            >
              Launch Site
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="relative z-50">
              <ShareMenu />
            </div>
          </div>
        </div>

        <div
          className={`flex justify-center items-center p-6 border-2 border-dashed rounded-2xl min-h-[600px] transition-all duration-300 ${
            isDark
              ? "bg-slate-950/40 border-slate-800/80"
              : "bg-slate-50/50 border-slate-200"
          }`}
        >
          {viewport === "desktop" ? (
            <div
              className={`w-full rounded-2xl shadow-xl border overflow-hidden flex flex-col h-[700px] transition ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/80"
              }`}
            >
              <div
                className={`px-4 py-3 flex items-center justify-between border-b ${
                  isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-100 border-slate-200"
                }`}
              >
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                </div>

                <div
                  className={`rounded-xl px-4 py-1.5 text-xs w-96 text-center truncate font-mono border ${
                    isDark
                      ? "bg-slate-900 border-slate-800 text-slate-400"
                      : "bg-white border-slate-200 text-slate-400 shadow-inner"
                  }`}
                >
                  {publicPortfolioUrl}
                </div>

                <div className="w-12" />
              </div>

              <div className={`flex-1 overflow-auto ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
                <MyPortfolioPreview />
              </div>
            </div>
          ) : (
            <div
              className={`relative mx-auto max-w-sm w-80 border-[10px] rounded-[3rem] p-1.5 shadow-2xl h-[650px] overflow-hidden flex flex-col transition ${
                isDark ? "border-slate-800 bg-slate-950" : "border-slate-900 bg-slate-900"
              }`}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-28 rounded-full z-10 flex items-center justify-center bg-slate-950">
                <span className="w-1.5 h-1.5 bg-slate-800 rounded-full mr-2" />
                <span className="w-10 h-1 bg-slate-800 rounded-full" />
              </div>

              <div className="flex-1 bg-white rounded-[2.5rem] overflow-auto h-full w-full">
                <MyPortfolioPreview />
              </div>

              <div className="absolute bottom-1 bg-slate-950/10 py-1.5 w-full left-0 flex justify-center backdrop-blur-[2px]">
                <span className="w-24 h-1 bg-slate-400 rounded-full" />
              </div>
            </div>
          )}
        </div>

        <AnimatePresence>
          {unDeveloped && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setUnDeveloped(null)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: "spring", duration: 0.35 }}
                className={`relative max-w-sm w-full rounded-3xl p-8 shadow-2xl border text-center z-10 overflow-hidden ${
                  isDark
                    ? "bg-slate-900 border-slate-800 text-white"
                    : "bg-white border-slate-100 text-slate-900"
                }`}
              >
                <div
                  className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 border shadow-sm ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-purple-400"
                      : "bg-purple-50 border-purple-100 text-purple-700"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-black tracking-tight">
                  Undeveloped Theme Locked
                </h3>

                <span
                  className={`inline-block mt-2 text-xs font-bold px-2.5 py-1 rounded-full border ${
                    isDark
                      ? "bg-purple-950/60 border-purple-900/30 text-purple-300"
                      : "bg-purple-50 border-purple-100 text-purple-700"
                  }`}
                >
                  {unDeveloped.name}
                </span>

                <p className={`text-xs mt-3.5 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  This layout is still under construction. Please select Minimalist, Cyberpunk, or Corporate.
                </p>

                <div className={`mt-6 pt-3.5 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                  <button
                    type="button"
                    onClick={() => setUnDeveloped(null)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-md shadow-purple-600/10"
                  >
                    Got it
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

export default Preview;
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { usePortfolio } from "../context/PortfolioContext";
import { Lock, Sparkles, Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProUpgradeButton from "../components/billing/ProUpgradeButton";

function Theme() {
  const { templateId, setTemplateId, theme } = usePortfolio();
  const [unAvailable, setUnAvailable] = useState(null);

  const isDark = theme === "dark";

  const themesList = [
    {
      id: "minimal",
      name: "Minimalist Slate",
      desc: "A clean, text-centric professional portfolio with comfortable spacing, subtle accents, and focused text hierarchy.",
      badge: "Free tier",
      isLocked: false,
    },
    {
      id: "cyberpunk",
      name: "Synth Cyberpunk",
      desc: "A high-fidelity retro HUD featuring neon glowing frames, digital status lines, and monospace text elements.",
      badge: "Free tier",
      isLocked: false,
    },
    {
      id: "corporate",
      name: "Corporate Professional",
      desc: "A polished, business-ready layout with structured sections, confident typography, and a trustworthy blue accent palette.",
      badge: "Free tier",
      isLocked: false,
    },
    {
      id: "glassmorphic",
      name: "Frosted Glassmorphic",
      desc: "Modern translucent panels hovering over vibrant animated backgrounds.",
      badge: "Unavailable",
      isLocked: true,
    },
    {
      id: "synthwave",
      name: "Neo-Tokyo Sunset",
      desc: "Warm dark-mode sunset scheme using retro pink-to-gold animated grids.",
      badge: "Unavailable",
      isLocked: true,
    },
    {
      id: "aura",
      name: "Aura Flow Pastel",
      desc: "A soft pastel look with flowing curves, serene backgrounds, and elegant hover states.",
      badge: "Unavailable",
      isLocked: true,
    },
    {
      id: "brutalist",
      name: "Swiss Brutalist Grid",
      desc: "Bold high-contrast borders, raw typography, and stark visual accents.",
      badge: "Unavailable",
      isLocked: true,
    },
  ];

  const handleSelectTheme = (themeItem) => {
    if (themeItem.isLocked) {
      setUnAvailable(themeItem);
      return;
    }

    setTemplateId(themeItem.id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 transition-colors duration-300">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className={`text-2xl font-black tracking-tight flex items-center gap-2.5 ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
              Portfolio Skins
            </h1>

            <p className={`text-sm mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Toggle your active design skin instantly or explore premium layouts.
            </p>
          </div>

          <ProUpgradeButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themesList.map((themeItem) => {
            const isActive = templateId === themeItem.id;

            return (
              <div
                key={themeItem.id}
                onClick={() => handleSelectTheme(themeItem)}
                className={`group relative rounded-2xl border p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                  isActive
                    ? isDark
                      ? "bg-purple-950/30 border-purple-500 ring-2 ring-purple-500/20 text-white"
                      : "bg-purple-50/80 border-purple-500 ring-2 ring-purple-600/10 text-slate-900"
                    : isDark
                    ? "bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700"
                    : "bg-white border-slate-200/60 text-slate-900 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                        themeItem.isLocked
                          ? isDark
                            ? "bg-purple-950/60 text-purple-300 border-purple-900/40"
                            : "bg-purple-50 text-purple-700 border-purple-100"
                          : isDark
                          ? "bg-emerald-950/60 text-emerald-300 border-emerald-900/40"
                          : "bg-emerald-50 text-emerald-700 border-emerald-100"
                      }`}
                    >
                      {themeItem.badge}
                    </span>

                    {themeItem.isLocked ? (
                      <Lock
                        className={`w-4 h-4 transition ${
                          isDark
                            ? "text-slate-500 group-hover:text-purple-400"
                            : "text-slate-400 group-hover:text-purple-600"
                        }`}
                      />
                    ) : (
                      isActive && (
                        <Check className="w-4 h-4 text-white bg-purple-600 rounded-full p-0.5 shadow-sm" />
                      )
                    )}
                  </div>

                  <h3
                    className={`font-extrabold text-base transition ${
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : isDark
                        ? "text-slate-100 group-hover:text-purple-400"
                        : "text-slate-900 group-hover:text-purple-600"
                    }`}
                  >
                    {themeItem.name}
                  </h3>

                  <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {themeItem.desc}
                  </p>
                </div>

                <div
                  className={`border-t mt-5 pt-4 flex items-center justify-between text-xs font-bold transition-all duration-200 ${
                    isDark
                      ? "border-slate-800/80 text-slate-300"
                      : "border-slate-100 text-slate-700"
                  } group-hover:translate-x-0.5`}
                >
                  <span>
                    {themeItem.isLocked
                      ? "Not Available"
                      : isActive
                      ? "Active Skin"
                      : "Activate Theme"}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {unAvailable && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setUnAvailable(null)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: "spring", duration: 0.35 }}
                className={`relative max-w-md w-full rounded-3xl p-8 shadow-2xl border text-center z-10 overflow-hidden ${
                  isDark
                    ? "bg-slate-900 border-slate-800 text-white"
                    : "bg-white border-slate-100 text-slate-900"
                }`}
              >
                <div
                  className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-5 border shadow-sm ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-purple-400"
                      : "bg-purple-50 border-purple-100 text-purple-700"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-black tracking-tight">Currently Unavailable</h3>

                <span
                  className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full border ${
                    isDark
                      ? "bg-purple-950/60 border-purple-900/30 text-purple-300"
                      : "bg-purple-50 border-purple-100 text-purple-800"
                  }`}
                >
                  {unAvailable.name}
                </span>

                <p className={`text-xs mt-4 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  This layout is still under development. Choose Minimalist, Synth Cyberpunk, or Corporate Professional for now.
                </p>

                <div className={`mt-8 pt-4 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                  <button
                    type="button"
                    onClick={() => setUnAvailable(null)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl text-xs tracking-wider uppercase transition shadow-md shadow-purple-600/10"
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

export default Theme;

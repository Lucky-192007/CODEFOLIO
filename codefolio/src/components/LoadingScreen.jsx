// Phase 6.5 — Final Production Ready
// Reusable branded loading screen, used wherever we're waiting on an
// async fetch (e.g. PortfolioPage while loading a public profile).
function LoadingScreen({ label = "Loading..." }) {
  return (
    <div className="min-h-screen bg-[#0b0613] flex flex-col items-center justify-center px-6">
      <div className="relative">
        <div className="absolute -inset-8 bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative w-12 h-12 border-4 border-slate-800 border-t-purple-500 rounded-full animate-spin" />
      </div>
      <p className="mt-6 text-sm font-bold text-slate-400 tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}
 
export default LoadingScreen;
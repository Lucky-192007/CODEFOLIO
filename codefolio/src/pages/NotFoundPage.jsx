import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";

// Phase 6.5 — Final Production Ready
// Generic 404 fallback for any unmatched route.
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0b0613] text-slate-200 flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-6">
        <div className="absolute -inset-6 bg-purple-600/20 blur-3xl rounded-full" />
        <Compass className="relative w-16 h-16 text-purple-400 animate-pulse" />
      </div>

      <h1 className="text-7xl font-black tracking-tighter text-white">404</h1>
      <p className="text-lg font-bold mt-3 text-slate-300">
        This page doesn't exist.
      </p>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">
        The page you're looking for may have been moved, deleted, or never
        existed in the first place.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold uppercase tracking-wide shadow-md shadow-purple-600/20 transition"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
import { Crown } from "lucide-react";

// Reusable "Pro" badge. Renders nothing if isPro is falsy, so it's safe
// to drop anywhere without an extra conditional at the call site.
//
// `variant` lets each template theme it to match their own visual style
// instead of one badge looking out of place everywhere:
//   - "default"   : neutral white/gold pill (Minimal, dashboard)
//   - "neon"      : glowing cyan/pink outline (Cyberpunk)
//   - "corporate" : navy/blue solid pill (Corporate)
function ProBadge({ isPro, variant = "default", className = "" }) {
  if (!isPro) return null;

  const variants = {
    default:
      "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 border border-amber-300 shadow-sm",
    neon:
      "bg-cyan-400/10 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]",
    corporate:
      "bg-blue-700 text-white border border-blue-800 shadow-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}
      title="Pro member"
    >
      <Crown className="w-3 h-3" />
      Pro
    </span>
  );
}

export default ProBadge;
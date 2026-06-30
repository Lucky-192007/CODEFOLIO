import { useState } from "react";
import { Crown, Loader2 } from "lucide-react";
import API from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";

function ProUpgradeButton({ className = "" }) {
  const { isPro, theme } = usePortfolio();
  const [loading, setLoading] = useState(false);

  const isDark = theme === "dark";
  const checkoutEnabled = import.meta.env.VITE_ENABLE_STRIPE_CHECKOUT === "true";

  const handleUpgrade = async () => {
    if (isPro) return;

    if (!checkoutEnabled) {
      alert(
        "Stripe checkout is disabled for local testing. Enable it later by adding VITE_ENABLE_STRIPE_CHECKOUT=true and real Stripe keys during deployment."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/payments/create-checkout-session");

      if (response.data?.alreadyPro) {
        alert("You are already a Pro user.");
        return;
      }

      if (!response.data?.url) {
        throw new Error("Stripe checkout URL was not returned.");
      }

      window.location.href = response.data.url;
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Unable to start checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (isPro) {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-extrabold uppercase tracking-wide ${
          isDark
            ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
            : "border-amber-200 bg-amber-50 text-amber-700"
        } ${className}`}
      >
        <Crown className="h-4 w-4" />
        Pro Active
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleUpgrade}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-slate-950 shadow-md shadow-amber-500/20 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      title={checkoutEnabled ? "Upgrade to Pro" : "Stripe checkout disabled for local testing"}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crown className="h-4 w-4" />}
      {loading ? "Opening Checkout..." : checkoutEnabled ? "Upgrade to Pro" : "Pro Checkout Later"}
    </button>
  );
}

export default ProUpgradeButton;

import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

function BillingSuccess() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="mb-6 rounded-full border border-emerald-400/30 bg-emerald-400/10 p-4">
          <CheckCircle2 className="h-12 w-12 text-emerald-300" />
        </div>

        <h1 className="text-3xl font-black tracking-tight">Pro Activated</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Your payment was completed. Stripe has sent the confirmation to the backend webhook,
          and your account is now eligible for Pro features such as the Pro badge and custom domains.
        </p>

        <Link
          to="/profile"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
        >
          Continue to Profile
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default BillingSuccess;

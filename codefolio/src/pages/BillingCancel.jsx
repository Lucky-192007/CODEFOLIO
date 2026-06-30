import { Link } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";

function BillingCancel() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="mb-6 rounded-full border border-rose-400/30 bg-rose-400/10 p-4">
          <XCircle className="h-12 w-12 text-rose-300" />
        </div>

        <h1 className="text-3xl font-black tracking-tight">Checkout Cancelled</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          No payment was completed and your account was not upgraded. You can return to the
          dashboard and start checkout again whenever you are ready.
        </p>

        <Link
          to="/theme"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default BillingCancel;

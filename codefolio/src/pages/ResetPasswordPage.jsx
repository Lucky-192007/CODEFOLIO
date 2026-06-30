import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

const API = import.meta.env.VITE_API || "https://codefolio-dtdk.onrender.com/api";

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset password.");
      }

      setSuccess(true);
      setTimeout(() => navigate("/auth"), 2000);
    } catch (err) {
      setError(err.message || "The reset link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#242424] text-slate-200 px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-white/5 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="h-12 w-12 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
            {success ? (
              <CheckCircle2 className="w-6 h-6 text-purple-200" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-purple-200" />
            )}
          </div>
          <h2 className="text-2xl font-black text-white">
            {success ? "Password Updated" : "Set a New Password"}
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            {success
              ? "Redirecting you to sign in..."
              : "Enter a new password for your account."}
          </p>
        </div>

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#242424] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#242424] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold uppercase text-xs tracking-wider transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <Link to="/auth" className="text-xs text-slate-400 hover:text-white">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
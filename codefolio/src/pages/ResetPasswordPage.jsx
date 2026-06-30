import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, Mail, User, Lock, KeyRound } from "lucide-react";

// API base URL
const API = import.meta.env.VITE_API || "http://localhost:5000/api";

function AuthPage() {
  const { login, register } = useAuth();

  // Views: login | register | forgot
  const [viewState, setViewState] = useState("login");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // ===========================
  // Main Submit Handler
  // ===========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (viewState === "forgot") {
      handleForgotPassword();
      return;
    }

    if (!email || !password) {
      alert("Please fill out all required fields.");
      return;
    }

    if (viewState === "register") {
      if (!username.trim()) {
        alert("Please enter a username.");
        return;
      }

      register(email, username, password);
    } else {
      login(email, password);
    }
  };

  // ===========================
  // Forgot Password
  // ===========================
  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your registered email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Recovery request failed.");
      }

      alert(
        `Success!\n\nTemporary Reset Link:\n\n${data.resetLink}`
      );

      console.log("Password Reset Link:", data.resetLink);

      setViewState("login");
    } catch (error) {
      alert(error.message || "Unable to connect to authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#242424] text-slate-200 px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-white/5 p-8 rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="h-12 w-12 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
            {viewState === "forgot" ? (
              <KeyRound className="w-6 h-6 text-purple-200" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-purple-200" />
            )}
          </div>

          <h2 className="text-2xl font-black text-white">
            {viewState === "login" && "Access Your Workspace"}
            {viewState === "register" && "Create Executive Account"}
            {viewState === "forgot" && "Account Recovery"}
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            {viewState === "login" &&
              "Welcome back! Enter your credentials."}

            {viewState === "register" &&
              "Create your portfolio workspace."}

            {viewState === "forgot" &&
              "Generate a temporary password reset link."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          {viewState === "register" && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Username
              </label>

              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#242424] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#242424] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Password */}
          {viewState !== "forgot" && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Password
                </label>

                {viewState === "login" && (
                  <button
                    type="button"
                    onClick={() => setViewState("forgot")}
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    Forgot?
                  </button>
                )}
              </div>

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
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold uppercase text-xs tracking-wider transition disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : viewState === "login"
              ? "Authenticate Identity"
              : viewState === "register"
              ? "Register & Launch"
              : "Send Recovery Link"}
          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center">

          {viewState === "forgot" ? (
            <button
              onClick={() => setViewState("login")}
              className="text-xs text-slate-400 hover:text-white"
            >
              Back to Sign In
            </button>
          ) : (
            <button
              onClick={() =>
                setViewState(
                  viewState === "login" ? "register" : "login"
                )
              }
              className="text-xs text-purple-400 hover:text-purple-300"
            >
              {viewState === "login"
                ? "Need an account? Register here"
                : "Already have an account? Sign In"}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default AuthPage;
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, Mail, User, Lock, KeyRound } from "lucide-react";

function AuthPage() {
  const { login, register } = useAuth();
  
  // Use a string state to switch cleanly between views: "login", "register", "forgot"
  const [viewState, setViewState] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Main Form Router
  const handleSubmit = (e) => {
    e.preventDefault();

    if (viewState === "forgot") {
      handleForgotPassword();
      return;
    }

    if (!email || !password) return alert("Please fill out required fields.");

    if (viewState === "register") {
      if (!username) return alert("Please pick a username.");
      register(email, username, password); 
    } else {
      login(email, password); 
    }
  };

  // Forgot Password API Request handler
  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your registered email address.");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Since we aren't using email servers right now, dump the reset link to check
        alert(`Success! Check your terminal console or response log.\n\nTemporary Link Generated:\n${data.resetLink}`);
        console.log("Password Reset Link:", data.resetLink);
        setViewState("login");
      } else {
        alert(data.message || "Failed to process recovery request.");
      }
    } catch (error) {
      alert("Network connection failure with authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#242424] text-slate-200 px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-white/5 p-8 rounded-2xl shadow-2xl">
        
        {/* Dynamic Header Block */}
        <div className="text-center mb-6">
          <div className="h-12 w-12 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mx-auto shadow-md mb-3">
            {viewState === "forgot" ? (
              <KeyRound className="w-6 h-6 text-purple-200" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-purple-200" />
            )}
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            {viewState === "register" && "Create Executive Account"}
            {viewState === "login" && "Access Your Workspace"}
            {viewState === "forgot" && "Account Recovery"}
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-1">
            {viewState === "register" && "Get started building your deployment mesh"}
            {viewState === "login" && "Welcome back! Enter credentials to manage portfolio metrics"}
            {viewState === "forgot" && "Enter your identity mapping parameters to request a reset link"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username (Register Only) */}
          {viewState === "register" && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-2.5 bg-[#242424] border border-white/10 text-white placeholder-slate-600 rounded-xl focus:outline-none focus:border-purple-500 font-medium transition"
                />
              </div>
            </div>
          )}

          {/* Email Input Field (Universal across all states) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Work Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm pl-10 pr-4 py-2.5 bg-[#242424] border border-white/10 text-white placeholder-slate-600 rounded-xl focus:outline-none focus:border-purple-500 font-medium transition"
              />
            </div>
          </div>

          {/* Password Input Field (Hidden during Forgot view state) */}
          {viewState !== "forgot" && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Security Password</label>
                {viewState === "login" && (
                  <button
                    type="button"
                    onClick={() => setViewState("forgot")}
                    className="text-xs font-bold text-purple-400/80 hover:text-purple-400 transition cursor-pointer"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-2.5 bg-[#242424] border border-white/10 text-white placeholder-slate-600 rounded-xl focus:outline-none focus:border-purple-500 font-medium transition"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : ""}
            {!loading && viewState === "register" && "Register & Launch"}
            {!loading && viewState === "login" && "Authenticate Identity"}
            {!loading && viewState === "forgot" && "Send Recovery Link"}
          </button>
        </form>

        {/* Bottom Switch View Controls */}
        <div className="mt-6 text-center border-t pt-4 border-white/5 flex flex-col gap-2">
          {viewState === "forgot" ? (
            <button
              onClick={() => setViewState("login")}
              className="text-xs font-bold text-slate-400 hover:text-slate-200 transition cursor-pointer"
            >
              Back to Sign In Workspace
            </button>
          ) : (
            <button
              onClick={() => setViewState(viewState === "login" ? "register" : "login")}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 transition cursor-pointer"
            >
              {viewState === "login" ? "Need an enterprise workspace? Register here" : "Already have an account? Sign In"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
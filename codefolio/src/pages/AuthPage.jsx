import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, Mail, User, Lock } from "lucide-react";

function AuthPage() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!email || !password) return alert("Please fill out required fields.");

  if (isRegister) {
    if (!username) return alert("Please pick a username.");
    // Make sure 'password' is added right here as the 3rd argument!
    register(email, username, password); 
  } else {
    // For logging in, pass email and password down to the backend route
    login(email, password); 
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#242424] text-slate-200 px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-white/5 p-8 rounded-2xl shadow-2xl">
        
        <div className="text-center mb-6">
          <div className="h-12 w-12 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mx-auto shadow-md mb-3">
            <ShieldCheck className="w-6 h-6 text-purple-200" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            {isRegister ? "Create Executive Account" : "Access Your Workspace"}
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-1">
            {isRegister ? "Get started building your deployment mesh" : "Welcome back! Enter credentials to manage portfolio metrics"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
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

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Security Password</label>
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

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
          >
            {isRegister ? "Register & Launch" : "Authenticate Identity"}
          </button>
        </form>

        <div className="mt-6 text-center border-t pt-4 border-white/5">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs font-bold text-purple-400 hover:text-purple-300 transition cursor-pointer"
          >
            {isRegister ? "Already have an account? Sign In" : "Need an enterprise workspace? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
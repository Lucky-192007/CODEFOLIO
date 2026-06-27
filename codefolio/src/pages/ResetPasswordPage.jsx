import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        alert("Success! Password modified.");
        navigate("/auth");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Failed connecting to authentication network.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center p-6">
      <form onSubmit={handleResetSubmit} className="bg-[#242424] p-8 rounded-2xl border border-white/5 max-w-md w-full space-y-4">
        <h2 className="text-xl font-black">Create New Password</h2>
        {message && <p className="text-rose-400 text-xs">{message}</p>}
        <input
          type="password"
          placeholder="New secure password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-sm"
          required
        />
        <button className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-xl font-bold text-sm transition">
          Update Credential Block
        </button>
      </form>
    </div>
  );
}
import { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";
import { sendContactMessage } from "../../api/portfolioApi";

// One component, three visual variants — so each template can keep its
// own personality without three separate forms to maintain.
const VARIANT_STYLES = {
  minimal: {
    wrapper: "space-y-4",
    label: "text-[10px] text-slate-500 font-mono uppercase tracking-wider",
    input:
      "w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition",
    textarea:
      "w-full bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition resize-none",
    button:
      "w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold uppercase tracking-wide transition",
    success: "text-emerald-400 text-xs font-mono",
    error: "text-rose-400 text-xs font-mono",
  },
  cyberpunk: {
    wrapper: "space-y-4",
    label: "text-[10px] text-pink-500 font-black tracking-widest uppercase",
    input:
      "w-full bg-[#100325] border-2 border-cyan-500/30 focus:border-cyan-400 rounded-xl px-4 py-3 text-xs font-mono text-slate-200 placeholder:text-cyan-900 focus:outline-none transition",
    textarea:
      "w-full bg-[#100325] border-2 border-cyan-500/30 focus:border-cyan-400 rounded-xl px-4 py-3 text-xs font-mono text-slate-200 placeholder:text-cyan-900 focus:outline-none transition resize-none",
    button:
      "w-full flex items-center justify-center gap-2 py-3 px-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 rounded-xl text-xs font-black uppercase tracking-widest transition",
    success: "text-cyan-400 text-xs font-black tracking-wider",
    error: "text-pink-500 text-xs font-black tracking-wider",
  },
  corporate: {
    wrapper: "space-y-4 text-left",
    label: "text-[10px] text-slate-500 font-bold uppercase tracking-wider",
    input:
      "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 transition",
    textarea:
      "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-900 transition resize-none",
    button:
      "w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold uppercase tracking-wider transition",
    success: "text-emerald-600 text-xs font-bold",
    error: "text-rose-600 text-xs font-bold",
  },
};

function ContactForm({ username, variant = "minimal" }) {
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.minimal;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      await sendContactMessage(username, form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className={`${styles.wrapper} flex flex-col items-center text-center py-6`}>
        <Check className="w-8 h-8 mb-2 opacity-80" />
        <p className={styles.success}>Message sent! They'll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs underline opacity-70 hover:opacity-100 transition"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <div>
        <label className={styles.label}>Your Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          className={`${styles.input} mt-1.5`}
          maxLength={100}
        />
      </div>
      <div>
        <label className={styles.label}>Your Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          className={`${styles.input} mt-1.5`}
          maxLength={200}
        />
      </div>
      <div>
        <label className={styles.label}>Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Let's build something together..."
          rows={4}
          className={`${styles.textarea} mt-1.5`}
          maxLength={5000}
        />
      </div>

      {status === "error" && (
        <p className={`${styles.error} flex items-center gap-1.5`}>
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={styles.button}>
        <Send className="w-3.5 h-3.5" />
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;

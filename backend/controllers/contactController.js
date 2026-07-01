const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Very small in-memory rate limiter: max 5 contact-form submissions per
// IP per 10 minutes. Good enough to stop trivial spam/abuse without
// needing Redis for a project this size.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionLog = new Map(); // ip -> [timestamps]

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

const sendContactMessage = async (req, res) => {
  try {
    const { username } = req.params;
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "Name, email, and message are all required." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }
    if (message.length > 5000) {
      return res.status(400).json({ message: "Message is too long." });
    }

    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
    if (isRateLimited(ip)) {
      return res.status(429).json({ message: "Too many messages sent recently. Please try again later." });
    }

    // Select +email here ONLY for internal use — it is never sent back
    // to the client in the response.
    const owner = await User.findOne({ username }).select("username fullName email");
    if (!owner) {
      return res.status(404).json({ message: "This portfolio doesn't exist." });
    }
    if (!owner.email) {
      return res.status(503).json({ message: "This developer hasn't enabled contact messages yet." });
    }

    // Respond immediately — the visitor submitting the form shouldn't ever
    // wait on an email round trip. If the send fails, it's logged
    // server-side for you to notice, but their submission still succeeds.
    res.status(200).json({ message: "Message sent successfully!" });

    sendEmail({
      to: owner.email,
      replyTo: email,
      subject: `New portfolio message from ${name} (via CodeFolio)`,
      html: `
        <p>You've got a new message from your CodeFolio portfolio page.</p>
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="color:#888;font-size:12px;">Reply directly to this email to respond to ${escapeHtml(name)} — your address was never shown to them.</p>
      `,
    }).catch((emailError) => {
      console.error("CONTACT FORM EMAIL ERROR:", emailError.message);
    });
  } catch (error) {
    console.error("CONTACT FORM ERROR:", error.message);
    res.status(500).json({ message: "Could not send your message right now. Please try again later." });
  }
};

// Minimal HTML escaping so submitted text can't inject markup into the
// email we render and send.
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports = { sendContactMessage };
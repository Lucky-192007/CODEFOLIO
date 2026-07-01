// Sends email via Brevo's HTTP API instead of raw SMTP.
//
// Why: SMTP (ports 465/587) appears to be silently blocked/dropped on
// Render's outbound network — connections don't get actively refused,
// they just hang until the OS's own TCP timeout kicks in (several
// minutes), which made both password-reset and contact-form emails
// unreliable. An HTTPS API call on port 443 doesn't hit that problem —
// it's the same kind of request your frontend already makes to your own
// backend, so it works from anywhere a normal API call works.
//
// Setup: sign up free at brevo.com, verify a sender email (no domain
// required — just a 6-digit code sent to that inbox), then set these in
// your environment:
//   BREVO_API_KEY = the API key from Settings > SMTP & API > API Keys
//   EMAIL_FROM    = the verified sender address, e.g. "you@gmail.com"
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_USER;
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "CodeFolio";

/**
 * Sends an email. Throws if BREVO_API_KEY/EMAIL_FROM aren't configured, or
 * if Brevo's API rejects the request, so callers can decide how to surface
 * that (e.g. still succeed the request but log a warning, vs. fail
 * outright).
 */
const sendEmail = async ({ to, subject, html, replyTo }) => {
  if (!BREVO_API_KEY || !EMAIL_FROM) {
    throw new Error(
      "Email service is not configured. Set BREVO_API_KEY and EMAIL_FROM in your environment variables."
    );
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: EMAIL_FROM, name: EMAIL_FROM_NAME },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      ...(replyTo ? { replyTo: { email: replyTo } } : {}),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`Brevo API error (${response.status}): ${errorBody}`);
  }
};

module.exports = sendEmail;
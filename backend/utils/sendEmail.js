const nodemailer = require("nodemailer");

// Single shared transporter. Works out of the box with Gmail (using an
// "App Password", not your normal password) but any SMTP provider works —
// just set EMAIL_HOST/EMAIL_PORT instead of EMAIL_SERVICE.
const transporter = nodemailer.createTransport(
  process.env.EMAIL_HOST
    ? {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: Number(process.env.EMAIL_PORT) === 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        // Force IPv4: many cloud hosts (Render, Heroku, etc.) have broken
        // outbound IPv6 routing, which makes Gmail's SMTP connection hang
        // until it times out instead of failing fast or connecting.
        family: 4,
      }
    : {
        // Use Gmail's SMTP host explicitly instead of the "service" shorthand
        // so we can also force IPv4 below.
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        family: 4,
      }
);

/**
 * Sends an email. Throws if EMAIL_USER/EMAIL_PASS aren't configured so
 * callers can decide how to surface that (e.g. still succeed the request
 * but log a warning, vs. fail outright).
 */
const sendEmail = async ({ to, subject, html, replyTo }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "Email service is not configured. Set EMAIL_USER and EMAIL_PASS (and optionally EMAIL_HOST/EMAIL_PORT or EMAIL_SERVICE) in your .env file."
    );
  }

  await transporter.sendMail({
    from: `"CodeFolio" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
};

module.exports = sendEmail;
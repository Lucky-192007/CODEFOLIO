import API from "../services/api";

export const getPublicPortfolio = async (username) => {
  const response = await API.get(`/portfolio/${username}`);

  // Backend wraps the result as { user: {...} }. Unwrap it here so every
  // consumer of this function (PortfolioPage, templates, analytics) gets
  // a flat user object and can read fields like .fullName, .views,
  // .templateId directly without needing to know about the wrapper.
  return response.data.user;
};

// Looks up a portfolio by a mapped custom domain (e.g. visitor lands on
// johndoe.com, which is CNAME'd to this app). Same response shape as
// getPublicPortfolio so callers don't need to branch.
export const getPortfolioByDomain = async (domain) => {
  const response = await API.get(`/portfolio/domain/${domain}`);
  return response.data.user;
};

// Sends a message from a portfolio visitor to the portfolio owner.
// The owner's real email address is never exposed to the caller — the
// backend looks it up server-side and forwards the message.
export const sendContactMessage = async (username, { name, email, message }) => {
  const response = await API.post(`/contact/${username}`, { name, email, message });
  return response.data;
};
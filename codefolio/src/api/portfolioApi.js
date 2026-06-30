import API from "../services/api";

export const getPublicPortfolio = async (username) => {
  const response = await API.get(`/portfolio/${username}`);

  // Backend wraps the result as { user: {...} }. Unwrap it here so every
  // consumer of this function (PortfolioPage, templates, analytics) gets
  // a flat user object and can read fields like .fullName, .views,
  // .templateId directly without needing to know about the wrapper.
  return response.data.user;
};
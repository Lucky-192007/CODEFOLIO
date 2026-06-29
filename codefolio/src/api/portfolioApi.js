import API from "./api";

export const getPublicPortfolio = async (username) => {
  const response = await API.get(`/portfolio/${username}`);
  return response.data;
};
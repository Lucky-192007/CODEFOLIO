import API from "./api";

export const savePortfolio = async (portfolio) => {
  const { data } = await API.post("/portfolio", portfolio);
  return data;
};

export const getPortfolio = async () => {
  const { data } = await API.get("/portfolio");
  return data;
};
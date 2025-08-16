import api from "./index";

export const getAllcarts = async () => {
  const res = await api.get("/carts");
  return res.data;
};

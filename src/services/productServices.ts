import api from "./index";

// Ambil semua posts
export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

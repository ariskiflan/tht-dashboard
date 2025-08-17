import api from "./index";

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const searchProducts = async (query: string) => {
  if (!query || query.trim() === "") return { products: [] };

  const res = await api.get(`/products/search?q=${query}`);
  return res.data;
};

export const sortProducts = async (sortBy: string, order: "asc" | "desc") => {
  const res = await api.get(`/products?sortBy=${sortBy}&order=${order}`);
  return res.data;
};

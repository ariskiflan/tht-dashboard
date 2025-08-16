import api from "./index";

// Ambil semua resep
export const getAllRecipes = async () => {
  const res = await api.get("/recipes");
  return res.data;
};

// Ambil semua tags (kalau endpoint tersedia)
export const getAllTags = async () => {
  const res = await api.get("/recipes/tags");
  return res.data;
};

// Ambil resep berdasarkan tag
export const getRecipesByTag = async (tag: string) => {
  const res = await api.get(`/recipes/tag/${tag}`);
  return res.data;
};

// Ambil resep berdasarkan meal type
export const getRecipesByMealType = async (mealType: string) => {
  const res = await api.get(`/recipes/meal-type/${mealType}`);
  return res.data;
};

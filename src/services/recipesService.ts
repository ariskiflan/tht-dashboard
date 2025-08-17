import api from "./index";

export const getAllRecipes = async () => {
  const res = await api.get("/recipes");
  return res.data;
};

// Ambil semua tags (kalau endpoint tersedia)
export const getAllTags = async () => {
  const res = await api.get("/recipes/tags");
  return res.data;
};

export const getRecipesByTag = async (tag: string) => {
  const res = await api.get(`/recipes/tag/${tag}`);
  return res.data;
};

export const getRecipesByMealType = async (mealType: string) => {
  const res = await api.get(`/recipes/meal-type/${mealType}`);
  return res.data;
};

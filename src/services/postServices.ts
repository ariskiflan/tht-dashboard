// services/postService.ts
import api from "./index";

// Ambil semua posts
export async function getAllPosts() {
  const res = await api.get("/posts");
  return res.data;
}

// Ambil post berdasarkan ID
export async function getPostById(id: number) {
  const res = await api.get(`/posts/${id}`);
  return res.data;
}

import { authFetch } from "../lib/auth";

const addFavByHikeId = async (hikeId) => {
  try {
    const res = await authFetch(
      `${import.meta.env.VITE_BACKEND_URL}/protected/favorites/${hikeId}`,
      { method: "POST" },
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (e) {
    console.error("Error adding favorite:", e);
  }
};

const removeFavByHikeId = async (hikeId) => {
  try {
    const res = await authFetch(
      `${import.meta.env.VITE_BACKEND_URL}/protected/favorites/${hikeId}`,
      { method: "DELETE" },
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (e) {
    console.error("Error removing favorite:", e);
  }
};

export { addFavByHikeId, removeFavByHikeId };

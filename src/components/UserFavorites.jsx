import { SignedIn } from "@neondatabase/neon-js/auth/react";
import { authFetch } from "../lib/auth";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function UserFavorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchUserFavorites = async () => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_BACKEND_URL}/protected/my-favorites`,
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  useEffect(() => {
    fetchUserFavorites();
  }, []);

  return (
    <SignedIn>
      <h1>my favorited hikes</h1>
      <Button onClick={fetchUserFavorites}>Refresh Favorites</Button>
      {favorites ? (
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>
              <Link to={`/hikes/${favorite.id}`}>
                {favorite.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>loading...</p>
      )}
    </SignedIn>
  );
}

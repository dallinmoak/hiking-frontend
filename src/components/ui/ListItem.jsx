import "./ListItem.css";
import { Link } from "react-router-dom";
import { SignedIn } from "@neondatabase/neon-js/auth/react/ui";
import { authFetch } from "../../lib/auth";
import { useState, useEffect } from "react";

export default function ListItem({ hike, refreshList = ()=> {} }) {
  const [isFavorite, setIsFavorite] = useState(hike.isfavorite);


  const fetchFavStatus = async () => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_BACKEND_URL}/protected/hikes/is-favorite/${hike.id}`,
      );
      const data = await res.json();
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error("Error fetching favorite status:", error);
    }
  };

  useEffect(() => {
    fetchFavStatus();
   }, [hike]);

  const addFavorite = async (hikeId) => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_BACKEND_URL}/protected/favorites/${hikeId}`,
        { method: "POST" },
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setIsFavorite(true);
      refreshList();
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (hikeId) => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_BACKEND_URL}/protected/favorites/${hikeId}`,
        { method: "DELETE" },
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setIsFavorite(false);
      refreshList();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(hike.id);
    } else {
      addFavorite(hike.id);
    }
  };

  return (
    <li className="cpt-list-item">
      <Link to={`hikes/${hike.id}`}>
        <p className="title">{hike.name}</p>
        <p className="description">
          {hike.description.substring(0, 35)}
          {hike.description.length > 35 ? "..." : ""} ({hike.id})
        </p>
      </Link>
      <SignedIn>
        <img
          onClick={handleFavoriteClick}
          src={`images/favorite-${isFavorite ? "solid" : "outline"}.svg`}
          alt="favorite icon"
          className="favorite-icon"
        />
      </SignedIn>
    </li>
  );
}

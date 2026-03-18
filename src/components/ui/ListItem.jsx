import "./ListItem.css";
import { Link } from "react-router-dom";
import { SignedIn } from "@neondatabase/neon-js/auth/react/ui";
import { authFetch } from "../../lib/auth";
import { useState, useEffect } from "react";
import { addFavByHikeId, removeFavByHikeId } from "../../int/user-data";

export default function ListItem({
  hike,
  refreshList = () => {},
  sortNearest = false,
}) {
  const [isFavorite, setIsFavorite] = useState(hike.isfavorite);

  const [favoriteCount, setFavoriteCount] = useState(hike.favoriteCount);

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
    await addFavByHikeId(hikeId);
    setIsFavorite(true);
    setFavoriteCount((prevCount) => prevCount + 1);
    refreshList();
  };

  const removeFavorite = async (hikeId) => {
    await removeFavByHikeId(hikeId);
    setIsFavorite(false);
    setFavoriteCount((prevCount) => prevCount - 1);
    refreshList();
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
      <Link to={`/hikes/${hike.id}`}>
        <p className="title">{hike.name}</p>
        <p className="description">
          {hike.description.substring(0, 35)}
          {hike.description.length > 35 ? "..." : ""} ({hike.id})
        </p>
        <p>
          {sortNearest &&
            hike.distance &&
            `${hike.distance.toFixed(1)} miles away`}
        </p>
        <p>
          {favoriteCount > 0
            ? `${favoriteCount} ${favoriteCount === 1 ? "favorite" : "favorites"}`
            : "\u00A0"}
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

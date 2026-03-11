import "./UserFavorites.css";
import { SignedIn } from "@neondatabase/neon-js/auth/react";
import { authFetch } from "../lib/auth";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import ListItem from "./ui/ListItem";

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
    <div className="cpt-user-favorites">
      <SignedIn>
        <h1>my favorited hikes</h1>
        <Button onClick={fetchUserFavorites}>Refresh Favorites</Button>
        {favorites ? (
          <ul>
            {favorites.map((favorite, index) => (
              <ListItem key={index} hike={favorite} refreshList={()=> {
                fetchUserFavorites();
              }}/>
            ))}
          </ul>
        ) : (
          <p>loading...</p>
        )}
      </SignedIn>
    </div>
  );
}

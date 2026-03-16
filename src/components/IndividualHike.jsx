import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { parseCoordsArray } from "../utils";
import DisplayPath from "./DisplayPath";
import "./IndividualHike.css";
import { SignedIn } from "@neondatabase/neon-js/auth/react";
import { authFetch, getCurrentUserId } from "../lib/auth";
import Button from "./ui/Button";

export default function IndividualHike() {
  const { id } = useParams();

  const [hike, setHike] = useState();
  const [userId, setUserId] = useState();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getHike();
    const getUserId = async () => {
      setUserId(await getCurrentUserId());
    };
    getUserId();
  }, []);

  const getHike = async () => {
    const hikeUrl = `${import.meta.env.VITE_BACKEND_URL}/hikes/${id}`;
    const hikeRes = await fetch(hikeUrl);
    const hikeData = await hikeRes.json();
    setHike(hikeData);
    const userFavs = await Promise.all(
      hikeData.userFavoriteItems.map(async (fav) => {
        const userRes = await authFetch(
          `${import.meta.env.VITE_BACKEND_URL}/protected/users/${fav.userId}`,
        );
        const userData = await userRes.json();
        return userData;
      }),
    );
    setFavorites(userFavs);
  };

  const handleDelete = async () => {
    try {
      const response = await authFetch(
        `${import.meta.env.VITE_BACKEND_URL}/protected/hikes/${id}`,
        { method: "DELETE" },
      );
      const data = await response.json();
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Error: Deletion failed");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {hike ? (
        <>
          <div id="hike-container">
            <h3>ID:&nbsp;{hike.id}</h3>
            <p>
              <strong>Name:</strong>&nbsp;{hike.name}
            </p>
            <DisplayPath pathData={parseCoordsArray(hike.location)} />
            <p>
              <strong>Description:</strong>&nbsp;{hike.description}
            </p>
            <p>
              <strong>Created At:</strong>&nbsp;{hike.createdAt}
            </p>
            <p>
              <strong>Updated At:</strong>&nbsp;{hike.updatedAt}
            </p>
            <p>
              <strong>Author:</strong>&nbsp;{hike.authorName}
            </p>
            {hike.favoriteCount > 0 && (
              <>
                <p>
                  <strong>Favorite Count:</strong>&nbsp;{hike.favoriteCount}
                </p>
                {favorites.map((fav, index) => {
                  return (
                    <p key={index}>
                      <strong>{fav.name}</strong>&nbsp;favorited this hike.
                    </p>
                  );
                })}
              </>
            )}
            <SignedIn>
              {userId === hike.authorId && (
                <>
                  <br></br>
                  <Button className="delete" onClick={() => handleDelete()}>
                    Delete Hike
                  </Button>
                </>
              )}
            </SignedIn>
          </div>
        </>
      ) : (
        <h2 className="loading">Loading...</h2>
      )}
    </>
  );
}

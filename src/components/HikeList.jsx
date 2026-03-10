import { useEffect } from "react";
import { useState } from "react";
import { useHikeContext } from "../context/HikeContext";
import "./HikeList.css";
import ListItem from "./ui/ListItem";
import { authFetch, getCurrentUserId } from "../lib/auth";

export default function HikeList() {
  const { refresh } = useHikeContext();

  const [hikes, setHikes] = useState();

  useEffect(() => {
    async function fetchHikes() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/hikes`);
      const tempHikes = await response.json();
      setHikes(tempHikes);
    }
    fetchHikes();
  }, [refresh]);

  return (
    <>
      <div id="hikelist-container">
        <h2>Hikes:</h2>
        {hikes ? (
          <ul id="hikeList">
            {hikes.map((hike) => {
              return (
                <ListItem key={hike.id} hike={hike}/>
              );
            })}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

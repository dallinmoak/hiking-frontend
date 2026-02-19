import { useEffect } from "react";
import { useState } from "react";
import { useHikeContext } from "../context/HikeContext";
import { Link } from "react-router-dom";

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
      <h2>Hikes:</h2>
      {hikes && (
        <ul id="hikeList">
          {hikes.map((hike) => {
            return (
              <li key={hike.id}>
                <Link to={`/hikes/${hike.id}`}>
                  <h3>ID:&nbsp;{hike.id}</h3>
                  <p>Name:&nbsp;{hike.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

import { useEffect } from "react";
import { useState } from "react";
import { useHikeContext } from "../context/HikeContext";
import { Link } from "react-router-dom";
import './HikeList.css';

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
                <li key={hike.id}>
                  <Link to={`/hikes/${hike.id}`} className="hike-link">
                    <h3><strong>ID:</strong>&nbsp;{hike.id}</h3>
                    <p><strong>Name:</strong>&nbsp;{hike.name}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (<p>Loading...</p>)}
      </div>
    </>
  );
}

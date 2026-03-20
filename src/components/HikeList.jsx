import { useEffect, useState, useMemo } from "react";
import { useHikeContext } from "../context/HikeContext";
import "./HikeList.css";
import Button from "./ui/Button";
import { parseCoordsArray } from "../utils";
import { parseNearestHikes } from "../utils";
import ListItem from "./ui/ListItem";

export default function HikeList() {
  const { refresh } = useHikeContext();

  const [hikes, setHikes] = useState([]);
  const [sortMode, setSortMode] = useState("default");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        console.log("location denied");
      },
    );
  }, []);

  useEffect(() => {
    async function fetchHikes() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/hikes`);
      const tempHikes = await response.json();
      setHikes(tempHikes);
    }
    fetchHikes();
  }, [refresh]);

  const sortedHikes = useMemo(() => {
    if (sortMode == "default" || !location) return hikes;

    if (sortMode == "nearest") {
      return [...hikes]
        .map((hike) => {
          const coords = parseCoordsArray(hike.location);

          if (!coords.length) {
            return { ...hike, distance: Infinity };
          }

          const [lon, lat] = coords[0];

          return {
            ...hike,
            distance: parseNearestHikes(location.lat, location.lon, lat, lon),
          };
        })
        .sort((a, b) => a.distance - b.distance);
    }


    if (sortMode == "favorites") {
      return hikes
        .sort((a, b) => b.favoriteCount - a.favoriteCount);

    }
  }, [hikes, sortMode, location]);



return (
  <div id="hikelist-container">
    <h2>Hikes:</h2>

    <div className="sort-buttons">
      <Button
        className={sortMode === "default" ? "primary" : "secondary"}
        onClick={() => setSortMode("default")}
      >
        Default
      </Button>

      <Button
        className={sortMode === "nearest" ? "primary" : "secondary"}
        onClick={() => setSortMode("nearest")}
      >
        Sort By Nearest
      </Button>

      <Button
        className={sortMode === "favorites" ? "primary" : "secondary"}
        onClick={() => setSortMode("favorites")}
      >
        Sort By Favorites
      </Button>
    </div>

    {sortMode === "nearest" && !location && <p>Getting your location…</p>}

    {hikes.length === 0 ? (
      <p>Loading...</p>
    ) : (
      <ul id="hikeList">
        {sortedHikes.map((hike) => (
          <>
            <ListItem key={hike.id} hike={hike} sortMode={sortMode} />
          </>
        ))}
      </ul>
    )}
  </div>
);
}

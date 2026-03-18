import { useEffect, useState, useMemo } from "react";
import { useHikeContext } from "../context/HikeContext";
import "./HikeList.css";
import Button from "./ui/Button";
import { parseCoordsArray } from "../utils";
import { getDistanceMiles } from "./ParseNearestHikes";
import ListItem from "./ui/ListItem";
import { authFetch, getCurrentUserId } from "../lib/auth";

export default function HikeList() {
  const { refresh } = useHikeContext();

  const [hikes, setHikes] = useState([]);
  const [sortNearest, setSortNearest] = useState(false);
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
    if (!sortNearest || !location) return hikes;

    return [...hikes]
      .map((hike) => {
        const coords = parseCoordsArray(hike.location);

        if (!coords.length) {
          return { ...hike, distance: Infinity };
        }

        const [lon, lat] = coords[0];

        return {
          ...hike,
          distance: getDistanceMiles(location.lat, location.lon, lat, lon),
        };
      })
      .sort((a, b) => a.distance - b.distance);
  }, [hikes, location, sortNearest]);

  return (
    <div id="hikelist-container">
      <h2>Hikes:</h2>

      <Button
        className={sortNearest ? "primary" : "secondary"}
        onClick={() => setSortNearest((prev) => !prev)}
      >
        {sortNearest ? "Default Order" : "Sort By Nearest"}
      </Button>

      {sortNearest && !location && <p>Getting your location…</p>}

      {hikes.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul id="hikeList">
          {sortedHikes.map((hike) => (
            <>
              <ListItem key={hike.id} hike={hike} sortNearest={sortNearest} />
            </>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useEffect, useState, useMemo } from "react";
import { useHikeContext } from "../context/HikeContext";
import { Link } from "react-router-dom";
import "./HikeList.css";
import Button from "./ui/Button";
import { parseCoordsArray } from "../utils";
import { getDistanceMiles } from "./ParseNearestHikes";

export default function HikeList() {
  const { refresh } = useHikeContext();

  const [hikes, setHikes] = useState([]);
  const [sortNearest, setSortNearest] = useState(false);
  const [location, setLocation] = useState(null);

  // get user location
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
      }
    );
  }, []);

  // fetch hikes
  useEffect(() => {
    async function fetchHikes() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/hikes`
      );
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
          distance: getDistanceMiles(
            location.lat,
            location.lon,
            lat,
            lon
          ),
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

      {sortNearest && !location && (
        <p>Getting your location…</p>
      )}

      {hikes.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul id="hikeList">
          {sortedHikes.map((hike) => (
            <li key={hike.id}>
              <Link to={`/hikes/${hike.id}`} className="hike-link">
                <h3>
                  <strong>ID:</strong> {hike.id}
                </h3>

                <p>
                  <strong>Name:</strong> {hike.name}
                </p>

                {sortNearest && hike.distance && (
                  <p>
                    {hike.distance.toFixed(1)} miles away
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
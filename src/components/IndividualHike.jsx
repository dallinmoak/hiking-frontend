import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { parseCoordsArray } from "../utils";
import DisplayPath from "./DisplayPath";
import "./IndividualHike.css";
import { SignedIn } from "@neondatabase/neon-js/auth/react";
import { authFetch } from "../lib/auth";
import Button from "./ui/Button";

export default function IndividualHike() {
  const { id } = useParams();

  const [hike, setHike] = useState();

  useEffect(() => {
    getHike();
  }, []);

  const getHike = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/hikes/${id}`;
    const response = await fetch(url);
    const hike = await response.json();
    setHike(hike);
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
            <SignedIn>
              <br></br>
              <Button onClick={() => handleDelete()}>Delete Hike</Button>
            </SignedIn>
          </div>
        </>
      ) : (
        <h2 className="loading">Loading...</h2>
      )}
    </>
  );
}

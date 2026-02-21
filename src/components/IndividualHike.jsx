import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

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
  return (
    <>
      {hike ? (
        <>
          <h3>ID:&nbsp;{hike.id}</h3>
          <p>Name:&nbsp;{hike.name}</p>
          <p>Location:&nbsp;{hike.location}</p>
          <p>Description:&nbsp;{hike.description}</p>
          <p>Created At:&nbsp;{hike.createdAt}</p>
          <p>Updated At:&nbsp;{hike.updatedAt}</p>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

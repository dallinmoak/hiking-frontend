import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";

function App() {
  const [data, setData] = useState();

  async function fetchData() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/hikes`);
    const tempData = await response.json();
    setData(tempData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // form handler function goes here

  return (
    <>
    <Header/>
      <h1>hikes</h1>
      {data && (
        <ul>
          {data.map((hike) => {
            return (
              <li key={hike.id}>
                <h3>ID:&nbsp;{hike.id}</h3>
                <div>Name:&nbsp;{hike.name}</div>
                <div>Location:&nbsp;{hike.location}</div>
                <div>Created At:&nbsp;{hike.createdAt}</div>
                <div>Updated At:&nbsp;{hike.updatedAt}</div>
              </li>
            );
          })}
        </ul>
      )}
      {/* form goes here */}
    </>
  );
}

export default App;

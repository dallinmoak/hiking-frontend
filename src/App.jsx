import { useState, useEffect } from "react";
import "./App.css";

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
  // needs to create new hike data from name and location. id, created, & updated are all auto.
  function eventHandler(event) {}

  return (
    <>
      <h1>hikes</h1>
      {data && (
        <ul id="hikeList">
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
      { // FORM
        <form>
          <label for="hikeName">Name:</label>
          <input type="text" id="hikeName" name="hikeName" />
          <br></br>

          <label for="hikeLocation">Location:</label>
          <input type="text" id="hikeLocation" name="hikeLocation" />
          <br></br>

          <button type="submit" id="hikeSubmit" onSubmit={eventHandler}>Submit</button>
        </form>
      }
    </>
  );
}

export default App;
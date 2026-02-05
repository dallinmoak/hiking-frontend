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
  // needs to create new hike data from name and location. id, created, & updated are all auto.
  async function eventHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newHike = {
      name: formData.get('hikeName'),
      location: formData.get('hikeLocation'),
      description: formData.get('hikeDescription')
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/hikes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHike),
      })
      if (response.ok) {
        console.log(response);
        fetchData();
        event.target.reset();
      } else {
        console.log(response);
      } 
    }
    catch(error) {
      console.error('Hiking Post error:', error);
    }
  }

  return (
    <>
    <Header />
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
        <form onSubmit={eventHandler}>
          <label htmlFor="hikeName">Name:</label>
          <input type="text" id="hikeName" name="hikeName" />
          <br></br>

          <label htmlFor="hikeLocation">Location:</label>
          <input type="text" id="hikeLocation" name="hikeLocation" />
          <br></br>

          <label htmlFor="hikeDescription">Description:</label>
          <input type="text" id="hikeDescription" name="hikeDescription" />
          <br></br>

          <button type="submit" id="hikeSubmit">Submit</button>
        </form>
      }
    </>
  );
}

export default App;
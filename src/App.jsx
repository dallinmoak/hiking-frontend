import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState()

  async function fetchData() {
    const response = await fetch('https://hiking-backend.vercel.app/hikes');
    // const response = await fetch('http://localhost:3000/hikes');
    const tempData = await response.json();
    setData(tempData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default App

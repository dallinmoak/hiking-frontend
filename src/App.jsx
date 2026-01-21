import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
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

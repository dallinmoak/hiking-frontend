import "./App.css";
import Header from "./components/Header";
import HikeList from "./components/HikeList";
import HikeSingular from "./components/HikeSingular";
import NewHike from "./components/NewHike";
import { HikeProvider } from "./context/HikeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HikeProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HikeList />} exact />
            <Route path="/newHike" element={<NewHike />} exact />
            <Route path="/hikeSingular/:hikeID" element={<HikeSingular />}></Route>
          </Routes>
        </HikeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

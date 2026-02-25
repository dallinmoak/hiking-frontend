import "./App.css";
import Header from "./components/Header";
import HikeList from "./components/HikeList";
import NewHike from "./components/NewHike";
import IndividualHike from "./components/IndividualHike";
import { HikeProvider } from "./context/HikeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "./lib/auth";

function App() {
  return (
    <>
      <NeonAuthUIProvider emailOTP authClient={authClient}>
        <BrowserRouter>
          <HikeProvider>
            <Header />
            <Routes>
              <Route path="/" element={<HikeList />} exact />
              <Route path="/newHike" element={<NewHike />} exact />
              <Route path="/hikes/:id" element={<IndividualHike />} />
            </Routes>
          </HikeProvider>
        </BrowserRouter>
      </NeonAuthUIProvider>
    </>
  );
}

export default App;

import "./App.css";
import Header from "./components/Header";
import HikeList from "./components/HikeList";
import NewHike from "./components/NewHike";
import { HikeProvider } from "./context/HikeContext";

function App() {
  return (
    <>
      <HikeProvider>
        <Header />
        <HikeList />
        <NewHike />
      </HikeProvider>
    </>
  );
}

export default App;

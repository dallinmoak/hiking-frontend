import { createContext, useState, useContext } from "react";

const HikeContext = createContext();

export const HikeProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <HikeContext.Provider value={{ refresh, toggleRefresh }}>
      {children}
    </HikeContext.Provider>
  );
};

export const useHikeContext = () => {
  const context = useContext(HikeContext);
  if (!context) {
    throw new Error("useHikeContext must be used within a HikeProvider");
  }
  return context;
}
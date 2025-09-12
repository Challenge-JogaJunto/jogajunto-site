import { createContext, useContext } from "react";

export const GlobalContext = createContext();

const useGlobal = () => {
  return useContext(GlobalContext);
};

export default useGlobal;

import { useEffect, useState } from "react";
import { GlobalContext } from "../hooks/useGlobal";

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(sessionStorage.getItem("user") || null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", user);
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const globalValue = {
    user,
    setUser,
    theme,
    setTheme,
  };
  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

import { useEffect, useState } from "react";
import { GlobalContext } from "../hooks/useGlobal";
import usersData from "../json/users.json";
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [users, setUsers] = useState(usersData || []);

  useEffect(() => {
    if (localStorage.getItem("users") === null) {
      localStorage.setItem("users", JSON.stringify(usersData));
    } else {
      setUsers(JSON.parse(localStorage.getItem("users")) || []);
    }
  }, [users]);

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
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const globalValue = {
    user,
    setUser,
    theme,
    setTheme,
    users,
    setUsers,
  };
  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

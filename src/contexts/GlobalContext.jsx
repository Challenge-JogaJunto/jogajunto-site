import {useEffect, useState} from "react";
import {GlobalContext} from "../hooks/useGlobal";
import {LuGitFork} from "react-icons/lu";
import usersJson from "@/assets/data/users.json";

export const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const [loading, setLoading] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const local = localStorage.getItem("allUsers");
        if (local) {
            setUsers(JSON.parse(local));
        } else {
            localStorage.setItem("allUsers", JSON.stringify(usersJson));
            setUsers(JSON.parse(usersJson));
        }
    }, []);

    const addUser = (newUser) => {
        if (newUser) {
            let newUsers = [...users, newUser];
            setUsers(newUsers);
            localStorage.setItem("allUsers", JSON.stringify(newUsers));
        }
    };

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

    let links = [
        {
            name: "Explorar",
            url: "/",
        },

        {
            name: "Planos",
            url: "/planos",
        },
        {
            name: "Meu painel",
            url: "/dashboard",
        },
    ];
    const dashboardLinks = [
        {
            name: "Meus campeonatos",
            url: "/dashboard/campeonatos",
            icon: <LuGitFork/>
        },
    ]

    const globalValue = {
        user,
        setUser,
        addUser,
        theme,
        setTheme,
        users,
        setUsers,
        screenWidth,
        setLoading,
        loading,
        links,
        dashboardLinks,
    };
    return (
        <GlobalContext.Provider value={globalValue}>
            {children}
        </GlobalContext.Provider>
    );
};

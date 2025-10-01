import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import RegisterLayout from "../layouts/RegisterLayout";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AllEvents from "@/pages/AllEvents/index.jsx";
import Championship from "@/pages/Championship/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: "search", element: <></>},
            {path: "profile", element: <Profile/>},
            {path: "eventos", element: <AllEvents/>},
            {path: "championship/:id", element: <Championship/>},

        ],
    },
    {
        path: "*",
        element: <></>,
    },
    {
        path: "/login",
        element: <RegisterLayout/>,
        children: [{index: true, element: <Login/>}],
    },
    {
        path: "/register",
        element: <RegisterLayout/>,
        children: [{index: true, element: <Register/>}],
    },
]);
export default router;

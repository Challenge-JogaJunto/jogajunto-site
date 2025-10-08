import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import RegisterLayout from "../layouts/RegisterLayout";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AllEvents from "@/pages/AllEvents/index.jsx";
import Championship from "@/pages/Championship/index.jsx";
import DashboardLayout from "@/layouts/DashboardLayout.jsx";
import MyChampionships from "@/pages/dashboard/MyChampionships/index.jsx";
import FormCampeonato from "@/pages/dashboard/FormCampeonato/index.jsx";
import GestaoCampeonato from "@/pages/dashboard/GestaoCampeonato";
import Plans from "@/pages/Plans/index.jsx";

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
            {path: "planos", element: <Plans/>},
            {
                path: "dashboard", element: <DashboardLayout/>,
                children: [
                    {index: true, element: <>Dashboard</>},
                    {path: "campeonatos", element: <MyChampionships/>},
                    {path: "form-campeonato/:id?", element: <FormCampeonato/>},
                    {path: "gestaoCamp/:id", element: <GestaoCampeonato/>}
                ]
            },
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

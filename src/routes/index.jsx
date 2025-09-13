import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <></> },
      { path: "search", element: <></> },
      { path: "profile", element: <></> },
    ],
  },
]);
export default router;

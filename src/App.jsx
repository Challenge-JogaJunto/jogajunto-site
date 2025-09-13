import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { GlobalProvider } from "./contexts/GlobalContext";
function App() {
  return (
    <>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </>
  );
}

export default App;

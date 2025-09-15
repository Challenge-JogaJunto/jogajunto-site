import { RouterProvider } from "react-router-dom";
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

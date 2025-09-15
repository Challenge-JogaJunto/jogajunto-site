import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { GlobalProvider } from "./contexts/GlobalContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </>
  );
}

export default App;

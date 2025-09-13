import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SearchProvider from "../contexts/SearchContext";

export default function RootLayout() {
  return (
    <>
      <SearchProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </SearchProvider>
    </>
  );
}

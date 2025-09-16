import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SearchProvider from "../contexts/SearchContext";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <>
      <SearchProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </SearchProvider>
    </>
  );
}

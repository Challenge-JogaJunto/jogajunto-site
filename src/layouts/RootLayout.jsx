import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchProvider from "../contexts/SearchContext";
import SideBar from "../components/SideBar";
import useGlobal from "../hooks/useGlobal";

export default function RootLayout() {
  const links = [
    {
      name: "Explorar",
      url: "/",
    },
    {
      name: "Sobre nós",
      url: "/sobre-nos",
    },
    {
      name: "Eventos",
      url: "/eventos",
    },
    {
      name: "Planos",
      url: "/planos",
    },
  ];
  const { screenWidth } = useGlobal();
  const { pathname } = useLocation();
  return (
    <>
      <SearchProvider>
        <Header links={links} />
        <main className="main-content">
          {screenWidth >= 1024 && pathname === "/" && <SideBar />}

          <div className="content">
            <Outlet />
          </div>
          <div className="right"></div>
        </main>
        <Footer />
      </SearchProvider>
    </>
  );
}

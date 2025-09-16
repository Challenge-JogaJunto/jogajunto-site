import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SearchProvider from "../contexts/SearchContext";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";

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


  return (
    <>
      <SearchProvider>
        <Header links={links} />
        <main className="main-content">
          <div className="content">
            <Outlet />
          </div>
        </main>
        <Footer />
      </SearchProvider>
    </>
  );
}

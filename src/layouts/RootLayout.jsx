import {Outlet, useLocation} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchProvider from "../contexts/SearchContext";
import SideBar from "../components/SideBar";
import useGlobal from "../hooks/useGlobal";
import ContainerDiv from "../components/Container";
import {useEffect, useState} from "react";


export default function RootLayout() {
    const {screenWidth, links, dashboardLinks} = useGlobal();
    const {pathname} = useLocation();


    const [headerLinks, setHeaderLinks] = useState(links);
    useEffect(() => {

        if (pathname.includes("/dashboard") && screenWidth < 1024) {
            setHeaderLinks([...headerLinks, ...dashboardLinks]);
        } else {
            setHeaderLinks(links);
        }

        if (screenWidth < 1024) setHeaderLinks((prev) => [...prev, {url: "/eventos", name: "Campeonatos"}]);
    }, [pathname, screenWidth]);

    return (
        <>
            <SearchProvider>
                <Header links={headerLinks}/>
                <main className="main-content">
                    {screenWidth >= 1024 && pathname === "/" && <SideBar/>}

                    <div className="content">
                        <Outlet/>
                    </div>
                    {screenWidth >= 1024 && pathname === "/" && (
                        <ContainerDiv className="right p-4 h-[fit-content]">
                            <h2 className="subtitle">Joga Junto Noticias</h2>
                            <div className="flex flex-col gap-3">
                                <div className="item">
                                    <p className="link">Corinthians abre as inscrições p...</p>
                                    <p className="text">há 13 h</p>
                                </div>
                                <div className="item">
                                    <p className="link">Seleção brasileira feminina ga...</p>
                                    <p className="text">há 13 h</p>
                                </div>
                                <div className="item">
                                    <p className="link">A maior artilheira da história d...</p>
                                    <p className="text">há 13 h</p>
                                </div>
                                <div className="item">
                                    <p className="link">CBF divulga datas dos campeo...</p>
                                    <p className="text">há 13 h</p>
                                </div>
                            </div>
                        </ContainerDiv>
                    )}
                </main>
                <Footer/>
            </SearchProvider>
        </>
    );
}

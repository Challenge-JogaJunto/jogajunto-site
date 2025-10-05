import {Outlet, useLocation} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchProvider from "../contexts/SearchContext";
import SideBar from "../components/SideBar";
import useGlobal from "../hooks/useGlobal";
import ContainerDiv from "../components/Container";


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
            name: "Planos",
            url: "/planos",
        },
    ];
    const {screenWidth} = useGlobal();
    const {pathname} = useLocation();
    return (
        <>
            <SearchProvider>
                <Header links={links}/>
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
                                    <p className="link">Corinthians abre as incrições p...</p>
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

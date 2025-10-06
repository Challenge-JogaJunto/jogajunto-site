import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import ContainerDiv from "@/components/Container/index.jsx";
import useGlobal from "@/hooks/useGlobal.js";
import {MdSpaceDashboard} from "react-icons/md";
import {useEffect} from "react";

export default function DashboardLayout() {
    const {screenWidth, dashboardLinks, user} = useGlobal();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);
    if (!user) {
        return null;
    }
    return (
        <>
            <div className="flex gap-5 items-start">

                {
                    screenWidth >= 1024 &&
                    <ContainerDiv className={"px-4 sticky-top gap-5 w-fit"}>
                        <ul className={`flex flex-col my-4`}>
                            {[{
                                name: "Dashboard",
                                url: "/dashboard",
                                icon: <MdSpaceDashboard/>
                            }, ...dashboardLinks].map((link, i) => {

                                return (
                                    <li className="w-full text-[var(--texto)]" key={`navLink-mobile${i}`}>
                                        <NavLink
                                            to={link.url}
                                            className={"w-fit flex gap-3 link w-full py-4 px-3 hover:bg-[var(--borda-container)] hover:text-[var(--primaria)] rounded-sm transition whitespace-nowrap"}
                                        >
                                            <span style={{fontSize: "1.5rem",}}>{link.icon}</span>
                                            {link.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>

                    </ContainerDiv>
                }

                <Outlet/>
            </div>
        </>
    )
}
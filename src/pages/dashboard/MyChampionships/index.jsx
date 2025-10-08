import {useEffect, useState} from "react";
import {getChampionships} from "@/services/championships.js";
import ContainerDiv from "@/components/Container/index.jsx";
import IconButton from "@/components/IconButton/index.jsx";
import {FaEdit} from "react-icons/fa";
import Button from "@/components/form/Button/index.jsx";
import {FaGears} from "react-icons/fa6";
import useGlobal from "@/hooks/useGlobal.js";
import {useNavigate} from "react-router-dom";

export default function MyChampionships() {
    const {user} = useGlobal()
    const [championShips, setChampionShips] = useState([]);
    const fetchChampionShips = async () => {
        const response = await getChampionships();
        setChampionShips(response.filter((champion) => champion.organizer.id === user.id));
    }
    const navigate = useNavigate();
    useEffect(() => {
        fetchChampionShips();
    }, [])
    return (
        <div className={"w-full"}>
            <div className="flex w-full gap-3 flex-wrap justify-between">
                <h1 className="subtitle text-[var(--texto)]">Meus campeonatos</h1>
                <Button variant={"primary"} onClick={() => navigate("/dashboard/form-campeonato/")}>
                    Adicionar campeonato
                </Button>
            </div>

            {(championShips && championShips.length > 0) ? (
                <>
                    <div className="w-full grid md:grid-col-2 lg:grid-col-3 gap-3 mt-5">
                        {
                            championShips.map(({championship, organizer}, index) => (
                                <ContainerDiv key={index} className={"p-4"}>
                                    <div className="flex gap-3 justify-between">
                                        <h3 className="link">
                                            {championship.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2">

                                            <IconButton
                                                btnName={`editar-campeonato-${championship.id}`}
                                                icon={<FaEdit/>}
                                                tooltip={"Editar campeonato"}
                                                onClick={() => {
                                                    navigate(`/dashboard/form-campeonato/${championship.id}`);
                                                }}
                                            />
                                            <IconButton
                                                btnName={`gerenciar-campeonato-${championship.id}`}
                                                icon={<FaGears/>}
                                                tooltip={"Gerenciar campeonato"}/>
                                        </div>
                                    </div>

                                </ContainerDiv>
                            ))
                        }
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

import {useEffect, useState} from "react";
import {getChampionships} from "@/services/championships.js";
import ContainerDiv from "@/components/Container/index.jsx";

export default function MyChampionships() {
    const [championShips, setChampionShips] = useState([]);
    const fetchChampionShips = async () => {
        const response = await getChampionships();
        setChampionShips(response);
    }
    useEffect(() => {
        fetchChampionShips();
    }, [])
    return (
        <>
            <h1 className="subtitle text-[var(--texto)]">Meus campeonatos</h1>

            {(championShips && championShips.length > 0) ? (
                <>
                    <div className="grids grid-col-1 md:grid-col-2 lg:grid-col-3">
                        {
                            championShips.map((champion, index) => (
                                <ContainerDiv key={index}>
                                    {champion.title}
                                </ContainerDiv>
                            ))
                        }
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    )
}

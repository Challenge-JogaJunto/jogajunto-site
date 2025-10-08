import ContainerDiv from "@/components/Container/index.jsx";
import Button from "@/components/Button/index.jsx";
import {useNavigate} from "react-router-dom";

export default function ChampionshipBannerCard({championship}) {
    const date = new Date(championship.championship.startDate);
    const navigate = useNavigate()
    return (
        <>
            <ContainerDiv className={"flex flex-col-reverse lg:flex-row gap-10 px-8 py-4 text-[var(--texto)] relative"}>
                <div className="w-full flex gap-10 flex-col sm:flex-row ">
                    <div className="w-full flex-col gap-5 items-center justify-center hidden xl:flex ">
                        <img src={championship.organizer.logo} alt="Logo do organizador"
                             className={"min-w-[200px] max-w-[200px] aspect-ratio--1x1 rounded-full overflow-hidden"}/>
                        <p className="link">
                            {championship.organizer.name}
                        </p>
                    </div>
                    <div className={"flex flex-col w-full gap-3"}>
                        <h3 className="subtitle mt-3">
                            {championship.championship.title}
                        </h3>
                        <p className="text text-[var(--secundaria)] mb-6">{date.toLocaleDateString()}</p>

                        <Button styleClass={"w-full mt-auto"} onClick={() => {
                            navigate(`/championship/${championship.championship.id}`)
                        }}>
                            Saiba mais
                        </Button>
                    </div>
                </div>

                <img src={championship.championship.coverImage} alt="imagem do campeonato"
                     className={"w-full object-cover lg:ml-auto rounded-md h-100 lg:h-62"}/>
            </ContainerDiv>
        </>
    )
}

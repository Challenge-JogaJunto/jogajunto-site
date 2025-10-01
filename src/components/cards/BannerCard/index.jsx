import ContainerDiv from "@/components/Container/index.jsx";
import Button from "@/components/Button/index.jsx";
import {useNavigate} from "react-router-dom";

export default function ChampionshipBannerCard({championship}) {
    const date = new Date(championship.championship.startDate);
    const navigate = useNavigate()
    return (
        <>
            <ContainerDiv className={"flex flex-col-reverse lg:flex-row gap-10 px-8 py-4 text-[var(--texto)] relative"}>
                <div className="flex gap-10 flex-col sm:flex-row">
                    <div className="flex flex-col gap-5 items-center justify-center hidden lg:flex">
                        <img src={championship.organizer.logo} alt="Logo do organizador"
                             className={"min-w-[200px] max-w-[200px] aspect-ratio--1x1"}/>
                        <p className="link">
                            {championship.organizer.name}
                        </p>
                    </div>
                    <div className={"flex flex-col gap-3"}>
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
                     className={"w-full max-w-[500px] object-cover ml-auto aspect-video rounded-md"}/>
            </ContainerDiv>
        </>
    )
}

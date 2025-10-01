import ContainerDiv from "@/components/Container/index.jsx";
import Button from "@/components/Button/index.jsx";
import {useNavigate} from "react-router-dom";

export default function EventCard({title, img, link, date, address, description}) {
    const navigate = useNavigate();
    return (
        <>
            <ContainerDiv className={"flex flex-col w-full max-w-[450px] text-[var(--texto)] overflow-hidden mx-auto"}>
                <img
                    className={"aspect-video w-full"}
                    src={img ?? "./imgs/capa-campeonato.png"}
                    alt="Imagem do campeonato"
                    onError={(e) => {
                        e.currentTarget.src = "./imgs/capa-campeonato.png";
                    }}
                />
                <div className="px-4 py-3 flex flex-col gap-x-2 flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                        <div>
                            <h3 className="link">{title}</h3>
                            <p className="text">{address}</p>
                        </div>
                        <span className="link ml-auto">{new Date(date).toLocaleString()}</span>
                    </div>
                    <p className="text mb-6">{description.slice(0, 80)}...</p>
                    <Button onClick={() => navigate(link)} styleClass={"w-full mt-auto"}>
                        Ver mais
                    </Button>
                </div>
            </ContainerDiv>
        </>
    )

}

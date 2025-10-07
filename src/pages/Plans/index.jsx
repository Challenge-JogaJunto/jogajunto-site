import Button from "@/components/Button/index.jsx";
import { IoCalendarOutline } from "react-icons/io5";
import { IoBarChartOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FiHeadphones } from "react-icons/fi";
import { GoCheckCircle } from "react-icons/go";

export default function Plans() {
    return (
        <div className={"flex flex-col align-items-center justify-center p-2 font-['Poppins']"}>
            <h1 className={"font-semibold text-2xl m-1 font-variant[--ff-text]"}>Venha Jogar Junto com a gente!</h1>
            <p className={"m-1"}>Assine um de nossos planos e obtenha oportunidades exclusivas! Mais visibilidade, mais ferramentas, mais organização, mais jogo!</p>
            <div className={"border border-solid border-[#6E3B96] rounded-lg text-start p-6 text-[16px] font-light"}>
                <h2 className={"font-semibold color text-[#6E3B96] text-2xl"}>JOGA JUNTO PREMIUM</h2>
                <p className={"mb-1 mt-1"}>Obtenha mais ferramentas, métricas e funcionalidades para organização, gerenciamento e criação de conteúdos do seu clube!</p>
                <div className={" flex items-center m-3 text-[14px]"}>
                    <IoCalendarOutline/>
                    <p className={"ml-2"}>Peneiras e campeonatos ilimitados</p>
                </div>
                <div className={"flex items-center m-3 text-[14px]"}>
                    <IoBarChartOutline/>
                    <p className={"ml-2"}>Mais ferramentas e métricas</p>
                </div>
                <div className={"flex items-center m-3 text-[14px]"}>
                    <FaEye/>
                    <p className={"ml-2"}>Mais visibilidade</p>
                </div>
                <div className={"flex items-center m-3 text-[14px]"}>
                    <FiHeadphones />
                    <p className={"ml-2"}>Comunidade e suporte dedicado</p>
                </div>
                <div className={"flex items-center m-3 text-[14px]"}>
                    <GoCheckCircle />
                    <p className={"ml-2"}>Anúncios bloqueados</p>
                </div>
            </div>
            <div className={"flex align-items-center justify-center gap-15 mt-4 font-light"}>
                <div className={"border-2 border-solid border-[#6E3B96] rounded-md w-[500px] p-3"}>
                    <h1 className={"mb-2 text-[#6E3B96] font-semibold text-[25px]"}>Mensal</h1>
                    <p className={"font-bold text-[#6E3B96] text-[12px] mt-4"}>Plano Anual</p>
                    <p className={"text-[24px] font-bold mt-1 mb-1"}> R$ 15,00 / mês</p>
                    <Button>Assine Agora</Button>
                </div>
                <div className={"w-[500px] border-2 border-solid border-[#59C9A5] rounded-md p-3"}>
                    <h1 className={"mb-2 text-[#59C9A5] font-semibold text-[25px]"}>Anual</h1>
                    <p className={"font-bold text-[12px] text-[#59C9A5] mt-4"}>Plano Anual</p>
                    <p className={"text-[24px] font-bold mt-1 mb-1"}>R$ 35,00/mês</p>
                    <Button>Assine Agora</Button>
                </div>
            </div>
        </div>
        )
}
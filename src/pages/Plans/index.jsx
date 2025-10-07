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
                <p>Obtenha mais ferramentas, métricas e funcionalidades para organização, gerenciamento e criação de conteúdos do seu clube!</p>
                <IoCalendarOutline/>
                <p>Peneiras e campeonatos ilimitados</p>
                <IoBarChartOutline/>
                <p>Mais ferramentas e métricas</p>
                <FaEye/>
                <p>Mais visibilidade</p>
                <FiHeadphones />
                <p>Comunidade e suporte dedicado</p>
                <GoCheckCircle />
                <p>Anúncios bloqueados</p>
            </div>
            <div className={"flex align-items-center justify-center gap-15 "}>
                <div className={"border border-solid border-[#6E3B96] rounded-lg "}>
                    <h1>Mensal</h1>
                    <p>Plano Anual</p>
                    <p>R$ 15,00 / mês</p>
                    <p>R$ 20,00 no plano mensal</p>
                    <Button/>
                </div>
                <div>
                    <h1>Anual</h1>
                    <p>Plano Anual</p>
                    <p>R$ 35,00/mês</p>
                    <p>R$ 40,00 no plano mensal</p>
                </div>
            </div>
        </div>
        )
}
import {
  FaMedal,
  FaRegCalendar,
  FaRegNoteSticky
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import defaultUser from "../../assets/defaultUser.jpg";
import useGlobal from "../../hooks/useGlobal";
import ContainerDiv from "../Container";
import styles from "./styles.module.css";
export default function SideBar() {
  const { user } = useGlobal();

  return (
    <>
      <div className="w-full left">
        <ContainerDiv
          className={
            "w-full flex flex-col items-center text-center p-4 py-6 mb-2"
          }
        >
          <Link to="/profile" className={styles.user}>
            <img
              src={user ? user.img ?? defaultUser : defaultUser}
              alt="Imagem do usuário"
            />
            <p className="title mt-4" style={{ fontSize: "20px" }}>
              {user ? user.nome.split(" ")[0] : "Entrar"}
            </p>
          </Link>
          {user && (
            <>
              <hr
                className="w-full my-2"
                style={{ borderColor: "var(--primaria)" }}
              />
              <p className="text">{user.posicao ?? "Nenhuma posição"}</p>
              <p className="text">{user.idade ?? "Indefinida"}</p>
              <p className="link text-[var(--secundaria)]">
                {user.clube ?? "Sem clube"}
              </p>
            </>
          )}
        </ContainerDiv>
        <ContainerDiv
          className={
            "w-full left flex flex-col items-center text-center p-4"
          }
        >
          <div className="w-full">
            <Link
              to={""}
              className="flex gap-3 link w-full py-4 px-3 hover:bg-[var(--borda-container)] hover:text-[var(--primaria)] rounded-sm transition"
            >
              <FaRegCalendar size={20} />
              Eventos
            </Link>
          </div>
          <div className="w-full">
            <Link
              to={""}
              className="flex gap-3 link w-full py-4 px-3 hover:bg-[var(--borda-container)] hover:text-[var(--primaria)] rounded-sm transition"
            >
              <FaMedal size={20} />
              Campeonatos
            </Link>
          </div>
          <div className="w-full">
            <Link
              to={""}
              className="flex gap-3 link w-full py-4 px-3 hover:bg-[var(--borda-container)] hover:text-[var(--primaria)] rounded-sm transition"
            >
              <FaRegNoteSticky size={20} />
              Peneiras
            </Link>
          </div>
        </ContainerDiv>
      </div>
    </>
  );
}

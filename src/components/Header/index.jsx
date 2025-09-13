import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaMedal, FaPlus, FaRegCalendar, FaSearch } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { RiSignalTowerFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import defaultUser from "../../assets/defaultUser.jpg";
import logotipo from "../../assets/logo-jogajunto.png";
import useGlobal from "../../hooks/useGlobal";
import useSearch from "../../hooks/useSearch";
import Button from "../form/Button";
import InputField from "../form/Input";
import styles from "./header.module.css";
export default function Header() {
  const { search, setSearch, makeSearch } = useSearch();
  const { user } = useGlobal();
  return (
    <>
      <header className={`${styles.header}`}>
        <nav>
          <Link to={"/"} className={`${styles.logotipo}`}>
            <img src={logotipo} alt="Logotipo do Joga Junto" />
            <h2 className="title">Joga Junto</h2>
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              makeSearch();
            }}
            className="hidden md:block"
          >
            <InputField
              placeholder="Buscar"
              width="250px"
              icon={<FaSearch size={18} style={{ color: "var(--primaria)" }} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              required
              type="text"
            />
          </form>
          <ul className={`${styles.menu}`}>
            <li>
              <Link to="/" className="link">
                {" "}
                Explorar
              </Link>
            </li>
            <li>
              <Link to="/" className="link">
                {" "}
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="/" className="link">
                {" "}
                Eventos
              </Link>
            </li>
            <li data-active>
              <Link to="/" className="link">
                {" "}
                Planos
              </Link>
            </li>
            <Menu>
              <MenuButton className="ml-4 ">
                <Button variant={"primary"}>
                  Criar
                  <FaPlus />
                </Button>
              </MenuButton>
              <MenuItems
                anchor="bottom"
                transition
                className={`p-0 menu-dropdown origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 outline-none mt-4`}
              >
                <MenuItem>
                  <Link
                    to="/"
                    className={`link p-4 ${styles.menuItem} transition flex items-center gap-2`}
                  >
                    {" "}
                    <FaRegNoteSticky size={20} />
                    Peneira
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/"
                    className={`link p-4 ${styles.menuItem} transition flex items-center gap-2`}
                  >
                    {" "}
                    <FaMedal size={20} />
                    Campeonato
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/"
                    className={`link p-4 ${styles.menuItem} transition flex items-center gap-2`}
                  >
                    {" "}
                    <FaRegCalendar size={20} />
                    Evento
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/"
                    className={`link p-4 ${styles.menuItem} transition flex items-center gap-2`}
                  >
                    {" "}
                    <RiSignalTowerFill size={20} />
                    Publicação
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </ul>
          <Link to="/profile" className={styles.user}>
            <p className="link mr-4">
              {user ? user.nome.split(" ")[0] : "Entrar"}
            </p>
            <img src={user ? user.img : defaultUser} alt="Imagem do usuário" />
          </Link>
        </nav>
      </header>
    </>
  );
}

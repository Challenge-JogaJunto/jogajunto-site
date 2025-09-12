import { Link } from "react-router-dom";
import logotipo from "../../assets/logo-jogajunto.png";
import styles from "./header.module.css";
import Button from "../form/Button";
import { FaMedal, FaPlus, FaRegCalendar } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaRegNoteSticky } from "react-icons/fa6";
import { RiSignalTowerFill } from "react-icons/ri";
export default function Header() {
  return (
    <>
      <header className={`${styles.header}`}>
        <nav>
          <div className={`${styles.logotipo}`}>
            <img src={logotipo} alt="Logotipo do Joga Junto" />
            <h2 className="title">Joga Junto</h2>
          </div>
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
                    <FaRegNoteSticky size={20}/>
                    Peneira
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/"
                    className={`link p-4 ${styles.menuItem} transition flex items-center gap-2`}
                  >
                    {" "}
                    <FaMedal size={20}/>
                    Campeonato
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/"
                    className={`link p-4 ${styles.menuItem} transition flex items-center gap-2`}
                  >
                    {" "}
                    <FaRegCalendar size={20}/>
                    Evento
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/"
                    className={`link p-4 ${styles.menuItem} transition flex items-center gap-2`}
                  >
                    {" "}
                    <RiSignalTowerFill size={20}/>
                    Publicação
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </ul>
        </nav>
      </header>
    </>
  );
}

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaMedal, FaPlus, FaRegCalendar, FaSearch } from "react-icons/fa";
import { FaBarsStaggered, FaRegNoteSticky } from "react-icons/fa6";
import { RiSignalTowerFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import defaultUser from "../../assets/defaultUser.jpg";
import logotipo from "../../assets/logo-jogajunto.png";
import useGlobal from "../../hooks/useGlobal";
import useSearch from "../../hooks/useSearch";
import InputField from "../form/Input";
import styles from "./header.module.css";
import { useEffect, useRef, useState } from "react";

export default function Header({ links }) {
  const { search, setSearch, makeSearch } = useSearch();
  const { user, screenWidth } = useGlobal();
  const [opened, setOpened] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpened(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);

    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  return (
    <>
      <header className={`${styles.header}`}>
        <nav>
          {screenWidth < 1024 && (
            <>
              <button
                onClick={() => setOpened(!opened)}
                ref={menuRef}
                className="p-5 text-[var(--texto)] hover:text-[var(--primaria)] transition cursor-pointer"
              >
                <FaBarsStaggered size={25} />
              </button>
            </>
          )}
          <Link to={"/"} className={`${styles.logotipo}`}>
            <img src={logotipo} alt="Logotipo do Joga Junto" />
            <h2 className="title">Joga Junto</h2>
          </Link>
          {screenWidth >= 1024 && (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeSearch();
                }}
                className="hidden lg:block"
              >
                <InputField
                  placeholder="Buscar"
                  width="200px"
                  icon={
                    <FaSearch size={18} style={{ color: "var(--primaria)" }} />
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  id="search"
                  required
                  type="text"
                />
              </form>
              <ul className={`${styles.menu}`}>
                {links.map((link) => {
                  return (
                    <li>
                      <Link to={link.url} className="link">
                        {link.name}
                      </Link>
                    </li>
                  );
                })}

                <Menu>
                  <MenuButton className="ml-4 ">
                    <div
                      className={`${styles.createButton} ${styles.primary} flex items-center gap-2`}
                    >
                      Criar
                      <FaPlus />
                    </div>
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
            </>
          )}

          <Link to="/profile" className={styles.user}>
            {screenWidth >= 1024 && (
              <p className="link mr-4">
                {user ? user.nome.split(" ")[0] : "Entrar"}
              </p>
            )}

            <img
              src={user ? user.img ?? defaultUser : defaultUser}
              alt="Imagem do usuário"
            />
          </Link>
        </nav>
      </header>
      {screenWidth < 1024 && (
        <div
          className={`${styles.menuLateral} ${opened ? styles.active : ""} `}
          ref={menuRef}
        >
          <nav>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makeSearch();
              }}
            >
              <InputField
                placeholder="Buscar"
                icon={
                  <FaSearch size={18} style={{ color: "var(--primaria)" }} />
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="search"
                required
                type="text"
              />
            </form>
            <ul className={`flex flex-col my-4`}>
              {links.map((link) => {
                return (
                  <li className="w-full">
                    <Link
                      to={link.url}
                      className="flex link w-full py-4 px-1 hover:bg-[var(--borda-container)] hover:text-[var(--primaria)] rounded-sm transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Menu>
              <MenuButton className="w-full">
                <div
                  className={`${styles.createButton} ${styles.primary} flex items-center gap-2 w-full justify-center`}
                >
                  Criar
                  <FaPlus />
                </div>
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
          </nav>
        </div>
      )}
    </>
  );
}

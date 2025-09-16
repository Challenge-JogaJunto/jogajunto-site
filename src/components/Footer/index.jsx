import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return (
    <>
      <footer className={`${styles.footer}`}>
        <div className="content w-full max-w-[var(--max-content)] flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-3">
            <img
              src="./imgs/logo-jogajunto.png"
              alt="Logo do jogajunto"
              className="w-[80px] h-[80px]"
            />
            <h2
              className="title text-[var(--primaria)]"
              style={{ fontSize: "20px" }}
            >
              Joga Junto
            </h2>
          </div>
          <div className="flex gap-3 justify-center text-[var(--primaria)]">
            <Link to={"/"} className="link">
              Explorar
            </Link>
            <Link to={"/sobre-nos"} className="link">
              Sobre nós
            </Link>
            <Link to={"/planos"} className="link">
              Planos
            </Link>
          </div>
          <div className="flex gap-6 justify-center text-[var(--texto)]">
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={25} />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={25} />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={25} />
            </a>
          </div>
          <p className="text">
            © 2025 Joga Junto | Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}

import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useGlobal from "../hooks/useGlobal";

export default function RegisterLayout() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const { user } = useGlobal();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <main
        className="flex max-h-[fit-content] lg:max-h-none lg:min-h-[100vh] flex-wrap-reverse lg:flex-nowrap"
        style={{
          backgroundImage: "url('./imgs/fundo-estilizado.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col justify-center min-h-[80vh] lg:min-h-screen  rounded-t-4xl lg:rounded-none w-full bg-white p-6 shadow-md lg:max-w-lg">
          <Link
            to="/"
            className="link absolute top-10 left-6 flex items-center gap-2 text-[var(--primaria)] flex hover:gap-3 transition-all"
          >
            <FaArrowLeft />
            Voltar
          </Link>
          <Outlet />
          <Link
            to={pathname === "/register" ? "/login" : "/register"}
            className="flex items-center gap-5 mt-2 text-center justify-center "
          >
            <hr className="w-full border-[var(--texto)]" />
            <p className="text text-sm w-full" style={{ whiteSpace: "nowrap" }}>
              {pathname === "/register"
                ? "Já tem uma conta?"
                : "Não tem uma conta?"}{" "}
              <span
                className="link text-sm text-[var(--secundaria)]"
                style={{ fontWeight: "700" }}
              >
                {" "}
                {pathname === "/register" ? "Faça login" : "Cadastre-se"}
              </span>
            </p>
            <hr className="w-full border-[var(--texto)]" />
          </Link>
        </div>
        <div className="logotipo m-auto relative mx-auto">
          <img
            src="./imgs/logo-register.png"
            alt="Logotipo"
            className="w-full max-w-[200px] lg:max-w-[300px] object-contain "
          />
        </div>
      </main>
    </>
  );
}

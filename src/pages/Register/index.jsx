import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="title" style={{ fontSize: "48px" }}>
          CRIAR CONTA{" "}
        </h1>
        <h3 className="link" style={{ fontSize: "24px" }}>
          Seja bem-vindo ao JogaJunto!
        </h3>
        <form>
          <div className="flex flex-wrap w-full gap-4 mt-5 justify-center">
            <Input
              label="Nome completo"
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={""}
              onChange={() => {}}
            />
            <Input
              width="220px"
              label="E-mail"
              type="email"
              name="email"
              placeholder="E-mail"
              value={""}
              onChange={() => {}}
            />
            <Input
              width="220px"
              label="Telefone"
              mask={"(99) 99999-9999"}
              name="telefone"
              placeholder="Telefone"
              value={""}
              onChange={() => {}}
            />
            <Input
              width="220px"
              label="Senha"
              type="password"
              name="senha"
              placeholder="Senha"
              value={""}
              onChange={() => {}}
            />
            <Input
              width="220px"
              label="Confirme a senha"
              type="password"
              name="confirmSenha"
              placeholder="Confirme a senha"
              value={""}
              onChange={() => {}}
            />
            <Button variant={"primary"} width="100%" margin={"2rem 0"}>
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

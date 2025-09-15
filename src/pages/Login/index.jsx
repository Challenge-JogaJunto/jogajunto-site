import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="title" style={{ fontSize: "48px" }}>
          ENTRAR
        </h1>
        <h3 className="link" style={{ fontSize: "24px" }}>
          Bem-vindo de volta!
        </h3>
        <form>
          <div className="flex flex-wrap w-full gap-4 mt-5 justify-center">
            <Input
              label="E-mail"
              type="email"
              name="email"
              placeholder="E-mail"
              value={""}
              onChange={() => {}}
            />
            <Input
              label="Senha"
              type="password"
              name="senha"
              placeholder="Senha"
              value={""}
              onChange={() => {}}
            />
            <Button variant={"primary"} width="100%" margin={"3rem 0"}>
              Entrar
            </Button>
          </div>
        </form>
        
      </div>
    </>
  );
}

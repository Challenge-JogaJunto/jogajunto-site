import { useState } from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import useGlobal from "../../hooks/useGlobal";
import { FormTools } from "../../utils/formTools";
import { toast } from "react-toastify";

export default function Login() {
  const { setUser, users } = useGlobal();
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });
  const { handleChange } = new FormTools(form, setForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(users);

      const user = users.find((u) => u.email === form.email);

      if (user) {
        if (user.senha === form.senha) {
          setUser(user);
          toast.success("Login realizado com sucesso!");
        } else {
          toast.error("Senha incorreta!");
        }
      } else {
        toast.error("Usuário não encontrado!");
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado!");
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-center mt-5">
        <h1 className="title" style={{ fontSize: "48px" }}>
          ENTRAR
        </h1>
        <h3 className="link" style={{ fontSize: "24px" }}>
          Bem-vindo de volta!
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap w-full gap-4 mt-5 justify-center">
            <Input
              label="E-mail"
              type="email"
              id="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Senha"
              type="password"
              id="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant={"primary"}
              width="100%"
              margin={"2rem 0"}
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

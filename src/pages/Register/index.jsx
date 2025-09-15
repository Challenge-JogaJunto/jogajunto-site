import { useState } from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import useGlobal from "../../hooks/useGlobal";
export default function Register() {
  const { setUser, setUsers } = useGlobal();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    nascimento: "",
    telefone: "",
    senha: "",
    confirmSenha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function criarConta(event) {
    event.preventDefault();
    if (form.senha !== form.confirmSenha) {
      return;
    }
    const data = form;
    delete data.confirmSenha;
    data.nascimento = new Date(data.nascimento).toISOString();
    data.img = null;
    setUser(data);
    setUsers((prev) => {
      const updatedUsers = [...prev, data];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  }

  return (
    <>
      <div className="text-center mt-10">
        <h1 className="title" style={{ fontSize: "48px" }}>
          CRIAR CONTA{" "}
        </h1>
        <h3 className="link" style={{ fontSize: "24px" }}>
          Seja bem-vindo ao JogaJunto!
        </h3>
        <form onSubmit={criarConta} className="flex justify-center">
          <div className="flex flex-wrap w-full gap-4 mt-5 justify-center">
            <Input
              label="Nome completo"
              type="text"
              id="nome"
              placeholder="Nome completo"
              value={form.nome}
              onChange={handleChange}
              required
            />
            <Input
              width="220px"
              label="E-mail"
              type="email"
              id="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              width="220px"
              label="Data de nascimento"
              type="date"
              id="nascimento"
              placeholder="Data de nascimento"
              value={form.nascimento}
              onChange={handleChange}
              required
            />
            <Input
              width="220px"
              label="CPF"
              mask={"000.000.000-00"}
              id="cpf"
              placeholder="CPF"
              value={form.cpf}
              onChange={(val) =>
                handleChange({ target: { name: "cpf", value: val } })
              }
              required
            />
            <Input
              width="220px"
              label="Telefone"
              mask={"(00) 00000-0000"}
              id="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={(val) =>
                handleChange({ target: { name: "telefone", value: val } })
              }
              required
            />
            <Input
              label="Senha"
              type="password"
              id="senha"
              placeholder="Senha"
              value={form.senha}
              required
              onChange={handleChange}
            />
            <Input
              error={
                form.senha !== form.confirmSenha
                  ? "As senhas não coincidem"
                  : undefined
              }
              label="Confirme a senha"
              type="password"
              id="confirmSenha"
              placeholder="Confirme a senha"
              value={form.confirmSenha}
              onChange={handleChange}
              required
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

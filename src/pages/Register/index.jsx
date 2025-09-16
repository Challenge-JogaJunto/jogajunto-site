import { useState } from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import useGlobal from "../../hooks/useGlobal";
import { FormTools } from "../../utils/formTools";
export default function Register() {
  const { setUser, addUser, users } = useGlobal();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    nascimento: "",
    telefone: "",
    senha: "",
    confirmSenha: "",
  });
  const [formError, setFormError] = useState({
    nome: null,
    email: null,
    cpf: null,
    nascimento: null,
    telefone: null,
    senha: null,
    confirmSenha: null,
  });

  const { handleChange } = new FormTools(form, setForm);

  function criarConta(event) {
    event.preventDefault();

    if (form.senha !== form.confirmSenha) {
      return () => {
        return setFormError({
          ...formError,
          confirmSenha: "As senhas não coincidem",
          senha: "As senhas não coincidem",
        });
      };
    }

    const emailExists = users.find((u) => u.email === form.email);
    const cpfExists = users.find((u) => u.cpf === form.cpf);
    const telefoneExists = users.find((u) => u.telefone === form.telefone);

    if (emailExists) {
      setFormError({
        ...formError,
        email: "E-mail já utilizado!",
      });
    }
    if (cpfExists) {
      setFormError({
        ...formError,
        cpf: "CPF já utilizado!",
      });
    }
    if (telefoneExists) {
      setFormError({
        ...formError,
        telefone: "Telefone já utilizado!",
      });
    }

    if (emailExists || telefoneExists || cpfExists) return;

    const data = form;
    delete data.confirmSenha;
    data.nascimento = new Date(data.nascimento).toISOString();

    if (data.nascimento) {
      const nascimentoDate = new Date(data.nascimento);
      const today = new Date();
      const age = today.getFullYear() - nascimentoDate.getFullYear();
      const m = today.getMonth() - nascimentoDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < nascimentoDate.getDate())) {
        if (age - 1 < 12)
          return setFormError({
            ...formError,
            nascimento: "Necessário ter ao menos 12 anos",
          });
      } else {
        if (age < 12)
          return setFormError({
            ...formError,
            nascimento: "Necessário ter ao menos 12 anos",
          });
      }
    }

    data.img = null;
    setUser(data);
    addUser(data);
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
          <div className="flex flex-wrap w-full gap-4 mt-5">
            <Input
              label="Nome completo"
              type="text"
              id="nome"
              placeholder="Nome completo"
              value={form.nome}
              onChange={handleChange}
              required
              error={formError.nome}
              minLength={3}
            />
            <Input
              label="E-mail"
              type="email"
              id="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
              error={formError.email}
            />
            <Input
              width="200px"
              label="Data de nascimento"
              type="date"
              id="nascimento"
              placeholder="Data de nascimento"
              value={form.nascimento}
              onChange={handleChange}
              required
              error={formError.nascimento}
            />
            <Input
              width="250px"
              label="CPF"
              mask={"000.000.000-00"}
              id="cpf"
              placeholder="CPF"
              value={form.cpf}
              onChange={(val) =>
                handleChange({ target: { name: "cpf", value: val } })
              }
              required
              error={formError.cpf}
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
              error={formError.telefone}
            />
            <Input
              label="Senha"
              type="password"
              id="senha"
              placeholder="Senha"
              value={form.senha}
              required
              onChange={handleChange}
              error={formError.senha}
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

            <Button
              type={"submit"}
              variant={"primary"}
              width="100%"
              margin={"2rem 0"}
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

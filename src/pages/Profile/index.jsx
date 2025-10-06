import { useEffect, useState } from "react";
import useGlobal from "../../hooks/useGlobal";
import { useNavigate } from "react-router-dom";
import ContainerDiv from "@/components/Container";
import InputField from "@/components/form/Input";
import Button from "@/components/form/Button";
import defaultUser from "../../assets/defaultUser.jpg";
import { FaPencilAlt, FaSignOutAlt } from "react-icons/fa";
import { FaChevronRight, FaUser } from "react-icons/fa6";

export default function Profile() {
  const { user } = useGlobal();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    usuario: "",
    altura: "",
    peso: "",
    idade: "",
    img: "", 
  });

  const [imgPreview, setImgPreview] = useState(user?.img ?? defaultUser);

  useEffect(() => {
    if (!user) navigate("/login");


    if (user) {
      setForm({
        nome: user.nome || "",
        email: user.email || "",
        telefone: user.telefone || "",
        usuario: user.usuario || "",
        altura: user.altura || "",
        peso: user.peso || "",
        idade: user.idade || "",
        img: user.img || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgPreview(reader.result);
        setForm((prev) => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <>
      <ContainerDiv className="p-0 flex flex-col min-h-[100vh] bg-white rounded-lg overflow-hidden">

        <div className="flex flex-col md:flex-row flex-1">
          <div className="w-full md:w-[250px] bg-[var(--fundo)] border-r flex flex-col items-center py-8">
            <div className="relative inline-block">
              <img
                src={imgPreview}
                alt="Foto do usuário"
                className="w-[100px] h-[100px] rounded-full mb-3 object-cover"
              />
              <label className="absolute bottom-0.5 right-0 transform -translate-y-1/3 cursor-pointer ">
                <FaPencilAlt className="text-[var(--primaria)]" size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <h2 className="text-lg font-semibold mt-3">
              {user.nome || "Usuário Teste"}
            </h2>
            <p className="text-xs text-gray-600 mb-16">
              {user.email || "usuario@email.com"}
            </p>
            <nav className="w-full text-sm text-gray-700 space-y-4">
              <div className="flex items-center justify-between p-4 hover:bg-[var(--primaria)] hover:text-white cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <FaUser size={16} />
                  <span className="text-lg">Perfil</span>
                </div>
                <FaChevronRight size={14} />
              </div>
            </nav>

            <button className="mt-auto mb-2 w-full flex px-4  items-center justify-between p-4 text-gray-800 hover:bg-[var(--primaria)] hover:text-white transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <FaSignOutAlt size={16} />
                <span>Sair</span>
              </div>
            
            </button>
          </div>

          <div className="flex-1 bg-[var(--container)] px-10 py-8 flex flex-col justify-center">
            <h2 className="text-[var(--primaria)] subtitle font-semibold mb-8">
              Dados Pessoais
            </h2>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                id="nome"
                label="Nome Completo"
                type="text"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome completo"
              />
              <InputField
                id="altura"
                label="Altura"
                type="text"
                value={form.altura}
                onChange={handleChange}
                placeholder="cm"
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email"
              />
              <InputField
                id="peso"
                label="Peso"
                type="text"
                value={form.peso}
                onChange={handleChange}
                placeholder="kg"
              />
              <InputField
                id="telefone"
                label="Telefone"
                type="text"
                value={form.telefone}
                onChange={handleChange}
                placeholder="(11) 9 4002-8922"
              />
              <InputField
                id="idade"
                label="Idade"
                type="text"
                value={form.idade}
                onChange={handleChange}
                placeholder="anos"
              />
              <InputField
                id="usuario"
                label="Nome de Usuário"
                type="text"
                value={form.usuario}
                onChange={handleChange}
                placeholder="Nome de usuário"
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-[var(--primaria)]  hover:bg-[#51277a]"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </ContainerDiv>
    </>
  );
}

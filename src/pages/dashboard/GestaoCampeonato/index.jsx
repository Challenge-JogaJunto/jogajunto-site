import { useParams } from "react-router-dom";
import { Suspense, useMemo, useState } from "react";
import { getChampionshipById } from "@/services/championships.js";
import wrapPromise from "@/utils/wrapPromise.js";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback/index.jsx";
import ContainerDiv from "@/components/Container/index.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import Button from "@/components/Button/index.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import DefaultModal from "@/components/Dialog/index.jsx";

export default function GestaoCampeonato() {
  const { id } = useParams();
  const resource = useMemo(() => wrapPromise(getChampionshipById(id)), [id]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<GestaoCampeonatoSuspense />}>
        <GestaoCampeonatoDetails resource={resource} />
      </Suspense>
    </ErrorBoundary>
  );
}

function GestaoCampeonatoDetails({ resource }) {
  const championship = resource.read();
  const [teams, setTeams] = useState(championship.teams || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamImage, setTeamImage] = useState(null);

  const handleAddTeam = () => {
    if (!teamName.trim()) return;
    setTeams([...teams, { name: teamName, description: teamDescription, image: teamImage }]);
    setTeamName("");
    setTeamDescription("");
    setTeamImage(null);
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setTeamImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="">
      <ContainerDiv className="grid grid-cols-1 md:grid-cols-2 relative text-[var(--texto)] overflow-hidden">
        <img
          src={championship.championship.coverImage}
          alt="Imagem de capa do campeonato"
          className="w-full aspect-video"
        />
        <div className="w-full flex flex-col gap-3 py-5 px-8 h-fill">
          <h1 className="subtitle">{championship.championship.title}</h1>
          <ul className="list-none flex flex-col gap-3">
            <li>
              <p className="text">
                Formato{" "}
                <span className="font-bold text-[var(--primaria)]">
                  {championship.championship.format}
                </span>
              </p>
            </li>
            <li>
              <p className="text">
                <span className="font-bold text-[var(--primaria)]">
                  {championship.championship.registrations.expectedAudience}{" "}
                </span>
                pessoas irão comparecer
              </p>
            </li>
            <li>
              <p className="text">
                <span className="font-bold text-[var(--primaria)]">
                  {championship.championship.registrations.playersRegistered}{" "}
                </span>
                jogadoras participarão
              </p>
            </li>
            <li>
              <p className="text">
                Endereço:{" "}
                <span className="font-bold text-[var(--primaria)]">
                  {championship.championship.location.address}
                </span>
              </p>
            </li>
          </ul>
          <Button styleClass="w-full rounded-sm mt-auto">Comparecer</Button>
        </div>
      </ContainerDiv>

      <div className="flex flex-col-reverse md:flex-row mt-10 gap-5">
        <ContainerDiv className="w-full py-5 px-8 text-[var(--texto)]">
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="bg-[var(--primaria)]">
              <TabsTrigger value="geral">Equipe</TabsTrigger>
              <TabsTrigger value="partidas">Partidas</TabsTrigger>
              <TabsTrigger value="jogadoras">Jogadoras</TabsTrigger>
            </TabsList>

            <TabsContent value="geral">
              <div className="flex justify-between items-center mt-8 mb-3">
                <h3 className="subtitle">Equipes</h3>
                <Button onClick={() => setIsModalOpen(true)}>Adicionar Equipe</Button>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-2 px-4">Nome da Equipe</th>
                    <th className="py-2 px-4">Descrição</th>
                    <th className="py-2 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length > 0 ? (
                    teams.map((team, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 px-4 flex items-center gap-2">
                          {team.image && (
                            <img
                              src={team.image}
                              alt="Equipe"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          {team.name}
                        </td>
                        <td className="py-2 px-4">{team.description}</td>
                        <td className="py-2 px-4">
                          <Button styleClass="px-2 py-1 text-sm">Visualizar</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-500">
                        Nenhuma equipe cadastrada
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <p className="text mt-5">{championship.championship.description}</p>
            </TabsContent>

            <TabsContent value="partidas">Partidas</TabsContent>
            <TabsContent value="jogadoras">Jogadoras</TabsContent>
          </Tabs>
        </ContainerDiv>
      </div>

      <DefaultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Equipe"
      >
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            {teamImage ? (
              <img
                src={teamImage}
                alt="Prévia da equipe"
                className="w-32 h-32 object-cover rounded-full border"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center border rounded-full text-gray-400">
                Sem imagem
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nome da equipe"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <textarea
              placeholder="Descrição da equipe"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <div className="flex justify-end gap-3 mt-5">
              <Button styleClass="bg-gray-300" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button styleClass="bg-[var(--primaria)]" onClick={handleAddTeam}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </DefaultModal>
    </div>
  );
}

export function GestaoCampeonatoSuspense() {
  return (
    <ContainerDiv className="flex">
      <Skeleton className="w-full aspect-video" />
      <div className="w-full flex flex-col gap-3 max-w-[550px] py-5 px-8">
        <Skeleton className="w-full p-3 h-5 rounded-sm" />
        <Skeleton className="w-[320px] p-2 h-1 rounded-sm mt-10" />
        <Skeleton className="w-[320px] p-2 h-1 rounded-sm" />
        <Skeleton className="w-[320px] p-2 h-1 rounded-sm" />
        <Skeleton className="w-full p-4 h-1 rounded-sm mt-auto" />
      </div>
    </ContainerDiv>
  );
}

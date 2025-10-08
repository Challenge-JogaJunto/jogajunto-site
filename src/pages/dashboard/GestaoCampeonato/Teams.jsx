// src/pages/dashboard/GestaoCampeonato/Teams.jsx
import Button from "@/components/Button/index.jsx";
import DefaultModal from "@/components/Dialog/index.jsx";
import { useEffect, useState } from "react";
import { getTeams, createTeam, removeTeam } from "@/services/teams.js";
import { toast } from "react-toastify";

export default function Teams({ championship }) {
    // championship é o objeto que vem do resource.read() — tem championship.championship.id
    const championshipId = championship?.championship?.id ?? championship?.id ?? null;

    const [teams, setTeams] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [teamImage, setTeamImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!championshipId) return;
        setLoading(true);
        getTeams(championshipId)
            .then((res) => {
                setTeams(res || []);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Falha ao carregar times");
            })
            .finally(() => setLoading(false));
    }, [championshipId]);

    const handleAddTeam = async () => {
        if (!teamName.trim()) {
            return toast.error("Nome da equipe é obrigatório");
        }

        try {
            const payload = {
                name: teamName.trim(),
                description: teamDescription.trim(),
                image: teamImage || null,
            };
            const newTeam = await createTeam(payload, championshipId);
            // adicionar no estado local
            setTeams((prev) => [...prev, newTeam]);
            setTeamName("");
            setTeamDescription("");
            setTeamImage(null);
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            // toast já exibido no service
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setTeamImage(reader.result); // dataURL
        reader.onerror = (err) => {
            console.error("Erro ao ler imagem", err);
            toast.error("Erro ao processar a imagem");
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = async (id) => {
        const ok = await removeTeam(id);
        if (ok) setTeams((prev) => prev.filter((t) => String(t.id) !== String(id)));
    };

    return (
        <>
            <div className="flex justify-between items-center mt-8 mb-3">
                <h3 className="subtitle">Equipes</h3>
                <Button onClick={() => setIsModalOpen(true)}>Adicionar Equipe</Button>
            </div>

            {loading ? (
                <p>Carregando times...</p>
            ) : teams.length > 0 ? (
                <div className="space-y-3">
                    {teams.map((team) => (
                        <div key={team.id} className="flex items-center gap-4 border p-3 rounded">
                            <div className="flex items-center gap-3">
                                {team.image ? (
                                    <img src={team.image} alt={team.name} className="w-12 h-12 rounded-full object-cover" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm">Sem</div>
                                )}
                                <div>
                                    <div className="font-semibold">{team.name}</div>
                                    <div className="text-sm text-gray-600">{team.description}</div>
                                </div>
                            </div>
                            <div className="ml-auto flex gap-2">
                                <Button styleClass="px-2 py-1 text-sm" onClick={() => toast.info("Visualizar ainda não implementado")}>Visualizar</Button>
                                <Button styleClass="px-2 py-1 text-sm" onClick={() => handleRemove(team.id)}>Remover</Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="py-4 text-center text-gray-500">Nenhuma equipe cadastrada</p>
            )}

            <DefaultModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Equipe" size={"[600px]"}>
                <h2 className="subtitle mb-8">Adicionar Equipe</h2>

                <div className="flex gap-6 items-center justify-center">
                    <div>
                        <label htmlFor="teamImg">
                            {teamImage ? (
                                <img src={teamImage} alt="Prévia da equipe" className="w-32 h-32 object-cover rounded-full border" />
                            ) : (
                                <div className="w-32 h-32 flex items-center justify-center border rounded-full text-gray-400">Sem imagem</div>
                            )}
                        </label>
                        <input id={"teamImg"} type="file" accept="image/*" onChange={handleImageChange} className={"hidden"} />
                    </div>

                    <div className="flex-1 flex flex-col gap-3">
                        <input type="text" placeholder="Nome da equipe" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" />
                        <textarea placeholder="Descrição da equipe" value={teamDescription} onChange={(e) => setTeamDescription(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-5">
                    <Button styleClass="bg-gray-300" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                    <Button styleClass="bg-[var(--primaria)]" onClick={handleAddTeam}>Salvar</Button>
                </div>
            </DefaultModal>
        </>
    );
}

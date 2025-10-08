import Button from "@/components/Button/index.jsx";
import {useNavigate} from "react-router-dom";
import DefaultModal from "@/components/Dialog/index.jsx";
import {useState} from "react";

export default function Teams({championship}) {
    const [teams, setTeams] = useState(championship.teams || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [teamImage, setTeamImage] = useState(null);
    const handleAddTeam = () => {
        if (!teamName.trim()) return;
        setTeams([...teams, {name: teamName, description: teamDescription, image: teamImage}]);
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
        <>
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
            <DefaultModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Adicionar Equipe"
                size={"[600px]"}
            >

                <h2 className="subtitle mb-8">
                    Adicionar Equipe
                </h2>
                <div className="flex gap-6 items-center justify-center">
                    <div className="">
                        <label htmlFor="teamImg">
                            {teamImage ? (
                                <img
                                    src={teamImage}
                                    alt="Prévia da equipe"
                                    className="w-32 h-32 object-cover rounded-full border"
                                />
                            ) : (
                                <div
                                    className="w-32 h-32 flex items-center justify-center border rounded-full text-gray-400">
                                    Sem imagem
                                </div>
                            )}
                        </label>
                        <input id={"teamImg"} type="file" accept="image/*" onChange={handleImageChange}
                               className={"hidden"}/>
                    </div>
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
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-5">
                    <Button styleClass="bg-gray-300" onClick={() => setIsModalOpen(false)}>
                        Cancelar
                    </Button>
                    <Button styleClass="bg-[var(--primaria)]" onClick={handleAddTeam}>
                        Salvar
                    </Button>
                </div>
            </DefaultModal>
        </>
    )
}

import {useEffect, useState} from "react";
import Button from "@/components/Button/index.jsx";
import DefaultModal from "@/components/Dialog/index.jsx";
import {getTeams} from "@/services/teams.js";
import {getGamesByChampionship, createGame, removeGame, updateGame} from "@/services/games.js"; // 🆕
import {toast} from "react-toastify";

export default function Games({championship}) {
    const championshipId = championship?.championship?.id ?? championship?.id ?? null;

    const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // 🆕

    const [round, setRound] = useState("Oitavas de final");
    const [teamAId, setTeamAId] = useState("");
    const [teamBId, setTeamBId] = useState("");
    const [scoreA, setScoreA] = useState("");
    const [scoreB, setScoreB] = useState("");
    const [date, setDate] = useState("");

    const rounds = ["Oitavas de final", "Quartas de final", "Semifinal", "Final"];

    useEffect(() => {
        if (!championshipId) return;
        setLoading(true);
        Promise.all([getTeams(championshipId), getGamesByChampionship(championshipId)])
            .then(([teamsRes, gamesRes]) => {
                setTeams(teamsRes || []);
                setGames(gamesRes || []);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Erro ao carregar dados!");
            })
            .finally(() => setLoading(false));
    }, [championshipId]);

    const findTeamName = (id) => {
        const t = teams.find((tt) => String(tt.id) === String(id));
        return t ? t.name : "—";
    };

    const resetForm = () => {
        setRound("Oitavas de final");
        setTeamAId("");
        setTeamBId("");
        setScoreA("");
        setScoreB("");
        setDate("");
        setEditingId(null);
    };

    // 🔹 Adicionar ou atualizar
    const handleSaveGame = async () => {
        if (!teamAId || !teamBId) return toast.error("Selecione as duas equipes.");
        if (String(teamAId) === String(teamBId)) return toast.error("Selecione equipes diferentes.");

        const gameData = {
            id: editingId || Date.now() + Math.floor(Math.random() * 1000),
            championshipId,
            round,
            teamAId: String(teamAId),
            teamBId: String(teamBId),
            scoreA: scoreA !== "" ? Number(scoreA) : null,
            scoreB: scoreB !== "" ? Number(scoreB) : null,
            date: date || new Date().toISOString().slice(0, 10),
        };

        if (editingId) {
            // 🆕 Update
            await updateGame(gameData, editingId);
            setGames((prev) =>
                prev.map((g) => (String(g.id) === String(editingId) ? gameData : g))
            );
            toast.success("Partida atualizada!");
        } else {
            // Criar
            await createGame(gameData);
            setGames((prev) => [...prev, gameData]);
            toast.success("Partida criada!");
        }

        resetForm();
        setIsModalOpen(false);
    };

    const handleEdit = (game) => {
        setEditingId(game.id);
        setRound(game.round);
        setTeamAId(game.teamAId);
        setTeamBId(game.teamBId);
        setScoreA(game.scoreA ?? "");
        setScoreB(game.scoreB ?? "");
        setDate(game.date ?? "");
        setIsModalOpen(true);
    };

    const handleRemove = async (id) => {
        await removeGame(id);
        setGames((prev) => prev.filter((g) => String(g.id) !== String(id)));
    };

    return (
        <div className="text-[var(--texto)]">
            <div className="flex justify-between items-center mt-8 mb-3">
                <h3 className="subtitle">Partidas</h3>
                <Button onClick={() => setIsModalOpen(true)}>Adicionar Partida</Button>
            </div>

            {loading ? (
                <p>Carregando dados...</p>
            ) : (
                <>
                    {rounds.map((phase) => {
                        const filteredGames = games.filter((g) => g.round === phase);
                        if (filteredGames.length === 0) return null;
                        return (
                            <div key={phase} className="mb-8">
                                <h4 className="font-bold text-lg mb-3 text-[var(--primaria)]">{phase}</h4>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {filteredGames.map((game) => (
                                        <div key={game.id}
                                             className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold">{findTeamName(game.teamAId)}</span>
                                                    <span className="text-sm text-gray-500">vs</span>
                                                    <span className="font-semibold">{findTeamName(game.teamBId)}</span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {new Date(game.date).toLocaleDateString("pt-BR")}
                                                </div>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                                <div className="text-sm">
                                                    Placar:{" "}
                                                    <span className="font-medium">{game.scoreA ?? "-"}</span> x{" "}
                                                    <span className="font-medium">{game.scoreB ?? "-"}</span>
                                                </div>
                                                <div className="ml-auto flex gap-2">
                                                    <Button styleClass="px-2 py-1 text-sm"
                                                            onClick={() => handleEdit(game)}>Editar</Button>
                                                    <Button styleClass="px-2 py-1 text-sm"
                                                            onClick={() => handleRemove(game.id)}>Remover</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    {games.length === 0 && (
                        <p className="text-center text-gray-500 mt-10">Nenhuma partida cadastrada.</p>
                    )}
                </>
            )}

            <DefaultModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    resetForm();
                }}
                title={editingId ? "Editar Partida" : "Adicionar Partida"} // 🆕
                size={"[600px]"}
            >
                <h2 className="subtitle mb-8">
                    {editingId ? "Editar Partida" : "Adicionar Partida"} {/* 🆕 */}
                </h2>
                <div className="flex flex-col gap-4">
                    <select value={round} onChange={(e) => setRound(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full">
                        {rounds.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm block mb-1">Equipe A</label>
                            <select value={teamAId} onChange={(e) => setTeamAId(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-full">
                                <option value="">— selecione —</option>
                                {teams.map((t) => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm block mb-1">Equipe B</label>
                            <select value={teamBId} onChange={(e) => setTeamBId(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-full">
                                <option value="">— selecione —</option>
                                {teams.map((t) => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <input type="number" placeholder="Gols A" value={scoreA}
                               onChange={(e) => setScoreA(e.target.value)}
                               className="border border-gray-300 rounded px-3 py-2"/>
                        <input type="number" placeholder="Gols B" value={scoreB}
                               onChange={(e) => setScoreB(e.target.value)}
                               className="border border-gray-300 rounded px-3 py-2"/>
                    </div>

                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                           className="border border-gray-300 rounded px-3 py-2 w-full"/>

                    <div className="flex justify-end gap-3 mt-5">
                        <Button styleClass="bg-gray-300" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button styleClass="bg-[var(--primaria)]" onClick={handleSaveGame}>
                            {editingId ? "Atualizar" : "Salvar"} {/* 🆕 */}
                        </Button>
                    </div>
                </div>
            </DefaultModal>
        </div>
    );
}

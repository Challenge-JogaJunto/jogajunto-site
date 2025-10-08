// src/services/players.js
import {toast} from "react-toastify";

const LOCAL_KEY = "players";

const readLocal = () => {
    try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (err) {
        console.error("Erro ao ler localStorage (players):", err);
        return null;
    }
};

const writeLocal = (arr) => {
    try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
    } catch (err) {
        console.error("Erro ao gravar localStorage (players):", err);
    }
};

const ensureLocal = async () => {
    const local = readLocal();
    if (local && Array.isArray(local) && local.length > 0) return local;

    try {
        const res = await fetch("/json/players.json");
        if (!res.ok) throw new Error("Falha ao buscar players.json: " + res.status);
        const data = await res.json();
        writeLocal(data);
        return data;
    } catch (err) {
        console.error("Erro ao popular players:", err);
        toast.error("Erro ao carregar jogadores iniciais.");
        return [];
    }
};

const getPlayers = async () => {
    const local = readLocal();
    if (local && Array.isArray(local) && local.length > 0) return local;
    return await ensureLocal();
};

const getPlayersByChampionship = async (championshipId) => {
    const all = await getPlayers();
    return (all || []).filter((p) => String(p.championshipId) === String(championshipId));
};

const genId = () => `p-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const createPlayer = async (player, championshipId) => {
    try {
        const all = (readLocal() && Array.isArray(readLocal())) ? readLocal() : await getPlayers();
        const id = player.id ?? genId();
        const newPlayer = {
            id,
            championshipId: championshipId ?? player.championshipId,
            name: player.name || "Jogadora sem nome",
            description: player.description || "",
            img: player.img || null,
        };
        all.push(newPlayer);
        writeLocal(all);
        toast.success("Jogadora adicionada!");
        return newPlayer;
    } catch (err) {
        console.error("createPlayer error:", err);
        toast.error("Erro ao criar jogadora!");
        throw err;
    }
};

const updatePlayer = async (playerData, id) => {
    try {
        const all = (readLocal() && Array.isArray(readLocal())) ? readLocal() : await getPlayers();
        const targetId = id ?? playerData?.id;
        if (typeof targetId === "undefined" || targetId === null) {
            throw new Error("updatePlayer: id inválido");
        }
        const idx = all.findIndex((p) => String(p.id) === String(targetId));
        if (idx === -1) {
            throw new Error("Jogadora não encontrada");
        }

        const updated = {
            ...all[idx],
            ...playerData,
            id: all[idx].id,
            championshipId: playerData.championshipId ?? all[idx].championshipId,
        };

        all[idx] = updated;
        writeLocal(all);
        toast.success("Jogadora atualizada!");
        return updated;
    } catch (err) {
        console.error("updatePlayer error:", err);
        toast.error("Erro ao atualizar jogadora.");
        throw err;
    }
};

const removePlayer = async (id) => {
    try {
        const all = (readLocal() && Array.isArray(readLocal())) ? readLocal() : await getPlayers();
        const filtered = all.filter((p) => String(p.id) !== String(id));
        writeLocal(filtered);
        toast.success("Jogadora removida!");
        return true;
    } catch (err) {
        console.error("removePlayer error:", err);
        toast.error("Erro ao remover jogadora.");
        return false;
    }
};

export {
    getPlayers,
    getPlayersByChampionship,
    createPlayer,
    updatePlayer,
    removePlayer
};

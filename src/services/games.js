// src/services/games.js
import {toast} from "react-toastify";

const LOCAL_KEY = "games";

const readLocal = () => {
    try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (err) {
        console.error("Erro ao ler localStorage (games):", err);
        return null;
    }
};

const writeLocal = (arr) => {
    try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
    } catch (err) {
        console.error("Erro ao gravar localStorage (games):", err);
    }
};

const getGames = () => {
    const local = readLocal();
    if (local && Array.isArray(local) && local.length > 0) {
        return Promise.resolve(local);
    }

    return fetch("/json/games.json")
        .then((res) => {
            if (!res.ok) throw new Error(`Erro: ${res.status}`);
            return res.json();
        })
        .then((games) => {
            writeLocal(games);
            return games;
        })
        .catch((err) => {
            console.error(err);
            toast.error("Erro ao carregar partidas!");
            return [];
        });
};

const getGamesByChampionship = async (championshipId) => {
    const games = await getGames();
    return (games || []).filter((g) => String(g.championshipId) === String(championshipId));
};

const createGame = async (game) => {
    try {
        const local = readLocal();
        const all = local && Array.isArray(local) ? local : (await getGames()) || [];
        all.push(game);
        writeLocal(all);
        toast.success("Partida salva!");
        return game;
    } catch (err) {
        console.error(err);
        toast.error("Erro ao salvar partida!");
        throw err;
    }
};

const updateGame = async (gameData, id) => {
    try {
        const all = readLocal() && Array.isArray(readLocal()) ? readLocal() : (await getGames()) || [];
        const targetId = id ?? gameData?.id;
        if (typeof targetId === "undefined" || targetId === null) {
            throw new Error("updateGame: id inválido");
        }

        const idx = all.findIndex((g) => String(g.id) === String(targetId));
        if (idx === -1) {
            throw new Error("Partida não encontrada");
        }

        // Merge — substitui o objeto inteiro pelo novo (você pode ajustar para merge parcial se quiser)
        const updated = {
            ...all[idx],
            ...gameData,
            id: all[idx].id, // mantém o id original (garante coerência)
            championshipId: gameData.championshipId ?? all[idx].championshipId,
        };

        all[idx] = updated;
        writeLocal(all);
        toast.success("Partida atualizada!");
        return updated;
    } catch (err) {
        console.error("updateGame error:", err);
        toast.error("Erro ao atualizar partida.");
        throw err;
    }
};

const removeGame = async (id) => {
    try {
        const all = readLocal() && Array.isArray(readLocal()) ? readLocal() : (await getGames()) || [];
        const updated = all.filter((g) => String(g.id) !== String(id));
        writeLocal(updated);
        toast.success("Partida removida!");
        return true;
    } catch (err) {
        console.error(err);
        toast.error("Erro ao remover partida!");
        return false;
    }
};

export {getGames, getGamesByChampionship, createGame, updateGame, removeGame};

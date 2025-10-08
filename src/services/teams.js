import {toast} from "react-toastify";

const LOCAL_KEY = "teams";

const readLocal = () => {
    try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (err) {
        console.error("Erro ao ler localStorage (teams):", err);
        return null;
    }
};

const writeLocal = (arr) => {
    try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
    } catch (err) {
        console.error("Erro ao gravar localStorage (teams):", err);
    }
};

const ensureLocalData = async () => {
    const local = readLocal();
    if (local && Array.isArray(local) && local.length > 0) {
        return local;
    }

    try {
        const res = await fetch("/json/teams.json");
        if (!res.ok) {
            throw new Error("Falha ao buscar teams.json: " + res.status);
        }
        const data = await res.json();
        writeLocal(data);
        return data;
    } catch (err) {
        console.error(err);
        toast.error("Erro ao carregar times iniciais.");
        return [];
    }
};

const getTeams = async (championshipId) => {
    try {
        const all = await ensureLocalData();
        return all.filter((t) => String(t.championshipId) === String(championshipId));
    } catch (err) {
        console.error("getTeams error:", err);
        toast.error("Erro ao buscar times.");
        return [];
    }
};


const genId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;


const createTeam = async (team, championshipId) => {
    try {
        const all = (readLocal() && Array.isArray(readLocal())) ? readLocal() : await ensureLocalData();
        const id = genId();
        const newTeam = {
            id,
            championshipId: Number(championshipId) || String(championshipId),
            name: team.name || "Time sem nome",
            description: team.description || "",
            image: team.image || null,
        };
        all.push(newTeam);
        writeLocal(all);
        toast.success("Time adicionado com sucesso!");
        return newTeam;
    } catch (err) {
        console.error("createTeam error:", err);
        toast.error("Erro ao criar time.");
        throw err;
    }
};


const removeTeam = async (teamId) => {
    try {
        const all = readLocal() || [];
        const filtered = all.filter((t) => String(t.id) !== String(teamId));
        writeLocal(filtered);
        toast.success("Time removido");
        return true;
    } catch (err) {
        console.error("removeTeam error:", err);
        toast.error("Erro ao remover time");
        return false;
    }
};

export {getTeams, createTeam, removeTeam};

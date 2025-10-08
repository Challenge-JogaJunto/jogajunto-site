// storage.simple.js
// Versão mínima para uso rápido em React (localStorage)
// Todas as funções são pequenas, separadas e retornam o objeto atualizado quando aplicável.

// ---------- keys ----------
export const CHAMP_INDEX_KEY = "jogajunto:championships";
export const champKey = (id) => `jogajunto:championship:${id}`;

// ---------- index helpers ----------
export function getChampionshipIndex() {
    const s = localStorage.getItem(CHAMP_INDEX_KEY);
    if (!s) return [];
    try {
        return JSON.parse(s);
    } catch (e) {
        return [];
    }
}

export function setChampionshipIndex(arr) {
    localStorage.setItem(CHAMP_INDEX_KEY, JSON.stringify(arr));
}

// ---------- CRUD básicos ----------
export function saveChampionship(championship) {
    if (!championship || championship.id == null) throw new Error("championship.id obrigatório");
    const id = String(championship.id);
    localStorage.setItem(champKey(id), JSON.stringify(championship));
    const idx = getChampionshipIndex();
    if (!idx.includes(id)) {
        idx.push(id);
        setChampionshipIndex(idx);
    }
    return championship;
}

export function loadChampionship(id) {
    if (id == null) return null;
    const s = localStorage.getItem(champKey(String(id)));
    if (!s) return null;
    try {
        return JSON.parse(s);
    } catch (e) {
        return null;
    }
}

export function listChampionships() {
    return getChampionshipIndex().map(id => loadChampionship(id)).filter(Boolean);
}

export function deleteChampionship(id) {
    const sid = String(id);
    localStorage.removeItem(champKey(sid));
    const idx = getChampionshipIndex().filter(x => x !== sid);
    setChampionshipIndex(idx);
    return true;
}

// ---------- util simples para achar partida ----------
export function findMatch(championship, matchId) {
    if (!championship || !championship.bracket) return null;
    const rounds = championship.bracket.rounds || [];
    for (let r = 0; r < rounds.length; r++) {
        const ms = rounds[r].matches || [];
        for (let m = 0; m < ms.length; m++) {
            if (ms[m].id === matchId) return {match: ms[m], roundIndex: r, matchIndex: m, isThird: false};
        }
    }
    const third = championship.bracket.thirdPlaceMatch;
    if (third && third.id === matchId) return {match: third, roundIndex: null, matchIndex: null, isThird: true};
    return null;
}

// ---------- propagar vencedor (simples) ----------
export function propagateWinner(championship, match) {
    if (!match.nextMatchId || !match.winnerTeamId) return championship;
    const rounds = championship.bracket.rounds || [];
    for (let r = 0; r < rounds.length; r++) {
        const ms = rounds[r].matches || [];
        for (let m = 0; m < ms.length; m++) {
            if (ms[m].id === match.nextMatchId) {
                if (match.nextMatchSlot === "home") ms[m].homeTeamId = match.winnerTeamId;
                else ms[m].awayTeamId = match.winnerTeamId;
                if (ms[m].homeTeamId && ms[m].awayTeamId) ms[m].status = "scheduled";
                return championship;
            }
        }
    }
    return championship;
}

// ---------- assign terceiro lugar (quando semis completos) ----------
export function assignThirdPlaceIfReady(championship) {
    if (!championship.bracket || !championship.bracket.thirdPlaceMatch) return championship;
    const rounds = championship.bracket.rounds || [];
    const semis = rounds.find(r => r.name && r.name.toLowerCase().includes("semi"));
    if (!semis) return championship;
    if (!semis.matches.every(m => m.status === "played")) return championship;
    const losers = semis.matches.map(m => {
        if (!m.winnerTeamId) return null;
        return (m.winnerTeamId === m.homeTeamId) ? m.awayTeamId : m.homeTeamId;
    });
    championship.bracket.thirdPlaceMatch.homeTeamId = losers[0] || null;
    championship.bracket.thirdPlaceMatch.awayTeamId = losers[1] || null;
    if (championship.bracket.thirdPlaceMatch.homeTeamId && championship.bracket.thirdPlaceMatch.awayTeamId)
        championship.bracket.thirdPlaceMatch.status = "scheduled";
    return championship;
}

// ---------- gravar resultado e salvar (atomic) ----------
// opts: { tiebreak: "penalties"|"coinflip", penaltiesHome, penaltiesAway }
export function recordMatchResultAndSave(champId, matchId, homeGoals, awayGoals, opts = {}) {
    const championship = loadChampionship(champId);
    if (!championship) throw new Error("championship não encontrado");
    const updated = recordMatchResult(championship, matchId, homeGoals, awayGoals, opts);
    saveChampionship(updated);
    return updated;
}

// função que atualiza o objeto (NÃO cria cópia para simplicidade)
export function recordMatchResult(championship, matchId, homeGoals, awayGoals, opts = {}) {
    const found = findMatch(championship, matchId);
    if (!found) throw new Error("matchId não encontrado");
    const match = found.match;

    match.homeGoals = Number(homeGoals);
    match.awayGoals = Number(awayGoals);
    match.status = "played";

    let winner = null;
    let loser = null;

    if (match.homeGoals > match.awayGoals) {
        winner = match.homeTeamId;
        loser = match.awayTeamId;
        match.decidedBy = "regular";
    } else if (match.awayGoals > match.homeGoals) {
        winner = match.awayTeamId;
        loser = match.homeTeamId;
        match.decidedBy = "regular";
    } else {
        // empate
        if (opts.tiebreak === "penalties" && opts.penaltiesHome != null && opts.penaltiesAway != null) {
            match.penaltiesHome = opts.penaltiesHome;
            match.penaltiesAway = opts.penaltiesAway;
            if (opts.penaltiesHome > opts.penaltiesAway) {
                winner = match.homeTeamId;
                loser = match.awayTeamId;
                match.decidedBy = "penalties";
            } else if (opts.penaltiesAway > opts.penaltiesHome) {
                winner = match.awayTeamId;
                loser = match.homeTeamId;
                match.decidedBy = "penalties";
            } else {
                match.decidedBy = "draw";
            }
        } else {
            // fallback coinflip
            winner = Math.random() < 0.5 ? match.homeTeamId : match.awayTeamId;
            loser = winner === match.homeTeamId ? match.awayTeamId : match.homeTeamId;
            match.decidedBy = "coinflip";
        }
    }

    if (winner) {
        match.winnerTeamId = winner;
        match.loserTeamId = loser;
    }

    // propaga
    propagateWinner(championship, match);

    // terceiro lugar se aplicável
    assignThirdPlaceIfReady(championship);

    championship.updatedAt = new Date().toISOString();
    return championship;
}

// ---------- export/import simples ----------
export function exportChampionshipFile(id, filename) {
    const champ = loadChampionship(id);
    if (!champ) throw new Error("championship não encontrado");
    const blob = new Blob([JSON.stringify(champ, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || `championship-${id}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

export function importChampionship(objOrString) {
    let obj = objOrString;
    if (typeof objOrString === "string") obj = JSON.parse(objOrString);
    // obj can be wrapper { championship: {...}, teams: ..., bracket: ... } or the championship itself
    const toSave = (obj.championship) ? obj : obj;
    if (!toSave || (!toSave.championship && !toSave.id)) {
        // if wrapper missing id, try to use nested championship
        if (obj.championship && obj.championship.id) {
            saveChampionship(obj);
            return obj;
        }
        throw new Error("objeto inválido para import");
    }
    // decide id: prefer toSave.championship.id else toSave.id
    const id = toSave.championship ? toSave.championship.id : toSave.id;
    saveChampionship(toSave);
    return toSave;
}

// ---------- id simples ----------
export function createId(prefix = "") {
    return prefix + Date.now().toString(36) + "-" + Math.floor(Math.random() * 10000).toString(36);
}

as
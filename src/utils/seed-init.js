// seed-init.js
import {loadChampionship, saveChampionship, importChampionship} from "./storage.simple";

/**
 * initSeedIfNotExists(seed)
 * - seed: objeto JSON (pode ser wrapper { championship: {...}, teams:..., bracket:... } ou o próprio championship)
 * - retorna true se salvou o seed, false se já existia
 */
export function initSeedIfNotExists(seed) {
    if (!seed) throw new Error("seed obrigatório");

    // tenta extrair id do wrapper ou do objeto diretamente
    const id = (seed.championship && seed.championship.id) ? seed.championship.id : (seed.id ?? null);
    if (!id) throw new Error("seed precisa ter id (ou championship.id)");

    // se já existe, não sobrescreve
    const existing = loadChampionship(id);
    if (existing) return false;

    // se for wrapper, use importChampionship (ela já chama save internamente)
    if (seed.championship) {
        importChampionship(seed); // salva wrapper inteiro
    } else {
        // championship simples
        saveChampionship(seed);
    }
    return true;
}

/**
 * initSeedForce(seed)
 * - força sobrescrever o campeonato no localStorage (útil para dev / reset)
 * - retorna true quando concluído
 */
export function initSeedForce(seed) {
    if (!seed) throw new Error("seed obrigatório");
    const id = (seed.championship && seed.championship.id) ? seed.championship.id : (seed.id ?? null);
    if (!id) throw new Error("seed precisa ter id (ou championship.id)");
    if (seed.championship) importChampionship(seed);
    else saveChampionship(seed);
    return true;
}

/**
 * loadSeedFromFile(url)
 * - opção: se guardar seed em /public/seed.json, faz fetch e retorna o objeto
 * - uso: await loadSeedFromFile('/seed/championship-1024.json')
 */
export async function loadSeedFromFile(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro ao buscar seed: " + res.status);
    const obj = await res.json();
    return obj;
}
C
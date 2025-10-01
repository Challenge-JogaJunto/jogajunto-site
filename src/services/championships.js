import {toast} from "react-toastify";

const getChampionships = () => {
    // const local = localStorage.getItem("championships");

    // if (local && local.length > 0) {
    //     return JSON.parse(local)
    // } else {

    return fetch('/json/championships.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(`Erro ao buscar campeonato: ${res.status}`);
            }
            return res.json();
        })
        .then(championships => {
            // localStorage.setItem("championships", JSON.stringify(championships));
            return championships;
        }).catch(err => {
            console.error(err)
            toast.error("Erro ao buscar os campeonatos!")
        });
    // }


}

const getChampionshipById = (id) => {
    return fetch(`/json/championships.json`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Erro ao buscar campeonato: ${res.status}`);
            }

            return res.json() || undefined;
        })
        .then(championships => {

            const found = championships.find((c) => c.championship.id === Number(id));
            if (!found) {
                throw new Error("Campeonato não encontrado");
            }
            return found;
        }).catch(err => {
            console.error(err)
            toast.error("Erro ao buscar os campeonatos!")
            throw err
        });
}
export {
    getChampionships,
    getChampionshipById
}
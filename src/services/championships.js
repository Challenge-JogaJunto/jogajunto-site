import {toast} from "react-toastify";

const getChampionships = () => {
    const response = fetch('./src/json/championships.json')
        .then(res => res.json())
        .then(championships => {
            // console.log(championships);
            return championships;
        }).catch(err => {
            console.error(err)
            toast.error("Erro ao buscar os campeonatos!")
        });
    return response;
}
export {
    getChampionships,
}
import {toast} from "react-toastify";

const getChampionships = () => {
    const local = localStorage.getItem("championships");

    if (local && local.length > 0) {
        return JSON.parse(local)
    } else {

        return fetch('./src/json/championships.json')
            .then(res => res.json())
            .then(championships => {
                localStorage.setItem("championships", JSON.stringify(championships));
                return championships;
            }).catch(err => {
                console.error(err)
                toast.error("Erro ao buscar os campeonatos!")
            });
    }


}
export {
    getChampionships,
}
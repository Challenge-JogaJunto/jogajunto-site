import {toast} from "react-toastify";

const findChampionshipById = (championships, id) => {
    return championships.find(
        (c) => String(c.championship.id) === String(id)
    );
};


const getChampionships = () => {
    const local = localStorage.getItem("championships");

    if (local && local.length > 0) {
        const championships = JSON.parse(local);
        return Promise.resolve(championships);
    } else {

        return fetch('/json/championships.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Erro ao buscar campeonato: ${res.status}`);
                }
                return res.json();
            })
            .then(championships => {
                localStorage.setItem("championships", JSON.stringify(championships));
                return championships
            }).catch(err => {
                console.error(err)
                toast.error("Erro ao buscar os campeonatos!")
            });
    }


}

const getChampionshipById = async (id) => {
    const local = localStorage.getItem("championships");

    if (local) {
        const championships = JSON.parse(local);
        const found = findChampionshipById(championships, id);
        if (!found) {
            throw new Error("Campeonato não encontrado");
        }
        return found;
    } else {
        const championships = await getChampionships();
        const found = findChampionshipById(championships, id);
        if (!found) {
            throw new Error("Campeonato não encontrado");
        }
        return found;
    }
};

const createChampionship = async (championship) => {
    const local = localStorage.getItem("championships");

    try {
        if (local && local.length > 0) {
            let championships = JSON.parse(local)
            championships.push(championship)
            localStorage.setItem("championships", JSON.stringify(championships));
        } else {
            const championships = await getChampionships()
            championships.push(championship)
            localStorage.setItem("championships", JSON.stringify(championships));
        }
    } catch (err) {
        console.error(err)
        return toast.error("Erro ao criar campeonato!");
    }
}
const updateChampionship = async (newData, id) => {
    const local = localStorage.getItem("championships");
    try {
        let championships;
        if (local) {
            championships = JSON.parse(local);
        } else {
            championships = await getChampionships();
        }

        const found = findChampionshipById(championships, id);
        if (!found) {
            throw new Error("Campeonato não encontrado");
        }

        const updatedChampionships = championships.map((c) =>
            String(c.championship.id) === String(id)
                ? {championship: newData.championship, organizer: newData.organizer}
                : c
        );

        localStorage.setItem("championships", JSON.stringify(updatedChampionships));
        toast.success("Campeonato atualizado com sucesso!");
    } catch (err) {
        console.error(err);
        toast.error("Erro ao atualizar campeonato!");
    }
};

export {
    createChampionship,
    updateChampionship,
    getChampionships,
    getChampionshipById
}
import {toast} from "react-toastify";

const fetchPosts = async () => {

    const response = fetch("https://dummyjson.com/c/38e0-8122-4cda-8c4f?delay=2000")
        .then((response) => response.json())
        .then((json) => {
            return json.publicacoes;
        }).catch((error) => {
            console.log(error);
            toast.error("Erro ao buscar publicações");
        })
    return response;
}

export {
    fetchPosts,
}
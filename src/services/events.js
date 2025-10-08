import {toast} from "react-toastify";

const fetchEvents = () => {
    fetch('http://localhost:3000/events')
        .then(res => res.json())
        .then(events => {
            return events;
        }).catch(err => {
        console.log(err)
        toast.error("Erro ao buscar os eventos!")
    });
}
export {
    fetchEvents,
}
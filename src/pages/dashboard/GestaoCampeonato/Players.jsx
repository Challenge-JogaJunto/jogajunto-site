import {useEffect, useState} from "react";
import DefaultModal from "@/components/Dialog/index.jsx";
import Button from "@/components/Button/index.jsx";
import InputImage from "@/components/form/InputImage/index.jsx";
import {FormTools} from "@/utils/formTools.js";
import InputField from "@/components/form/Input/index.jsx";
import TextArea from "@/components/form/TextArea/index.jsx";
import ContainerDiv from "@/components/Container/index.jsx";
import defaultUser from "@/assets/defaultUser.jpg";
import IconButton from "@/components/IconButton/index.jsx";
import {FaEdit} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

import {toast} from "react-toastify";

export default function Players({championship}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [players, setPlayers] = useState([{
        id: uuidv4(),
        name: "Marta",
        description: "Descrição da Jogadora",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7HAxKnho8xxXc-mqe_b7tCYHTp_z62z76w&s",

    }
    ]);
    const [newPlayer, setNewPlayer] = useState({
        name: "",
        description: "",
        img: "",

    });
    const [selPlayer, setSelPlayer] = useState(null);
    const {handleChange} = new FormTools(newPlayer, setNewPlayer);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (!newPlayer.name || newPlayer.name.trim() === "") {
                return toast.error("Nome da jogadora é obrigatório");
            }


            const genId = () => {
                try {
                    if (typeof uuidv4 === "function") return uuidv4();
                } catch (err) {
                    console.log(err)
                }
                if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
                    return crypto.randomUUID();
                }

                return "id-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
            };

            if (selPlayer) {

                setPlayers((prev) =>
                    prev.map((p) =>
                        String(p.id) === String(selPlayer.id)
                            ? {
                                ...p,
                                ...newPlayer,
                                id: p.id,
                            }
                            : p
                    )
                );
                toast.success("Jogadora atualizada com sucesso!");
            } else {

                const id = genId();
                const playerToAdd = {
                    id,
                    name: newPlayer.name,
                    description: newPlayer.description || "",
                    img: newPlayer.img || "",
                };
                setPlayers((prev) => [playerToAdd, ...prev]);
                toast.success("Jogadora adicionada com sucesso!");
            }

            setSelPlayer(null);
            setNewPlayer({
                name: "",
                description: "",
                img: "",
            });
            setIsModalOpen(false);
        } catch (err) {
            console.error("Erro handleSubmit players:", err);
            toast.error("Erro ao salvar jogadora");
        }
    };

    useEffect(() => {
        if (selPlayer) {
            setNewPlayer(selPlayer);
        } else {
            setNewPlayer({
                name: "",
                description: "",
                img: "",
            })
        }
    }, [selPlayer]);


    useEffect(() => {
        console.log([players]);
    }, [players]);
    return (
        <>
            <div className="flex justify-between items-center gap-3 w-full">
                <h2 className="subtitle my-6">Jogadoras</h2>
                <Button styleClass="bg-[var(--primaria)]" onClick={() => {
                    setIsModalOpen(true)
                    setSelPlayer(null)
                }}>
                    Adicionar jogadora
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    players && players.length > 0 && players.map((player, index) => (
                        <ContainerDiv className={"w-full rounded-lg overflow-hidden relative"} key={index}>
                            <img src={player.img ?? defaultUser} alt="Imagem da jogadora"
                                 className={"w-full aspect-3/4 object-cover object-top"}/>
                            <div
                                className="w-full px-3 py-5 absolute left-0 bottom-0 text-white bg-linear-to-t from-[#000000] to-transparent">
                                <h4 className="link">{player.name}</h4>
                                <p className="text w-full " style={{fontSize: "12px"}}> {player.description}</p>
                            </div>
                            <div
                                className="flex items-center gap-3 px-3 py-5 absolute right-0 top-0 bg-[#00000099]">
                                <IconButton
                                    icon={<FaEdit size={20}/>}
                                    color={"#fff"}
                                    onClick={() => {
                                        setSelPlayer(player)
                                        setIsModalOpen(true)
                                    }}
                                />
                                <IconButton
                                    icon={<FaTrash size={20}/>}
                                    color={"#fff"}
                                    onClick={() => {
                                        setPlayers((prev) => prev.filter(p => p.id !== player.id));
                                    }}
                                />
                            </div>
                        </ContainerDiv>
                    ))
                }
            </div>

            <DefaultModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Adicionar Equipe"
                size={"[600px]"}
            >
                <form onSubmit={handleSubmit}>

                    <h2 className="subtitle mb-8">
                        Adicionar Jogadora
                    </h2>
                    <div className="gap-6 items-center justify-center">
                        <InputImage
                            id={"img"}
                            setImage={(val) => setNewPlayer({...newPlayer, img: val})}
                            image={newPlayer.img}
                            adicionalStyle={{borderRadius: "50%", maxWidth: "280px", aspectRatio: 3 / 4}}
                        />

                        <div className="flex-1 flex flex-col gap-1">
                            <InputField
                                id={"name"}
                                type="text"
                                placeholder="Nome da equipe"
                                value={newPlayer.name}
                                onChange={handleChange}
                                label={"Nome da jogadora"}

                            />
                            <TextArea
                                label={"Descrição"}
                                height={"100px"}
                                id={"description"}
                                placeholder="Descrição da equipe"
                                value={newPlayer.description}
                                onChange={handleChange}

                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-5">
                        <Button styleClass="bg-gray-300" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type={"submit"} styleClass="bg-[var(--primaria)]">
                            Salvar
                        </Button>
                    </div>
                </form>
            </DefaultModal>
        </>
    )
}

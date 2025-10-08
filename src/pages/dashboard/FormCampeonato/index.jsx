import {useNavigate, useParams} from "react-router-dom";
import {Suspense, useEffect, useMemo, useState} from "react";
import wrapPromise from "@/utils/wrapPromise.js";
import {createChampionship, getChampionshipById, updateChampionship} from "@/services/championships.js";
import {ErrorFallback} from "@/components/ErrorFallback/index.jsx";
import {ChampionshipSuspense} from "@/pages/Championship/index.jsx";
import {ErrorBoundary} from "react-error-boundary";
import ContainerDiv from "@/components/Container/index.jsx";
import InputImage from "@/components/form/InputImage/index.jsx";
import CleanInput from "@/components/form/CleanInput/index.jsx";
import {FormTools} from "@/utils/formTools.js";
import {FaMapMarkerAlt} from "react-icons/fa";
import Select from "@/components/form/Select/index.jsx";
import TextArea from "@/components/form/TextArea/index.jsx";
import InputField from "@/components/form/Input/index.jsx";
import Button from "@/components/form/Button/index.jsx";
import {FaXmark} from "react-icons/fa6";
import DefaultModal from "@/components/Dialog/index.jsx";
import {toast} from "react-toastify";
import {v4 as uuidv4} from 'uuid';
import useGlobal from "@/hooks/useGlobal.js";

export default function FormCampeonato() {
    const {id} = useParams();
    const resource = useMemo(() => {
        if (!id) return null;
        return wrapPromise(getChampionshipById(id));
    }, [id]);

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<ChampionshipSuspense/>}>
                    <FormDetail resource={resource}/>
                </Suspense>
            </ErrorBoundary>
        </>
    )
}


export function FormDetail({resource}) {
    const {user} = useGlobal()
    const [form, setForm] = useState({
        title: "",
        description: "",
        public: "true",
        links: [],
        location: "",
        image: "",
    });
    const {handleChange} = new FormTools(form, setForm);
    const [newLink, setNewLink] = useState({label: "", url: ""});
    const [openLink, setOpenLink] = useState(false);
    const formToolsLink = new FormTools(newLink, setNewLink);
    const navigate = useNavigate();
    const result = resource ? resource.read() : {};
    const {championship, organizer} = result ?? {}
    let baseChampionship = {
        championship: {
            id: 1024,
            slug: "campeonato-municipal-feminino-2ed",
            title: "2º Campeonato Municipal de Futebol Feminino Amador",
            shortTitle: "Campeonato Municipal - 2ª Edição",
            subtitle: "7 e 8 de Dezembro",
            description: "Campeonato amador voltado para times femininos municipais. Formato mata-mata com premiação para as 3 primeiras colocadas.",
            format: "Mata Mata",
            status: "upcoming",
            public: false,
            startDate: "2025-12-07T08:00:00-03:00",
            endDate: "2025-12-08T18:00:00-03:00",
            coverImage: "https://ritmo-images.s3.amazonaws.com/images/Publicacoes/Noticia/8315.jpeg",
            gallery: [
                "https://www.futedelas.com.br/wp-content/uploads/2023/10/Futebol-Feminino-Jogadoras-2-scaled.jpg.webp",
                "https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/esportes/M.jpg"
            ],
            links: [
                {
                    label: "Comprar ingressos",
                    url: "https://ingressos.com.br/evento/1024"
                }
            ],
            location: {
                venue: "Clube - SindiGoiânia",
                address: "Rua Teste, 123, Goiânia, GO, Brasil",
                postalCode: "00000-000",
                coordinates: {
                    lat: -16.6789,
                    lng: -49.255
                }
            },
            capacity: 500,
            registrations: {
                teamsRegistered: 8,
                playersRegistered: 120,
                expectedAudience: 200
            },
            tickets: [
                {
                    type: "Entrada Geral",
                    price: 15.0,
                    currency: "BRL",
                    url: "https://ingressos.com.br/evento/1024/geral"
                }
            ],
            createdAt: "2025-09-20T10:15:00-03:00",
            updatedAt: "2025-09-25T09:00:00-03:00"
        },
        organizer: {
            id: 55,
            name: "SindiGoiânia",
            contactEmail: "contato@sindigoiania.org.br",
            logo: "https://www.futebolbh.com.br/portal/images/jmfem207%20(2).jpeg",
            website: "https://www.ecp.org.br/"
        }
    }
    useEffect(() => {
        if (championship) {
            setForm({
                title: championship.title,
                description: championship.description,
                public: championship.public ? "true" : "false",
                links: [...championship.links],
                location: championship.location.address,
                image: championship.coverImage,
            });
        }
    }, [championship]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!championship) {


            const newId = uuidv4();

            const createPayload = {
                ...baseChampionship,
                championship: {
                    ...baseChampionship.championship,
                    ...form,
                    id: newId,
                    public: form.public === "true" || form.public === true,

                    location: {
                        ...baseChampionship.championship.location,
                        address: form.location || baseChampionship.championship.location.address
                    },
                    coverImage: form.image || baseChampionship.championship.coverImage,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                organizer: {
                    ...baseChampionship.organizer,
                    id: user.id,
                    name: user.nome,
                    contactEmail: user.email,
                    logo: user.img ?? baseChampionship.organizer.logo
                }
            };

            createChampionship(createPayload);

        } else {

            const updatePayload = {
                championship: {
                    ...championship,
                    ...form,
                    id: championship.id,
                    public: form.public === "true" || form.public === true,
                    location: {
                        ...championship.location,
                        address: form.location ?? championship.location.address
                    },
                    coverImage: form.image || championship.coverImage,
                    updatedAt: new Date().toISOString()
                },
                organizer: {
                    ...organizer,
                    id: user.id,
                    name: user.nome,
                    contactEmail: user.email,
                    logo: user.img ?? organizer.logo
                }
            };


            updateChampionship(updatePayload, championship.id);
            toast.success(`Campeonato ${championship ? "atualizado" : "criado"} com sucesso!`);
            navigate("/dashboard/campeonatos")
        }
    }
    return (
        <>
            <form className={"w-full text-[var(--texto)]"} onSubmit={handleSubmit}>
                <ContainerDiv className={"w-full flex flex-col lg:flex-row gap-1 overflow-hidden"}>
                    <InputImage
                        adicionalStyle={{
                            margin: "0",
                            width: "100%",
                            background: "lightgrey",
                            borderRadius: 0,
                            aspectRatio: 16 / 9
                        }}
                        image={form.image}
                        setImage={(val) => setForm({...form, image: val})}
                    />
                    <div className="flex flex-col gap-3 items-start min-w-[400px] my-3 px-5">
                        <CleanInput
                            placeholder={"Titulo do campeonato"}
                            type="text"
                            id={"title"}
                            onChange={handleChange}
                            fontSize={"20px"}
                            className={"subtitle"}
                            value={form.title}
                        />
                        <CleanInput
                            id={"location"}
                            placeholder={"Endereço do campeonato"}
                            type="text"
                            value={form.location}
                            onChange={handleChange}
                            icon={<FaMapMarkerAlt/>}
                        />
                        <Select
                            label={"Privacidade do campeonato"}
                            value={form.public}
                            onChange={handleChange}
                            options={[
                                {
                                    label: "Público",
                                    id: "true"
                                },
                                {
                                    label: "Privado",
                                    id: "false"
                                },
                            ]}
                        />
                    </div>
                </ContainerDiv>
                <ContainerDiv className={"mt-5 p-3 px-5"}>
                    <h3 className="subtitle">Descrição</h3>
                    <TextArea
                        variant={"clean"}
                        id={"description"}
                        maxLength={500}
                        value={form.description}
                        placeholder={"Descrição do campeonato"}
                        type="text"
                        onChange={handleChange}
                        height={"150px"}
                    />
                    <div className="flex w-full gap-3 items-center justify-between">
                        <h3 className="subtitle">Links</h3>
                        <Button
                            variant={"primary"}
                            type={"button"}
                            onClick={() => {
                                setOpenLink(true)
                            }}
                        >
                            Adicionar novo link
                        </Button>
                    </div>

                    {form.links ? (
                        <>
                            <div className="flex flex-wrap gap-3 my-3">
                                {form.links.map((link, index) => (
                                    <div key={index}>
                                        <p className="link mb-2">
                                            {link.label}
                                        </p>
                                        <span
                                            className={"flex items-center gap-3 w-fit min-w-fit px-3 py-1 border border-[var(--secundaria)] text-[var(--secundaria)] rounded-md"}>
                                        {link.url}
                                            <FaXmark
                                                size={22}
                                                onClick={() => {
                                                    setForm((prev) => {
                                                        return {
                                                            ...prev,
                                                            links: prev.links.filter((l, i) => i !== index),
                                                        }
                                                    })
                                                }}/>

                                            </span>


                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="link my-8">Nenhum link encontrado...</p>
                        </>
                    )}
                    <h3 className="subtitle my-7">Organização do campeonato</h3>
                    <Select
                        wid
                        label={"Quantidade de time"}
                        value={form.public}
                        onChange={handleChange}
                        options={[
                            {
                                label: "16",
                                id: 16
                            }, {
                                label: "8",
                                id: 8
                            }, {
                                label: "4",
                                id: 4
                            },
                        ]}
                    />
                    <Button type={"submit"} variant={"primary"} margin={"1rem 0"} width={"100%"}>
                        {championship && championship.id ? "Salvar campeonato" : "Criar campeonato"}
                    </Button>
                </ContainerDiv>
            </form>
            <DefaultModal isOpen={openLink} onClose={() => setOpenLink(false)}
                          style={{maxWidth: "620px", color: "var(--texto)"}}>
                <h3 className="subtitle mb-10">
                    Adicionar link
                </h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setOpenLink(false);
                    setForm((prev) => {
                        return {
                            ...prev,
                            links: [...prev.links, newLink],
                        }
                    })
                }}>

                    <InputField
                        label={"Titulo do link"}
                        placeholder={"Digite o titulo do link"}
                        id={"label"}
                        type="text"
                        value={newLink.label}
                        onChange={(e) => formToolsLink.handleChange(e)}
                        required
                    />
                    <InputField
                        label={"URL do link"}
                        placeholder={"Digite o URL do link"}
                        type="text"
                        id={"url"}
                        value={newLink.url}
                        onChange={(e) => formToolsLink.handleChange(e)}
                        required
                    />
                    <Button type={"submit"} variant={"primary"} margin={"1rem 0"} width={"100%"}>
                        Salvar
                    </Button>
                </form>
            </DefaultModal>
        </>
    )
}

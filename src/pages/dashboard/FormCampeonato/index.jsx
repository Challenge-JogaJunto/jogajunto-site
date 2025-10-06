import {useParams} from "react-router-dom";
import {Suspense, useEffect, useMemo, useState} from "react";
import wrapPromise from "@/utils/wrapPromise.js";
import {getChampionshipById} from "@/services/championships.js";
import {ErrorFallback} from "@/components/ErrorFallback/index.jsx";
import {ChampionshipSuspense} from "@/pages/Championship/index.jsx";
import {ErrorBoundary} from "react-error-boundary";
import ContainerDiv from "@/components/Container/index.jsx";
import InputImage from "@/components/form/InputImage/index.jsx";
import CleanInput from "@/components/form/CleanInput/index.jsx";
import {FormTools} from "@/utils/formTools.js";
import {FaMapMarkerAlt} from "react-icons/fa";
import Select from "@/components/form/Select/index.jsx";

export default function FormCampeonato() {
    const {id} = useParams();
    const resource = useMemo(() => {
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
    const [form, setForm] = useState({title: "", description: ""});
    const {handleChange} = new FormTools()
    const championship = resource.read();
    useEffect(() => {
        if (resource) {

        }
    }, [championship]);

    return (
        <>
            <ContainerDiv className={"w-full flex flex-col lg:flex-row gap-3 overflow-hidden"}>
                <InputImage adicionalStyle={{
                    margin: "0",
                    width: "100%",
                    background: "lightgrey",
                    borderRadius: 0,
                    aspectRatio: 16 / 9
                }}
                />
                <div className="flex flex-col gap-3 items-start min-w-[400px] my-3 px-1">
                    <CleanInput placeholder={"Titulo do campeonato"} type="text" onChange={handleChange}
                                fontSize={"20px"} className={"subtitle"}/>
                    <CleanInput placeholder={"Endereço do campeonato"} type="text" onChange={handleChange}
                                icon={<FaMapMarkerAlt/>}/>
                    <Select
                        label={"Privacidade do campeonato"}
                        options={[
                            {
                                label: "Público",
                                id: "true"
                            },
                            {
                                label: "Privado",
                                id: "false"
                            },
                        ]}/>


                </div>
            </ContainerDiv>
        </>
    )
}

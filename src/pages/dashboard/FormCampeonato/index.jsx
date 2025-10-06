import {useParams} from "react-router-dom";
import {Suspense, useMemo, useState} from "react";
import wrapPromise from "@/utils/wrapPromise.js";
import {getChampionshipById} from "@/services/championships.js";
import {ErrorFallback} from "@/components/ErrorFallback/index.jsx";
import {ChampionshipSuspense} from "@/pages/Championship/index.jsx";
import {ErrorBoundary} from "react-error-boundary";

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
    const [form, setForm] = useState({});


    return (
        <>

        </>
    )
}

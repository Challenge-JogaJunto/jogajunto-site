import {useParams} from "react-router-dom";
import {Suspense, useMemo} from "react";
import {getChampionshipById} from "@/services/championships.js";
import wrapPromise from "@/utils/wrapPromise.js";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "@/components/ErrorFallback/index.jsx";
import ContainerDiv from "@/components/Container/index.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";

export default function Championship() {
    const {id} = useParams();
    const resource = useMemo(() => {
        return wrapPromise(getChampionshipById(id));
    }, [id]);

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<ChampionshipSuspense/>}>
                    <ChampionshipDetails resource={resource}/>
                </Suspense>
            </ErrorBoundary>
        </>
    )
}


function ChampionshipDetails({resource}) {
    const championship = resource.read()

    if (!championship) {
        return (
            <h2 className="subtitle">
                Campeonato não encontrado!
            </h2>
        )
    }
    return (
        <>
            olá
        </>
    )
}


function ChampionshipSuspense() {
    return (
        <>
            <ContainerDiv className={"flex "}>
                <Skeleton className={"w-full aspect-video"}/>
                <div className="w-full flex flex-col gap-3 max-w-[550px] py-5 px-8">
                    <Skeleton className={"w-full p-3 h-5 rounded-sm"}/>
                    <Skeleton className={"w-[320px] p-2 h-1 rounded-sm mt-10"}/>
                    <Skeleton className={"w-[320px] p-2 h-1 rounded-sm"}/>
                    <Skeleton className={"w-[320px] p-2 h-1 rounded-sm"}/>
                    <Skeleton className={"w-full p-4 h-1 rounded-sm mt-auto"}/>

                </div>

            </ContainerDiv>
        </>
    )
}
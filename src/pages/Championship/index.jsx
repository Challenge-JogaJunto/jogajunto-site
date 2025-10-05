import {useParams} from "react-router-dom";
import {Suspense, useMemo} from "react";
import {getChampionshipById} from "@/services/championships.js";
import wrapPromise from "@/utils/wrapPromise.js";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "@/components/ErrorFallback/index.jsx";
import ContainerDiv from "@/components/Container/index.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import Button from "@/components/Button/index.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";

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
    return (
        <>
            <ContainerDiv className={"grid grid-cols-1 md:grid-cols-2  relative text-[var(--texto)] overflow-hidden"}>
                <img src={championship.championship.coverImage} alt={"Imagem de capa do campeonato"}
                     className={"w-full aspect-video"}/>
                <div className="w-full flex flex-col gap-3 py-5 px-8 h-fill">
                    <h1 className="subtitle">{championship.championship.title}</h1>
                    <ul className={"list-none flex flex-col gap-3"}>
                        <li>
                            <p className="text">
                                Formato <span
                                className={"font-bold text-[var(--primaria)]"}>{championship.championship.format}</span>
                            </p>
                        </li>
                        <li>
                            <p className="text">
                                <span
                                    className={"font-bold text-[var(--primaria)]"}>{championship.championship.registrations.expectedAudience} </span>
                                pessoas irão comparecer
                            </p>
                        </li>
                        <li>
                            <p className="text">
                                <span
                                    className={"font-bold text-[var(--primaria)]"}>{championship.championship.registrations.playersRegistered} </span>
                                jogadoras participarão
                            </p>
                        </li>
                        <li>
                            <p className="text">
                                Endereço:
                                <span
                                    className={"font-bold text-[var(--primaria)]"}> {championship.championship.location.address} </span>

                            </p>
                        </li>

                    </ul>
                    <Button styleClass={"w-full rounded-sm mt-auto"}>
                        Comparecer
                    </Button>

                </div>

            </ContainerDiv>
            <div className="flex flex-col-reverse md:flex-row mt-10 gap-5">
                <ContainerDiv className={"w-full py-5 px-8 text-[var(--texto)]"}>
                    <Tabs defaultValue="geral" className="w-full">
                        <TabsList className={"bg-[var(--primaria)]"}>
                            <TabsTrigger value="geral">Visão geral</TabsTrigger>
                            <TabsTrigger value="partidas">Partidas</TabsTrigger>
                            {/*<TabsTrigger value="classificacao">Classificação</TabsTrigger>*/}
                            <TabsTrigger value="jogadoras">Jogadoras</TabsTrigger>
                        </TabsList>
                        <TabsContent value={"geral"}>
                            <h3 className="subtitle mt-8 mb-3">Visão geral</h3>
                            <p className="text">{championship.championship.description}</p>
                            {championship.championship.links && championship.championship.links.length > 0 && (
                                <>
                                    <h3 className="subtitle mt-8 mb-3">Links</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {championship.championship.links.map((link) => (
                                            <a href={link.url}
                                               className={"px-3 py-1 border border-[var(--secundaria)] text-[var(--secundaria)] rounded-md"}>{link.label}</a>
                                        ))}
                                    </div>
                                </>
                            )}
                        </TabsContent>
                        <TabsContent value={"partidas"}>
                            Partidas
                        </TabsContent>
                        {/*<TabsContent value={"classificacao"}>*/}
                        {/*    Classificação*/}
                        {/*</TabsContent>*/}
                    </Tabs>

                </ContainerDiv>
                <ContainerDiv className={"w-fit py-5 px-8 text-[var(--texto)]"}>
                    <div className="flex-col gap-5 items-center justify-center hidden xl:flex ">
                        <img src={championship.organizer.logo} alt="Logo do organizador"
                             className={"min-w-[200px] max-w-[200px] aspect-ratio--1x1 rounded-full overflow-hidden"}/>
                        <p className="link">
                            {championship.organizer.name}
                        </p>

                    </div>
                </ContainerDiv>
            </div>

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
import {useNavigate, useParams} from "react-router-dom";
import {Suspense, useMemo, useState} from "react";
import {getChampionshipById} from "@/services/championships.js";
import wrapPromise from "@/utils/wrapPromise.js";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "@/components/ErrorFallback/index.jsx";
import ContainerDiv from "@/components/Container/index.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import Button from "@/components/Button/index.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import DefaultModal from "@/components/Dialog/index.jsx";
import Teams from "@/pages/dashboard/GestaoCampeonato/Teams.jsx";
import Players from "@/pages/dashboard/GestaoCampeonato/Players.jsx";
import Games from "@/pages/dashboard/GestaoCampeonato/Games.jsx";

export default function GestaoCampeonato() {
    const {id} = useParams();
    const resource = useMemo(() => wrapPromise(getChampionshipById(id)), [id]);

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<GestaoCampeonatoSuspense/>}>
                <GestaoCampeonatoDetails resource={resource}/>
            </Suspense>
        </ErrorBoundary>
    );
}

function GestaoCampeonatoDetails({resource}) {
    const championship = resource.read();

    const navigate = useNavigate();


    return (
        <div className="w-full">
            <ContainerDiv className="grid grid-cols-1 md:grid-cols-2 relative text-[var(--texto)] overflow-hidden">
                <img
                    src={championship.championship.coverImage}
                    alt="Imagem de capa do campeonato"
                    className="w-full aspect-video"
                />
                <div className="w-full flex flex-col gap-3 py-5 px-8 h-fill">
                    <h1 className="subtitle">{championship.championship.title}</h1>
                    <ul className="list-none flex flex-col gap-3">
                        <li>
                            <p className="text">
                                Formato{" "}
                                <span className="font-bold text-[var(--primaria)]">
                  {championship.championship.format}
                </span>
                            </p>
                        </li>
                        <li>
                            <p className="text">
                <span className="font-bold text-[var(--primaria)]">
                  {championship.championship.registrations.expectedAudience}{" "}
                </span>
                                pessoas irão comparecer
                            </p>
                        </li>
                        <li>
                            <p className="text">
                <span className="font-bold text-[var(--primaria)]">
                  {championship.championship.registrations.playersRegistered}{" "}
                </span>
                                jogadoras participarão
                            </p>
                        </li>
                        <li>
                            <p className="text">
                                Endereço:{" "}
                                <span className="font-bold text-[var(--primaria)]">
                  {championship.championship.location.address}
                </span>
                            </p>
                        </li>
                    </ul>
                    <Button styleClass="w-full rounded-sm mt-auto"
                            onClick={() => navigate(`/dashboard/form-campeonato/${championship.championship.id}`)}>Editar
                        campeonato
                    </Button>
                </div>
            </ContainerDiv>

            <div className="flex flex-col-reverse md:flex-row mt-10 gap-5">
                <ContainerDiv className="w-full py-5 px-8 text-[var(--texto)]">
                    <Tabs defaultValue="geral" className="w-full">
                        <TabsList className="bg-[var(--primaria)]">
                            <TabsTrigger value="geral">Equipe</TabsTrigger>
                            <TabsTrigger value="partidas">Partidas</TabsTrigger>
                            <TabsTrigger value="jogadoras">Jogadoras</TabsTrigger>
                        </TabsList>

                        <TabsContent value="geral">
                            <Teams championship={championship}/>
                        </TabsContent>
                        <TabsContent value="partidas">
                            <Games championship={championship}/>
                        </TabsContent>
                        <TabsContent value="jogadoras">
                            <Players championship={championship}/>
                        </TabsContent>
                    </Tabs>
                </ContainerDiv>
            </div>


        </div>
    );
}

export function GestaoCampeonatoSuspense() {
    return (
        <ContainerDiv className="flex">
            <Skeleton className="w-full aspect-video"/>
            <div className="w-full flex flex-col gap-3 max-w-[550px] py-5 px-8">
                <Skeleton className="w-full p-3 h-5 rounded-sm"/>
                <Skeleton className="w-[320px] p-2 h-1 rounded-sm mt-10"/>
                <Skeleton className="w-[320px] p-2 h-1 rounded-sm"/>
                <Skeleton className="w-[320px] p-2 h-1 rounded-sm"/>
                <Skeleton className="w-full p-4 h-1 rounded-sm mt-auto"/>
            </div>
        </ContainerDiv>
    );
}

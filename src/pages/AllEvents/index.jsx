import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import {useEffect, useState} from "react";
import {getChampionships} from "@/services/championships.js";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import ChampionshipBannerCard from "@/components/cards/BannerCard/index.jsx";
import EventCard from "@/components/cards/EventCard/index.jsx";

export default function AllEvents() {
    const [championShips, setChampionShips] = useState([]);
    const fetchChampionShips = async () => {
        const response = await getChampionships();
        setChampionShips(response)
    }
    useEffect(() => {
        fetchChampionShips();
    }, [])
    return (
        <>
            <Carousel className="max-w-full mb-10">
                <CarouselContent>
                    {
                        championShips &&
                        championShips.map((championShip, index) => {
                            if (index < 3) {
                                return (
                                    <CarouselItem key={`${index}-${championShip.id}`}>
                                        <ChampionshipBannerCard championship={championShip}/>
                                    </CarouselItem>
                                )
                            }
                        })
                    }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>

            <Tabs defaultValue="campeonatos" className="w-full">
                <TabsList className={"bg-[var(--primaria)]"}>
                    <TabsTrigger value="campeonatos">Campeonatos</TabsTrigger>
                    <TabsTrigger value="eventos">Eventos</TabsTrigger>
                    <TabsTrigger value="peneiras">Peneiras</TabsTrigger>
                </TabsList>
                <TabsContent value="campeonatos"
                             className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">

                    {
                        (championShips && championShips.length > 0) ? championShips.map((championShip) => (
                            <>
                                <EventCard
                                    key={championShip.id}
                                    title={championShip.championship.title}
                                    img={championShip.championship.coverImage}
                                    description={championShip.championship.description}
                                    address={championShip.championship.location.address}
                                    date={championShip.championship.startDate}
                                />
                            </>
                        )) : (
                            <>
                                <p className="link">
                                    Nenhum campeonato encontrado!
                                </p>
                            </>
                        )
                    }
                </TabsContent>
                <TabsContent value="eventos"
                             className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">

                </TabsContent>
                <TabsContent value="peneiras"
                             className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">

                </TabsContent>
            </Tabs>
        </>
    )
}

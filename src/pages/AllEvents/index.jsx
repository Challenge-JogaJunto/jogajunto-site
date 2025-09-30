import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import {useEffect, useState} from "react";
import {getChampionships} from "@/services/championships.js";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";

export default function AllEvents() {
    const [championShips, setChampionShips] = useState([]);
    const fetchChampionShips = async () => {
        const response = await getChampionships();
        console.log(response);
        setChampionShips(response)
    }
    useEffect(() => {
        fetchChampionShips();
    }, [])
    return (
        <>
            <Carousel className="w-full">
                <CarouselContent>

                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>

            <Tabs defaultValue="campeonatos" className="w-full">
                <TabsList>
                    <TabsTrigger value="campeonatos">Campeonatos</TabsTrigger>
                    <TabsTrigger value="eventos">Eventos</TabsTrigger>
                    <TabsTrigger value="peneiras">Peneiras</TabsTrigger>
                </TabsList>
                <TabsContent value="campeonatos">
                    {
                        (championShips && championShips.length > 0) ? championShips.map((championShip) => (
                            <div>{championShip.championship.title}</div>
                        )) : (
                            <>
                                <p className="link">
                                    Nenhum campeonato encontrado!
                                </p>
                            </>
                        )
                    }
                </TabsContent>
                <TabsContent value="eventos">

                </TabsContent>
                <TabsContent value="peneiras">

                </TabsContent>
            </Tabs>
        </>
    )
}

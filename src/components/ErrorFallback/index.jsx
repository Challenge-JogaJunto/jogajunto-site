import React from 'react';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.jsx";
import {Terminal} from "lucide-react";
import {Link} from "react-router-dom";
import Button from "@/components/Button/index.jsx";

export function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <Alert className={"w-fit mx-auto border border-[var(--borda-container)] p-10"}>
            <AlertDescription className={"flex flex-col items-center text-center gap-10"}>
                <h2 className={"subtitle w-full "}>{error.message}</h2>
                <p className="text">Parece que algo deu errado! Tente novamente mais tarde.</p>
                <Link to={"/"}>
                    <Button>
                        Voltar para o inicio
                    </Button>
                </Link>
            </AlertDescription>
        </Alert>
    );
}

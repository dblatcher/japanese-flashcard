'use client'
import { SpeechProvider } from "@/context/speechContext";
import React from "react";
import { CharacterGame } from "./CharacterGame";


export const CharacterGameMeta: React.FunctionComponent = () => {

    return <SpeechProvider>
        <CharacterGame />
    </SpeechProvider>
}
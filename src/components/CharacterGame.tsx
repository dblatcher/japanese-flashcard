'use client'
import { Box } from "@mui/material";
import React from "react";
import { TalkingTile } from "./TalkingTile";
import { SpeechProvider } from "@/context/speechContext";

export const CharacterGame: React.FunctionComponent = () => {

    return <article>game
        <SpeechProvider>
            <Box>
                <TalkingTile identifier="NI" />
                <TalkingTile identifier="WA" />
            </Box>
        </SpeechProvider>
    </article>
}
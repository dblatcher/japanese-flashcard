'use client'
import { SpeechProvider } from "@/context/speechContext";
import React, { useState } from "react";
import { CharacterGame } from "./CharacterGame";
import { HIRAGANA } from "@/lib/language/hiragana";
import { ConstanentPicker } from "./ConstanentPicker";
import { Box, TextField } from "@mui/material";


export const CharacterGameMeta: React.FunctionComponent = () => {

    const [constanents, setConstanents] = useState<string[]>(HIRAGANA.constanents)
    const [roundsPerGame, setRoundPerGame] = useState<number>(3)

    return <SpeechProvider>
        <Box>
            <ConstanentPicker {...{ constanents, setConstanents }} options={HIRAGANA.constanents} />
            <TextField label="rounds per game" value={roundsPerGame} type="number" onChange={(event) => {
                const numberValue = Number(event.target.value)
                if (isNaN(numberValue)) {
                    return
                }
                setRoundPerGame(Math.floor(numberValue))
            }} />
            <CharacterGame constanents={constanents} roundsPerGame={roundsPerGame} />
        </Box>
    </SpeechProvider>
}
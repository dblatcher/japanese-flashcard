'use client'
import { SpeechProvider } from "@/context/speechContext";
import React, { useState } from "react";
import { CharacterGame } from "./CharacterGame";
import { HIRAGANA } from "@/lib/language/hiragana";
import { ConstanentPicker } from "./ConstanentPicker";
import { Box } from "@mui/material";


export const CharacterGameMeta: React.FunctionComponent = () => {

    const [constanents, setConstanents] = useState<string[]>(HIRAGANA.constanents)

    return <SpeechProvider>
        <Box>
            <ConstanentPicker {...{ constanents, setConstanents }} options={HIRAGANA.constanents} />
            <CharacterGame constanents={constanents} />
        </Box>
    </SpeechProvider>
}
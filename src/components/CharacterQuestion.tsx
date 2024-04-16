'use client'
import { Character } from "@/lib/language/character";
import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SyllableCard } from "./SyllableCard";

type Props = {
    character: Character
    title?: string
    submit: { (answer: string): void }
}

export const CharacterQuestion: React.FunctionComponent<Props> = ({ title = "what sound is this?", character, submit }) => {

    const [guess, setGuess] = useState("")

    return (
        <Box sx={{
            padding: 1,
        }} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={1}>
            <Typography textAlign={'center'}>{title}</Typography>
            <SyllableCard size="large" character={character} noCaption />

            <TextField value={guess}
                variant="outlined"
                onChange={(event) => {
                    setGuess(event.target.value.trim().toUpperCase().substring(0, 3))
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault()
                        submit(guess)
                        setGuess("")
                    }
                }} />
        </Box>

    )
}
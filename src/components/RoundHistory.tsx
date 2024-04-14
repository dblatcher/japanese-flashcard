'use client'
import { Character } from "@/lib/language/character";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { SyllableCard } from "./SyllableCard";

type Round = {
    character: Character
    answer: string
    correct: boolean
}

interface Props {
    rounds: Round[]
}

export const RoundHistory: React.FunctionComponent<Props> = ({ rounds }) => {

    return (
        <Grid container spacing={.5}>
            {[...rounds].reverse().map((round, index) => (
                <Grid item xs={6} sm={4}
                    key={index}
                >
                    <Stack
                        direction={'row'}
                        gap={1}
                        alignItems={'center'}
                        sx={{
                            color: round.correct ? 'success.contrastText' : 'error.contrastText',
                            padding: .5,
                            backgroundColor: round.correct ? 'success.main' : 'error.main',
                        }}>
                        <SyllableCard character={round.character} size="small" noCaption />
                        <Typography>{round.character.identifier}</Typography>

                        {!round.correct && (
                            <Typography component={'s'}>{round.answer}</Typography>
                        )}

                    </Stack>
                </Grid>
            ))}
        </Grid>)
}
'use client'
import { SpeechProvider } from "@/context/speechContext";
import { Character } from "@/lib/language/character";
import { HIRAGANA } from "@/lib/language/hiragana";
import { Box, Grid, Typography, Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CharacterQuestion } from "./CharacterQuestion";
import { RoundHistory } from "./RoundHistory";

type Round = {
    character: Character
    answer: string
    correct: boolean
}

export const CharacterGame: React.FunctionComponent = () => {

    const [rounds, setRounds] = useState<Round[]>([])
    const [character, setCharacter] = useState<Character | undefined>(undefined)
    const [initialised, setInitalised] = useState(false)

    const reset = () => {
        console.log('reset')
        setRounds([])
        setCharacter(HIRAGANA.random(() => true))
    }

    const handleSubmit = (guess: string) => {
        if (!character || !guess) {
            return
        }
        const answer = guess.trim().toUpperCase()
        const correct = answer === character.identifier
        setRounds([...rounds, {
            character, answer, correct
        }])
        setCharacter(HIRAGANA.random((nextCharacter) => nextCharacter.identifier !== character.identifier))
    }

    useEffect(() => {
        if (initialised) {
            return
        }
        setInitalised(true)
        reset()
    }, [setInitalised])

    const numberRight = rounds.filter(round => round.correct).length
    const previousRound = rounds.length ? rounds[rounds.length - 1] : undefined

    return <SpeechProvider>
        <Box>
            <Button onClick={reset}>restart</Button>
            <Grid container spacing={1}>
                <Grid item xs={6} >
                    <Box>
                        {character ?
                            <CharacterQuestion
                                title={`Round #${rounds.length + 1}`}
                                character={character}
                                submit={handleSubmit} />

                            : <Skeleton height={180} width={'100%'} component={'div'} />
                        }
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <Box>
                        {previousRound && (
                            <Typography>
                                {previousRound.correct ? 'CORRECT! ' : `WRONG! `}
                                {previousRound.character.string} is "{previousRound.character.identifier}"
                            </Typography>
                        )}
                        <Typography>
                            SCORE:  {numberRight} / {rounds.length}
                        </Typography>

                        <RoundHistory rounds={rounds} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </SpeechProvider>
}
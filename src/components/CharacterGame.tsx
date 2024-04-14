'use client'
import { Box, Card, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SpeechProvider } from "@/context/speechContext";
import { Character } from "@/lib/language/character";
import { HIRAGANA } from "@/lib/language/hiragana";
import { SyllableCard } from "./SyllableCard";
import { GuessAndAnswer } from "./GuessAndAnswer";

type Round = {
    character: Character
    answer: string
    correct: boolean
}



export const CharacterGame: React.FunctionComponent = () => {

    const [rounds, setRounds] = useState<Round[]>([])
    const [character, setCharacter] = useState<Character | undefined>(undefined)
    const [initialised, setInitalised] = useState(false)
    const [guess, setGuess] = useState("")

    const reset = () => {
        console.log('reset')
        setRounds([])
        setCharacter(HIRAGANA.random(() => true))
    }

    const handleSubmit = () => {
        if (!character || !guess) {
            return
        }
        const answer = guess.trim().toUpperCase()
        const correct = answer === character.identifier
        console.log({ guess, answer, correct })
        setRounds([...rounds, {
            character, answer, correct
        }])
        setCharacter(HIRAGANA.random((nextCharacter) => nextCharacter.identifier !== character.identifier))
        setGuess("")
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

    return <article>
        <SpeechProvider>
            <Grid container spacing={1}>
                <Grid item xs={6} >
                    <Box>
                        <Box component={Card} marginBottom={2} sx={{
                            padding: 1,
                            backgroundColor: 'primary.light'
                        }}>

                            <Typography>Round #{rounds.length + 1}</Typography>
                            <Typography>What is this?</Typography>
                            {character &&
                                <SyllableCard character={character} noCaption />
                            }

                            <TextField value={guess} onChange={(event) => {
                                setGuess(event.target.value.trim().toUpperCase())
                            }} onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    handleSubmit()
                                }
                            }} />
                        </Box>

                        {previousRound && (
                            <Box>
                                <Typography>
                                    {previousRound.correct ? 'CORRECT' : 'WRONG'}
                                </Typography>
                                <GuessAndAnswer answer={previousRound.answer} rightAnswer={previousRound.character.identifier} />
                            </Box>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <Box>
                        <Typography>
                            SCORE:  {numberRight} / {rounds.length}
                        </Typography>
                        {[...rounds].reverse().map((round, index) => (
                            <Stack direction={'row'} key={index} gap={1} marginBottom={.5} alignItems={'center'}
                                sx={{
                                    borderColor: round.correct ? 'success.main' : 'error.main',
                                    borderWidth: 2,
                                    borderStyle: 'solid',
                                }}>
                                <SyllableCard character={round.character} size="small" noCaption />
                                <GuessAndAnswer rightAnswer={round.character.identifier} answer={round.answer} />
                            </Stack>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </SpeechProvider>
    </article>
}
'use client'
import { useSpeech } from "@/context/speechContext";
import { Character } from "@/lib/language/character";
import { HIRAGANA } from "@/lib/language/hiragana";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CharacterQuestion } from "./CharacterQuestion";
import { ConstanentPicker } from "./ConstanentPicker";
import { RoundHistory } from "./RoundHistory";

type Round = {
    character: Character
    answer: string
    correct: boolean
}

export const CharacterGame: React.FunctionComponent = () => {

    const [rounds, setRounds] = useState<Round[]>([])
    const [character, setCharacter] = useState<Character | undefined>(undefined)
    const [constanents, setConstanents] = useState<string[]>(HIRAGANA.constanents)
    const [initialised, setInitalised] = useState(false)

    const { pronounce } = useSpeech()

    const filterFunction = (possibleCharacter: Character) => {
        if (possibleCharacter.identifier === character?.identifier) {
            return false
        }

        // treat none as 'vowels only'
        if (constanents.length === 0) {
            return possibleCharacter.constanent === ""
        }

        return constanents.includes(possibleCharacter.constanent)
    }

    const reset = () => {
        console.log('reset')
        setRounds([])
        setCharacter(undefined)
    }

    const start = () => {
        setCharacter(HIRAGANA.random(filterFunction))
    }

    const handleSubmit = (guess: string) => {
        if (!character || !guess) {
            return
        }
        const answer = guess.trim().toUpperCase()
        const correct = answer === character.phonetic
        pronounce(character)
        setRounds([...rounds, {
            character, answer, correct
        }])
        setCharacter(HIRAGANA.random(filterFunction))
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

    const setConstanentsAndReset = (value: string[]) => {
        setConstanents(value)
        reset()
    }

    return <Box>
        <Button onClick={reset}>reset</Button>
        <ConstanentPicker {...{ constanents, setConstanents: setConstanentsAndReset }} options={HIRAGANA.constanents} />
        <Grid container spacing={1}>
            <Grid item xs={6} >
                <Box>
                    {character ?
                        <CharacterQuestion
                            title={`Round #${rounds.length + 1}`}
                            character={character}
                            submit={handleSubmit} />

                        :
                        <Box display={'flex'} padding={1} minHeight={100}>
                            <Button
                                onClick={start}
                                sx={{ flex: 1 }}
                                variant="contained">start</Button>
                        </Box>
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
}
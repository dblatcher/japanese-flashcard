'use client'
import { useSpeech } from "@/context/speechContext";
import { Character } from "@/lib/language/character";
import { HIRAGANA } from "@/lib/language/hiragana";
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CharacterQuestion } from "./CharacterQuestion";
import { RoundHistory } from "./RoundHistory";

interface Props {
    constanents: string[];
    roundsPerGame?: number;
}

type Round = {
    character: Character
    answer: string
    correct: boolean
}

export const CharacterGame: React.FunctionComponent<Props> = ({ constanents, roundsPerGame }) => {

    useEffect(() => {
        reset()
    }, [constanents, roundsPerGame])

    const [rounds, setRounds] = useState<Round[]>([])
    const [character, setCharacter] = useState<Character | undefined>(undefined)

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
        const answer = guess
        const correct = answer === character.phonetic
        pronounce(character)

        const updatedRounds = [...rounds, {
            character, answer, correct
        }]

        setRounds(updatedRounds)

        const hasNextRound = typeof roundsPerGame === 'undefined' ? true : updatedRounds.length < roundsPerGame
        if (hasNextRound) {
            setCharacter(HIRAGANA.random(filterFunction))
        } else {
            setCharacter(undefined)
        }
    }

    const hasFinished = !!(roundsPerGame && rounds.length >= roundsPerGame)
    const numberRight = rounds.filter(round => round.correct).length
    const previousRound = rounds.length ? rounds[rounds.length - 1] : undefined


    return <Box>
        <Box display={'flex'} justifyContent={'space-between'} gap={1}>
            <Typography component="span">
                SCORE:  {numberRight} / {rounds.length}
            </Typography>
            <Typography component="span">
                round:  {rounds.length} / {roundsPerGame}
            </Typography>
        </Box>
        <Box>
            {character ?
                <CharacterQuestion
                    title={`Round #${rounds.length + 1}`}
                    character={character}
                    submit={handleSubmit} />

                :
                <Box display={'flex'} padding={1} minHeight={100} justifyContent={'center'}>
                    <Button
                        onClick={start}
                        sx={{ flexBasis: 300 }}
                        variant="contained">start</Button>
                </Box>
            }

            {previousRound && (
                <Typography>
                    {previousRound.correct ? 'CORRECT! ' : `WRONG! `}
                    {previousRound.character.string} is "{previousRound.character.identifier}"
                </Typography>
            )}
        </Box>


        <Dialog
            fullWidth
            open={hasFinished}
            onClose={reset} >
            <DialogContent>
                <RoundHistory rounds={rounds} />
            </DialogContent>
            <DialogActions>
                <Button onClick={reset}>new game</Button>
            </DialogActions>
        </Dialog>
    </Box>
}
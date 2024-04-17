'use client'
import { useSpeech } from "@/context/speechContext";
import { Character } from "@/lib/language/character";
import { HIRAGANA } from "@/lib/language/hiragana";
import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, Typography, Zoom } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CharacterInput } from "./CharacterInput";
import { RoundHistory } from "./RoundHistory";
import { SyllableCard } from "./SyllableCard";
import { TransitionIn } from "./TransitionIn";

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
    const [rounds, setRounds] = useState<Round[]>([])
    const [character, setCharacter] = useState<Character | undefined>(undefined)

    useEffect(() => {
        reset()
    }, [constanents, roundsPerGame])


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

    const characterToDisplay = character ?? previousRound?.character

    const answerFeedback = previousRound ? <>
        {previousRound.correct ? 'CORRECT! ' : `WRONG! `}
        {previousRound.character.string} is "{previousRound.character.phonetic}"
    </> : undefined

    return <Box display={'flex'} minHeight={100} justifyContent={'center'} >

        {!characterToDisplay && (
            <Box>
                <Button
                    onClick={start}
                    sx={{ minWidth: 250, minHeight: 150 }}
                    variant="contained">start</Button>
            </Box>
        )}
        {characterToDisplay &&
            <Box
                sx={{
                    minWidth: 300,
                    maxWidth: '100%',
                }}>
                <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                    <Typography component="span">
                        SCORE:  {numberRight} / {rounds.length}
                    </Typography>
                    <Typography component="span">
                        round:  {rounds.length + 1} / {roundsPerGame}
                    </Typography>
                </Box>
                <Box sx={{
                    padding: 1,
                }} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={1}>
                    <TransitionIn key={characterToDisplay.identifier} timeout={500} Transition={Zoom}>
                        <SyllableCard size="large" character={characterToDisplay} noCaption />
                    </TransitionIn>
                    <CharacterInput submit={handleSubmit} />
                </Box>
                <Box minHeight={'1.5em'} maxHeight={'1.5em'}>
                    <TransitionIn key={rounds.length} timeout={500} Transition={Collapse} orientation='horizontal'>
                        <Typography sx={
                            { maxHeight: '1.5em', }
                        }>
                            {answerFeedback}
                        </Typography>
                    </TransitionIn>
                </Box>
            </Box>
        }

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
'use client'
import { useSpeech } from "@/context/speechContext";
import { Round, getCharacterForNextRound } from "@/lib/game-logic";
import { Character } from "@/lib/language/character";
import { Box, Button, Dialog, DialogActions, DialogContent, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AnswerFeedback } from "./AnswerFeedback";
import { CharacterInput } from "./CharacterInput";
import { RoundHistory } from "./RoundHistory";
import { ScoreLine } from "./ScoreLine";
import { SyllableCard } from "../SyllableCard";
import { TransitionIn } from "../TransitionIn";
import { FullHeightBox } from "../layout/FullHeightBox";

interface Props {
    hiraganaConstanents: string[];
    katakanaConstanents: string[];
    roundsPerGame?: number;
}


export const CharacterGame: React.FunctionComponent<Props> = ({ hiraganaConstanents, katakanaConstanents, roundsPerGame }) => {
    const [rounds, setRounds] = useState<Round[]>([])
    const [character, setCharacter] = useState<Character | undefined>(undefined)
    const { pronounce } = useSpeech()

    const reset = () => {
        setRounds([])
        setCharacter(undefined)
    }

    useEffect(reset, [hiraganaConstanents, katakanaConstanents, roundsPerGame])

    const start = () => {
        setCharacter(getCharacterForNextRound([], hiraganaConstanents, katakanaConstanents))
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
            setCharacter(getCharacterForNextRound(updatedRounds, hiraganaConstanents, katakanaConstanents))
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
        {previousRound.character.string} is &ldquo;{previousRound.character.phonetic}&rdquo;
    </> : undefined

    return <FullHeightBox alignItems={'center'} width={'100%'} justifyContent={'center'}>

        {!characterToDisplay && (
            <Button
                onClick={start}
                sx={{ minWidth: 250, minHeight: 150 }}
                variant="contained">start character test</Button>
        )}
        {characterToDisplay &&
            <Box
                component={'article'}
                sx={{
                    minWidth: 350,
                    maxWidth: '100%',
                }}>

                <ScoreLine
                    roundsCorrect={numberRight}
                    roundsPlayed={rounds.length}
                    roundsPerGame={roundsPerGame} />
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    gap={1}
                    padding={1}>
                    <TransitionIn key={characterToDisplay.identifier} timeout={500} Transition={Zoom}>
                        <SyllableCard size="large" character={characterToDisplay} noCaption />
                    </TransitionIn>
                    <CharacterInput submit={handleSubmit} />
                </Box>
                <AnswerFeedback
                    content={answerFeedback}
                    transitionKey={rounds.length}
                    success={previousRound?.correct} />
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
    </FullHeightBox>
}
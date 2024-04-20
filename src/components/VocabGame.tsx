'use client'
import { useSpeech } from "@/context/speechContext";
import { VocabRound, getWordForNextRound } from "@/lib/game-logic";
import { Word } from "@/lib/language/word";
import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, Typography, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CharacterInput } from "./CharacterInput";
import { ScoreLine } from "./ScoreLine";
import { TransitionIn } from "./TransitionIn";
import { WordCard } from "./WordCard";

interface Props {
    roundsPerGame?: number;
}


export const VocabGame: React.FunctionComponent<Props> = ({ roundsPerGame }) => {
    const [rounds, setRounds] = useState<VocabRound[]>([])
    const [word, setWord] = useState<Word | undefined>(undefined)
    const { } = useSpeech()

    const reset = () => {
        setRounds([])
        setWord(undefined)
    }

    useEffect(reset, [roundsPerGame])

    const start = () => {
        setWord(getWordForNextRound([]))
    }

    const handleSubmit = (guess: string) => {
        if (!word || !guess) {
            return
        }
        const answer = guess
        const correct = answer === word.translation

        const updatedRounds = [...rounds, {
            word, answer, correct
        }]

        setRounds(updatedRounds)

        const hasNextRound = typeof roundsPerGame === 'undefined' ? true : updatedRounds.length < roundsPerGame
        if (hasNextRound) {
            setWord(getWordForNextRound(rounds))
        } else {
            setWord(undefined)
        }
    }

    const hasFinished = !!(roundsPerGame && rounds.length >= roundsPerGame)
    const numberRight = rounds.filter(round => round.correct).length
    const previousRound = rounds.length ? rounds[rounds.length - 1] : undefined
    const wordToDisplay = word ?? previousRound?.word

    const answerFeedback = previousRound ? <>
        {previousRound.correct ? 'CORRECT! ' : `WRONG! `}
        {previousRound.word.write()} is "{previousRound.word.translation}"
    </> : undefined

    const answerBackground = previousRound?.correct ? 'success.light' : 'error.light';

    return <Box display={'flex'} minHeight={100} justifyContent={'center'} >

        {!wordToDisplay && (
            <Box>
                <Button
                    onClick={start}
                    sx={{ minWidth: 250, minHeight: 150 }}
                    variant="contained">start</Button>
            </Box>
        )}
        {wordToDisplay &&
            <Box
                sx={{
                    minWidth: 300,
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
                    <TransitionIn key={wordToDisplay.text} timeout={500} Transition={Zoom}>
                        <WordCard size="large" word={wordToDisplay} noCaption />
                    </TransitionIn>
                    <CharacterInput submit={handleSubmit} isFor="word" />
                </Box>
                <Box minHeight={'1.5em'} maxHeight={'1.5em'}>
                    <TransitionIn key={rounds.length} timeout={500} Transition={Collapse} orientation='horizontal'>
                        <Typography sx={{ maxHeight: '1.5em', backgroundColor: answerBackground }}>
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
                <ScoreLine roundsCorrect={rounds.filter(r => r.correct).length} roundsPlayed={rounds.length} />
                {rounds.map((round, index) => (
                    <Box key={index} display={'flex'} gap={1} marginBottom={1}>
                        <WordCard word={round.word} size="small" />
                        <Typography color={round.correct ? 'success.dark' : 'error.dark'}>{round.answer}</Typography>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={reset}>new game</Button>
            </DialogActions>
        </Dialog>
    </Box>
}
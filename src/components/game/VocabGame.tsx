'use client'
import { useSpeech } from "@/context/speechContext";
import { VocabRound, getOptionsForNextRound, getWordForNextRound } from "@/lib/game-logic";
import { Word } from "@/lib/language/word";
import { Box, Button, Dialog, DialogActions, DialogContent, Typography, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AnswerFeedback } from "./AnswerFeedback";
import { MultipleChoice } from "./MultipleChoice";
import { ScoreLine } from "./ScoreLine";
import { TransitionIn } from "../TransitionIn";
import { WordCard } from "../WordCard";
import { FullHeightBox } from "../layout/FullHeightBox";

interface Props {
    roundsPerGame?: number;
    showRomanji: boolean
}


export const VocabGame: React.FunctionComponent<Props> = ({ roundsPerGame, showRomanji }) => {
    const [rounds, setRounds] = useState<VocabRound[]>([])
    const [word, setWord] = useState<Word | undefined>(undefined)
    const [options, setOptions] = useState<Word[]>([])
    const { } = useSpeech()

    const reset = () => {
        setRounds([])
        setWord(undefined)
        setOptions([])
    }

    useEffect(reset, [roundsPerGame, showRomanji])

    const start = () => {
        const firstWord = getWordForNextRound([])
        setWord(firstWord)
        setOptions(getOptionsForNextRound(firstWord, []))
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
            const nextWord = getWordForNextRound(updatedRounds)
            setWord(nextWord)
            setOptions(getOptionsForNextRound(nextWord, updatedRounds))
        } else {
            setWord(undefined)
            setOptions([])
        }
    }

    const hasFinished = !!(roundsPerGame && rounds.length >= roundsPerGame)
    const numberRight = rounds.filter(round => round.correct).length
    const previousRound = rounds.length ? rounds[rounds.length - 1] : undefined
    const wordToDisplay = word ?? previousRound?.word

    const answerFeedback = previousRound ? <>
        {previousRound.correct ? 'CORRECT! ' : `WRONG! `}
        {previousRound.word.write()} is &ldquo;{previousRound.word.translation}&rdquo;
    </> : undefined

    return <FullHeightBox alignItems={'center'} width={'100%'} justifyContent={'center'}>

        {!wordToDisplay && (
            <Button
                onClick={start}
                sx={{ minWidth: 250, minHeight: 150 }}
                variant="contained">start vocab test</Button>
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
                        <WordCard size="large"
                            word={wordToDisplay}
                            noCaption
                            showRomanji={showRomanji} />
                    </TransitionIn>
                    <MultipleChoice submit={handleSubmit} options={options.map(_ => _.translation)} />
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
                <ScoreLine roundsCorrect={rounds.filter(r => r.correct).length} roundsPlayed={rounds.length} />
                {rounds.map((round, index) => (
                    <Box key={index} display={'flex'} gap={1} marginBottom={1}>
                        <WordCard word={round.word} size="small" showRomanji />
                        <Typography color={round.correct ? 'success.dark' : 'error.dark'}>{round.answer}</Typography>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={reset}>new game</Button>
            </DialogActions>
        </Dialog>
    </FullHeightBox>
}
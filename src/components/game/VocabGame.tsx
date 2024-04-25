'use client'
import { useSpeech } from "@/context/speechContext";
import { VocabRound, getOptionsForNextRound, getWordForNextRound } from "@/lib/game-logic";
import { Word } from "@/lib/language/word";
import { Box, Typography, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TransitionIn } from "../TransitionIn";
import { WordCard } from "../WordCard";
import { FullHeightBox } from "../layout/FullHeightBox";
import { AnswerFeedback } from "./AnswerFeedback";
import { BigStartButton } from "./BigStartButton";
import { MultipleChoice } from "./MultipleChoice";
import { ScoreDialog } from "./ScoreDialog";
import { ScoreLine } from "./ScoreLine";

interface Props {
    roundsPerGame?: number;
    showRomanji: boolean;
    speakWord: boolean;
}


export const VocabGame: React.FunctionComponent<Props> = ({ roundsPerGame, showRomanji, speakWord }) => {
    const [rounds, setRounds] = useState<VocabRound[]>([])
    const [word, setWord] = useState<Word | undefined>(undefined)
    const [options, setOptions] = useState<Word[]>([])
    const { sayJapanese } = useSpeech()

    const reset = () => {
        setRounds([])
        setWord(undefined)
        setOptions([])
    }
    const nextWord = (rounds: VocabRound[] = []) => {
        const newWord = getWordForNextRound(rounds)
        setWord(newWord)
        setOptions(getOptionsForNextRound(newWord, rounds))
        if (speakWord) { sayJapanese(newWord.write()) }
    }

    useEffect(reset, [roundsPerGame, showRomanji])

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
            nextWord(updatedRounds)
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
            <BigStartButton
                onClick={() => nextWord()}
            >start vocab test</BigStartButton>
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

        <ScoreDialog
            open={hasFinished}
            onClose={reset}
            rounds={rounds}>
            {rounds.map((round, index) => (
                <Box key={index} display={'flex'} gap={1} marginBottom={1}>
                    <WordCard word={round.word} size="small" showRomanji />
                    <Typography color={round.correct ? 'success.dark' : 'error.dark'}>{round.answer}</Typography>
                </Box>
            ))}
        </ScoreDialog>
    </FullHeightBox>
}
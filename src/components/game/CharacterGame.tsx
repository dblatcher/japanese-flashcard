'use client'
import { useSpeech } from "@/context/speechContext";
import { CharacterRound, CharacterRoundInProgress, getNextCharacterRound } from "@/lib/game-logic";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FullHeightBox } from "../layout/FullHeightBox";
import { AnswerFeedback } from "./AnswerFeedback";
import { BigStartButton } from "./BigStartButton";
import { CharacterQuestion } from "./CharacterQuestion";
import { RoundHistory } from "./RoundHistory";
import { ScoreDialog } from "./ScoreDialog";
import { ScoreLine } from "./ScoreLine";
import { scoreComment } from "@/lib/feedback-phrases";

interface Props {
    hiraganaConstanents: string[];
    katakanaConstanents: string[];
    roundsPerGame?: number;
}


export const CharacterGame: React.FunctionComponent<Props> = ({ hiraganaConstanents, katakanaConstanents, roundsPerGame }) => {
    const [previousRounds, setPreviousRounds] = useState<CharacterRound[]>([])
    const [currentRound, setCurrentRound] = useState<CharacterRoundInProgress | undefined>(undefined)
    const { pronounce, sayJapanese } = useSpeech()

    const reset = () => {
        setPreviousRounds([])
        setCurrentRound(undefined)
    }

    useEffect(reset, [hiraganaConstanents, katakanaConstanents, roundsPerGame])

    const start = () => {
        setCurrentRound(getNextCharacterRound([], hiraganaConstanents, katakanaConstanents))
    }

    const handleSubmit = (guess: string) => {
        if (!currentRound || !guess) {
            return
        }
        const answer = guess
        const correct = answer === currentRound.character.phonetic
        pronounce(currentRound.character)

        const newRound: CharacterRound = {
            ...currentRound,
            options: [],
            answer,
            correct,
        }

        const updatedRounds = [...previousRounds, newRound]

        setPreviousRounds(updatedRounds)

        const hasNextRound = typeof roundsPerGame === 'undefined' ? true : updatedRounds.length < roundsPerGame
        if (hasNextRound) {
            setCurrentRound(getNextCharacterRound(previousRounds, hiraganaConstanents, katakanaConstanents))
        } else {
            setCurrentRound(undefined)
        }
    }

    const hasFinished = !!(roundsPerGame && previousRounds.length >= roundsPerGame)
    const numberRight = previousRounds.filter(round => round.correct).length
    const mostRecentRound = previousRounds.length ? previousRounds[previousRounds.length - 1] : undefined
    const roundToDisplay = currentRound ?? mostRecentRound

    useEffect(() => {
        if (hasFinished) {
            console.log('finished!', { numberRight, total: previousRounds.length });
            // timeout to make sure the last utterance is finished
            // to do - queue utterances!
            setTimeout(() => {
                sayJapanese(scoreComment(numberRight, previousRounds.length))
            }, 2000)
        }
    }, [hasFinished, numberRight, previousRounds, sayJapanese])


    const answerFeedback = mostRecentRound ? <>
        {mostRecentRound.correct ? 'CORRECT! ' : `WRONG! `}
        {mostRecentRound.character.string} is &ldquo;{mostRecentRound.character.phonetic}&rdquo;
    </> : undefined

    return <FullHeightBox alignItems={'center'} width={'100%'} justifyContent={'center'}>

        {!roundToDisplay && (
            <BigStartButton onClick={start}
            >start character test</BigStartButton>
        )}
        {roundToDisplay &&
            <Box
                component={'article'}
                sx={{
                    minWidth: 350,
                    maxWidth: '100%',
                }}>
                <ScoreLine
                    roundsCorrect={numberRight}
                    roundsPlayed={previousRounds.length}
                    roundsPerGame={roundsPerGame} />
                <CharacterQuestion handleSubmit={handleSubmit} roundToDisplay={roundToDisplay} />
                <AnswerFeedback
                    content={answerFeedback}
                    transitionKey={previousRounds.length}
                    success={mostRecentRound?.correct} />
            </Box>
        }

        <ScoreDialog
            open={hasFinished}
            onClose={reset}
            rounds={previousRounds}
        >
            <Typography>{scoreComment(previousRounds.filter(_ => _.correct).length, previousRounds.length)}</Typography>
            <RoundHistory rounds={previousRounds} />
        </ScoreDialog>

    </FullHeightBox>
}
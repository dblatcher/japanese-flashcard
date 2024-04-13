'use client'
import { useSpeech } from "@/context/speechContext";
import { HIRAGANA } from "@/lib/language/hiragana";
import { Button, Typography } from "@mui/material";
import React from "react";


interface Props {
    identifier: string
}

export const TalkingTile: React.FunctionComponent<Props> = ({ identifier }: Props) => {
    const { pronounce } = useSpeech()
    const character = HIRAGANA.characters[identifier]

    const talk = () => {
        pronounce(character)
    }

    return (
        <Button onClick={talk} color="primary" variant="outlined" sx={{
            padding: 1,
            display: 'flex',
            justifyContent: 'center',
            minWidth: 80,
        }}>
            <Typography fontSize={40}>{character.string}</Typography>
            <Typography variant='caption'>{character.phonetic}</Typography>
        </Button>
    )
}
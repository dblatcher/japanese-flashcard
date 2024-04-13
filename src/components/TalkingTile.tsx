'use client'
import { HIRAGANA } from "@/lib/language/hiragana";
import { speak } from "@/lib/speech";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";


interface Props {
    identifier: string
}

export const TalkingTile = ({ identifier }: Props) => {

    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

    const character = HIRAGANA.characters[identifier]

    const loadVoices = () => {
        const newVoices = speechSynthesis.getVoices()
        setVoices(newVoices)
        console.log(newVoices)
        return newVoices
    }

    useEffect(() => {
        setTimeout(loadVoices, 10)
    }, [setVoices])

    const talk = () => {
        const availableVoices = voices.length === 0 ? loadVoices() : voices
        const japaneseVoice = availableVoices.find(voice => voice.lang === 'ja-JP')
        const ukVoice = availableVoices.find(voice => voice.lang === 'en-GB')
        const usVoice = availableVoices.find(voice => voice.lang === 'en-US')

        const voice = japaneseVoice ?? ukVoice ?? usVoice ?? availableVoices[0]

        if (!voice) {
            console.warn('no voices');
            loadVoices()
            return
        }
        const text = voice === japaneseVoice ? character.string : character.phonetic.toLowerCase()
        speak(speechSynthesis, text, voice, 1, 1)
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
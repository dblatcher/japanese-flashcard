import { Character } from "@/lib/language/character";
import { speak } from "@/lib/speech";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";



const SpeechContext = createContext<{
    pronounce: { (character: Character): void }
}>({
    pronounce: () => { console.warn('no speech provider') }
})

const SpeechProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {

    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

    const loadVoices = () => {
        const newVoices = speechSynthesis.getVoices()
        setVoices(newVoices)
        console.log(newVoices)
        return newVoices
    }

    useEffect(() => {
        setTimeout(loadVoices, 10)
    }, [setVoices])

    const pronounce = (character: Character) => {

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
        <SpeechContext.Provider value={{ pronounce }}>
            {children}
        </SpeechContext.Provider>
    )
}

const useSpeech = () => useContext(SpeechContext)

export { SpeechProvider, useSpeech }
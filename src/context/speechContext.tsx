import { Character } from "@/lib/language/character";
import { isJapanese, pickVoice, speak } from "@/lib/speech";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";


const SpeechContext = createContext<{
    pronounce: { (character: Character): void }
}>({
    pronounce: () => { console.warn('no speech provider') }
})

const SpeechProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {

    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

    useEffect(() => {
        const { speechSynthesis } = window
        const loadVoices = () => {
            const newVoices = speechSynthesis.getVoices()
            setVoices(newVoices)
        }
        speechSynthesis.addEventListener('voiceschanged', loadVoices)
        return () => {
            speechSynthesis.removeEventListener('voiceschanged', loadVoices)
        }
    }, [setVoices])

    const pronounce = (character: Character) => {
        const voice = pickVoice(voices)
        if (!voice) {
            console.warn('no voices');
            return
        }
        const text = isJapanese(voice) ? character.string : character.phonetic.toLowerCase()
        speak(speechSynthesis, text, voice, 1, 1)
    }

    return (
        <SpeechContext.Provider value={{ pronounce }}>
            {children}
        </SpeechContext.Provider>
    )
}

const useSpeech = () => useContext(SpeechContext)

export { SpeechProvider, useSpeech };

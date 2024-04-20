'use client'
import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type Props = {
    submit: { (answer: string): void }
    isFor?: 'word' | 'character'
}

export const CharacterInput: React.FunctionComponent<Props> = ({ submit, isFor = 'character' }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [guess, setGuess] = useState("")

    useEffect(() => {
        inputRef?.current?.focus()
    }, [inputRef.current])

    const convertInput = isFor === 'character'
        ? (value: string) => value.trim().toUpperCase().substring(0, 3)
        : (value: string) => value.toLowerCase()

    return (
        <TextField value={guess} inputRef={inputRef}
            variant="outlined"
            onChange={(event) => {
                setGuess(convertInput(event.target.value))
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault()
                    submit(guess)
                    setGuess("")
                }
            }} />
    )
}
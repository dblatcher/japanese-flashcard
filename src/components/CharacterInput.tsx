'use client'
import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type Props = {
    submit: { (answer: string): void }
}

export const CharacterInput: React.FunctionComponent<Props> = ({ submit }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [guess, setGuess] = useState("")

    useEffect(() => {
        inputRef?.current?.focus()
    }, [inputRef.current])

    return (
        <TextField value={guess} inputRef={inputRef}
            variant="outlined"
            onChange={(event) => {
                setGuess(event.target.value.trim().toUpperCase().substring(0, 3))
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
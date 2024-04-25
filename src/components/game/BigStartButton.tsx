'use client'
import { useSpeech } from "@/context/speechContext";
import { Button } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
    onClick: { (): void }
    children: ReactNode
}


export const BigStartButton: React.FunctionComponent<Props> = ({ onClick, children }) => {

    const { sayJapanese } = useSpeech()

    const handleClick = () => {
        sayJapanese("はじめましょう")
        onClick()
    }

    return <Button
        onClick={handleClick}
        sx={{ minWidth: 250, minHeight: 150 }}
        variant="contained">{children}</Button >

}
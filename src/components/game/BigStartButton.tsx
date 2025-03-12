'use client'
import { useSpeech } from "@/context/speechContext";
import { LETS_START } from "@/lib/feedback-phrases";
import { Button } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
    onClick: { (): void }
    children: ReactNode
}


export const BigStartButton: React.FunctionComponent<Props> = ({ onClick, children }) => {

    const { sayJapanese } = useSpeech()

    const handleClick = () => {
        sayJapanese(LETS_START)
        onClick()
    }

    return <Button
        onClick={handleClick}
        sx={{ minWidth: 250, minHeight: 150 }}
        variant="contained">{children}</Button >

}
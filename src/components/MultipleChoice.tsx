'use client'
import { Box, Button } from "@mui/material";
import React from "react";

type Props = {
    submit: { (answer: string): void }
    options: string[]
}

export const MultipleChoice: React.FunctionComponent<Props> = ({ submit, options }) => {
    return (
        <Box display={'flex'} gap={1}>
            {options.map((option, index) => (
                <Button key={index}
                    variant="contained"
                    onClick={() => { submit(option) }}>
                    {option}
                </Button>
            ))}
        </Box>
    )
}
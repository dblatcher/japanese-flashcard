import { Box, Stack } from "@mui/material";
import React from "react";
import { Navbar } from "./Navbar";

export const PageHeader: React.FunctionComponent = () => {

    return (
        <Stack component={'header'} 
            spacing={1} 
            paddingX={1}
            paddingBottom={1}
        >
            <Box display={'flex'} gap={2}>
                <h1>Japanese Flashcards</h1>
                <span>フラッシュカード</span>
            </Box>
            <Navbar />
        </Stack>
    )
}
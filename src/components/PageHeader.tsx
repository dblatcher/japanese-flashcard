import { Box, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

export const PageHeader: React.FunctionComponent = () => {

    return (
        <Stack component={'header'} spacing={1} paddingX={2} borderBottom={1}>
            <Box display={'flex'} gap={2}>
                <h1>Japanese Flashcards</h1>
                <span>フラッシュカード</span>
            </Box>
            <Box component={'nav'} display={'flex'} gap={2}>
                <Link href="/">home</Link>
                <Link href="/about">about page</Link>
                <Link href="/learn-characters">learn characters</Link>
            </Box>
        </Stack>
    )
}
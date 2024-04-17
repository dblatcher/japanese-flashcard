import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
    roundsCorrect: number,
    roundsPlayed: number,
    roundsPerGame?: number,
}

export const ScoreLine: React.FunctionComponent<Props> = ({ roundsCorrect, roundsPlayed, roundsPerGame }) => (
    <Box display={'flex'} justifyContent={'space-between'} gap={1}>
        <Typography component="span">
            SCORE:  {roundsCorrect} / {roundsPlayed}
        </Typography>
        {roundsPerGame && (
            <Typography component="span">
                round:  {roundsPlayed + 1} / {roundsPerGame}
            </Typography>
        )}
    </Box>
)
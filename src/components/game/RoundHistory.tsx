import { CharacterRound } from "@/lib/game-logic";
import { Box, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import React from "react";
import { SyllableCard } from "../SyllableCard";


interface Props {
    rounds: CharacterRound[]
}

export const RoundHistory: React.FunctionComponent<Props> = ({ rounds }) => {

    return (
        <Box display='flex' flexWrap={'wrap'} gap={1}>
            <List dense>
                {rounds.map((round, index) => (
                    <ListItem key={index} sx={{
                        backgroundColor: round.correct ? 'success.main' : 'error.main',
                        color: round.correct ? 'success.contrastText' : 'error.contrastText',
                        marginBottom: .25,
                    }}>
                        <ListItemIcon>
                            <SyllableCard character={round.character} size="small" noCaption />
                        </ListItemIcon>
                        <Typography minWidth={50}>{round.character.phonetic}</Typography>

                        {!round.correct && (
                            <Typography component={'s'}>{round.answer}</Typography>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
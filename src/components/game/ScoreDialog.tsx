'use client'
import { Round, VocabRound } from "@/lib/game-logic";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactNode } from "react";
import { ScoreLine } from "./ScoreLine";

interface Props {
    open: boolean
    onClose: { (): void }

    children: ReactNode
    rounds: Array<Round | VocabRound>
}


export const ScoreDialog: React.FunctionComponent<Props> = ({ children, open, onClose, rounds }) => {


    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose} >
            <DialogTitle
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    marginBottom: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                End of game
                <ScoreLine roundsPlayed={rounds.length} roundsCorrect={rounds.filter(_ => _.correct).length} />
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>new game</Button>
            </DialogActions>
        </Dialog>
    )
}
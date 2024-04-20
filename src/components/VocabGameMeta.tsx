'use client'
import { SpeechProvider } from "@/context/speechContext";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { VocabGame } from "./VocabGame";


export const VocabGameMeta: React.FunctionComponent = () => {

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [roundsPerGame, setRoundPerGame] = useState<number>(10)

    return <SpeechProvider>
        <Box>
            <Button onClick={() => { setOptionsOpen(true) }}>options</Button>
            <VocabGame
                roundsPerGame={roundsPerGame}
            />
        </Box>
        <Dialog open={optionsOpen} onClose={() => { setOptionsOpen(false) }}>
            <DialogTitle>game options</DialogTitle>
            <DialogContent>
                <Grid container gap={1}>
                    <Grid item xs={6} md={8} >
                        <Typography variant="overline">Hiragana Characters</Typography>
                    </Grid>

                    <Grid item xs={3} md={2} paddingTop={1}>
                        <TextField label="rounds per game"
                            value={roundsPerGame}
                            type="number" onChange={(event) => {
                                const numberValue = Number(event.target.value)
                                if (isNaN(numberValue)) {
                                    return
                                }
                                setRoundPerGame(Math.floor(numberValue))
                            }} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setOptionsOpen(false) }}>done</Button>
            </DialogActions>
        </Dialog>
    </SpeechProvider>
}
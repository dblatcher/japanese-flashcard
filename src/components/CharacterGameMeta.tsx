'use client'
import { SpeechProvider } from "@/context/speechContext";
import React, { useState } from "react";
import { CharacterGame } from "./CharacterGame";
import { HIRAGANA } from "@/lib/language/hiragana";
import { ConstanentPicker } from "./ConstanentPicker";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";


export const CharacterGameMeta: React.FunctionComponent = () => {

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [constanents, setConstanents] = useState<string[]>(HIRAGANA.constanents)
    const [roundsPerGame, setRoundPerGame] = useState<number>(10)

    return <SpeechProvider>
        <Box>
            <Button onClick={() => { setOptionsOpen(true) }}>options</Button>
            <CharacterGame constanents={constanents} roundsPerGame={roundsPerGame} />
        </Box>
        <Dialog open={optionsOpen} onClose={() => { setOptionsOpen(false) }}>
            <DialogTitle>game options</DialogTitle>
            <DialogContent>
                <Grid container gap={1}>
                    <Grid item xs={6} md={8} >
                        <Typography variant="overline">Hiragana Characters to test</Typography>
                        <ConstanentPicker {...{ constanents, setConstanents }} options={HIRAGANA.constanents} />
                    </Grid>

                    <Grid item xs={3} paddingTop={1}>
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
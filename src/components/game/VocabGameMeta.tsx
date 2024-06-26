'use client'
import { SpeechProvider } from "@/context/speechContext";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { VocabGame } from "./VocabGame";
import { FullHeightBox } from "../layout/FullHeightBox";


export const VocabGameMeta: React.FunctionComponent = () => {

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [showRomanji, setShowRomanji] = useState(false)
    const [speakWord, setspeakWord] = useState(false)
    const [roundsPerGame, setRoundPerGame] = useState<number>(10)

    return <SpeechProvider>
        <FullHeightBox position={'relative'}>
            <Button sx={{
                position: 'absolute',
                right: 0, top: 0
            }} onClick={() => { setOptionsOpen(true) }}>options</Button>
            <VocabGame
                roundsPerGame={roundsPerGame}
                showRomanji={showRomanji}
                speakWord={speakWord}
            />
        </FullHeightBox>
        <Dialog open={optionsOpen} onClose={() => { setOptionsOpen(false) }}>
            <DialogTitle>game options</DialogTitle>
            <DialogContent>
                <Grid container gap={1}>
                    <Grid item xs={5} md={5} >
                        <Stack flexDirection={'row'} border={1} alignItems={'center'} minWidth={60} justifyContent={'center'}>
                            <FormLabel>Show romanji</FormLabel>
                            <Checkbox checked={showRomanji} size="small" onChange={() => { setShowRomanji(!showRomanji) }} />
                        </Stack>
                        <Stack flexDirection={'row'} border={1} alignItems={'center'} minWidth={60} justifyContent={'center'}>
                            <FormLabel>Say Words</FormLabel>
                            <Checkbox checked={speakWord} size="small" onChange={() => { setspeakWord(!speakWord) }} />
                        </Stack>
                    </Grid>

                    <Grid item xs={5} md={5} paddingTop={1}>
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
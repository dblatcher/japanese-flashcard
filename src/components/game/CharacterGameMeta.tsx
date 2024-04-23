'use client'
import { SpeechProvider } from "@/context/speechContext";
import React, { useState } from "react";
import { CharacterGame } from "./CharacterGame";
import { HIRAGANA } from "@/lib/language/hiragana";
import { ConstanentPicker } from "./ConstanentPicker";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { KATAKANA } from "@/lib/language/katakana";
import { FullHeightBox } from "../layout/FullHeightBox";


export const CharacterGameMeta: React.FunctionComponent = () => {

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [hiraganaConstanents, setHiraganaConstanents] = useState<string[]>([""])
    const [katakanaConstanents, seKatakanaConstanents] = useState<string[]>([""])
    const [roundsPerGame, setRoundPerGame] = useState<number>(10)

    return <SpeechProvider>
        <FullHeightBox position={'relative'}>
            <Button sx={{
                position: 'absolute',
                right: 0, top: 0
            }} onClick={() => { setOptionsOpen(true) }}>options</Button>
            <CharacterGame
                hiraganaConstanents={hiraganaConstanents}
                roundsPerGame={roundsPerGame}
                katakanaConstanents={katakanaConstanents} />
        </FullHeightBox>
        <Dialog open={optionsOpen} onClose={() => { setOptionsOpen(false) }}>
            <DialogTitle>game options</DialogTitle>
            <DialogContent>
                <Grid container gap={1}>
                    <Grid item xs={6} md={8} >
                        <Typography variant="overline">Hiragana Characters</Typography>
                        <ConstanentPicker
                            setConstanents={setHiraganaConstanents}
                            constanents={hiraganaConstanents}
                            options={HIRAGANA.constanents} />
                        <Typography variant="overline">Katakana Characters</Typography>
                        <ConstanentPicker
                            setConstanents={seKatakanaConstanents}
                            constanents={katakanaConstanents}
                            options={KATAKANA.constanents} />
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
import { findLanguage } from "@/lib/find-language";
import { CharacterRoundInProgress } from "@/lib/game-logic"
import { Box, Zoom, Typography, ButtonGroup, Button } from "@mui/material";
import { SyllableCard } from "../SyllableCard";
import { TransitionIn } from "../TransitionIn";
import { CharacterInput } from "./CharacterInput";

interface Props {
    roundToDisplay: CharacterRoundInProgress;
    handleSubmit: { (guess: string): void };
}

export const CharacterQuestion: React.FunctionComponent<Props> = ({ roundToDisplay, handleSubmit }) => {

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={1}
            padding={1}>
            {roundToDisplay.type === 'enter-romanji' && <>
                <TransitionIn key={roundToDisplay.character.identifier} timeout={500} Transition={Zoom}>
                    <SyllableCard size="large" character={roundToDisplay.character} noCaption />
                </TransitionIn>
                <CharacterInput submit={handleSubmit} />
            </>}
            {roundToDisplay.type === 'pick-character' && <>
                <TransitionIn key={roundToDisplay.character.identifier} timeout={500} Transition={Zoom}>
                    <Typography>What is the character for: {roundToDisplay.character.phonetic} in {findLanguage(roundToDisplay.character)}</Typography>
                </TransitionIn>
                <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-evenly'}>
                    {roundToDisplay.options.map((option, index) => (
                        <Button onClick={() => handleSubmit(option.phonetic)} key={index}>
                            <SyllableCard character={option} noCaption size="normal" />
                        </Button>
                    ))}
                </Box>
            </>}
        </Box>
    )
}
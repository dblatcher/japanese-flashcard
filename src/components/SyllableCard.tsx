import { Character } from "@/lib/language/character";
import { Card, Typography } from "@mui/material";


interface Props {
    character:Character
}

export const SyllableCard = ({character}:Props) => {

    return (
        <Card sx={{
            padding: 1,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Typography fontSize={40}>{character.string}</Typography>
            <Typography variant='caption'>{character.phonetic}</Typography>
        </Card>
    )
}
import { Character } from "@/lib/language/character";
import { Card, Typography } from "@mui/material";


type Size = 'normal' | 'small'

type Dims = {
    minWidth: number
    fontSize: number
}

interface Props {
    character: Character
    noCaption?: boolean
    size?: Size
}


const sizes: Record<Size, Dims> = {
    normal: {
        minWidth: 60,
        fontSize: 40
    },
    small: {
        minWidth: 30,
        fontSize: 20,
    }
}

export const SyllableCard = ({ character, noCaption = false, size = 'normal' }: Props) => {

    const { minWidth, fontSize } = sizes[size]

    return (
        <Card sx={{
            padding: 1,
            display: 'flex',
            justifyContent: 'center',
            minWidth,
            flexDirection: 'column',
            textAlign: 'center',
        }}>
            <Typography fontSize={fontSize} lineHeight={1}>{character.string}</Typography>
            {!noCaption && (
                <Typography variant='caption' fontSize={fontSize * .5}>{character.phonetic}</Typography>
            )}
        </Card>
    )
}
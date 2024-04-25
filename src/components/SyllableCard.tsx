import { Character } from "@/lib/language/character";
import { Card, Typography } from "@mui/material";


type Size = 'normal' | 'small' | 'large'

type Dims = {
    minWidth: number
    fontSize: number
    padding: number
}

interface Props {
    character: Character
    noCaption?: boolean
    size?: Size
}


const sizes: Record<Size, Dims> = {
    large: {
        minWidth: 180,
        fontSize: 160,
        padding: 1,
    },
    normal: {
        minWidth: 60,
        fontSize: 40,
        padding: 1,
    },
    small: {
        minWidth: 22,
        fontSize: 20,
        padding: .25,
    },

}

export const SyllableCard = ({ character, noCaption = false, size = 'normal' }: Props) => {

    const { minWidth, fontSize, padding } = sizes[size]

    return (
        <Card sx={{
            padding,
            display: 'flex',
            justifyContent: 'center',
            minWidth,
            flexDirection: 'column',
            textAlign: 'center',
            boxSizing: 'border-box',
            backgroundColor: 'primary.light',
        }}>
            <Typography fontSize={fontSize} lineHeight={1}>{character.string}</Typography>
            {!noCaption && (
                <Typography variant='caption' fontSize={fontSize * .5}>{character.phonetic}</Typography>
            )}
        </Card>
    )
}
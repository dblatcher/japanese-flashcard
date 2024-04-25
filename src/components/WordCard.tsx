import { Word } from "@/lib/language/word";
import { Card, Typography } from "@mui/material";


type Size = 'normal' | 'small' | 'large'

type Dims = {
    fontSize: number
    padding: number
}

interface Props {
    word: Word
    noCaption?: boolean
    size?: Size
    showRomanji?: boolean
}


const sizes: Record<Size, Dims> = {
    large: {
        fontSize: 40,
        padding: 1,
    },
    normal: {
        fontSize: 20,
        padding: 1,
    },
    small: {
        fontSize: 15,
        padding: .25,
    },

}

export const WordCard = ({ word, noCaption = false, size = 'normal', showRomanji = false }: Props) => {

    const { fontSize, padding } = sizes[size]
    const minWidth = fontSize * 5;

    return (
        <Card sx={{
            padding,
            minWidth,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            boxSizing: 'border-box',
            backgroundColor: 'primary.light',
        }}>
            <Typography fontSize={fontSize * 1.5} lineHeight={1}>{word.write()}</Typography>
            {showRomanji &&
                <Typography
                    variant="overline" fontSize={fontSize} lineHeight={1}>{word.text}</Typography>
            }
            {!noCaption && (
                <Typography
                    paddingTop={1}
                    variant='caption' fontSize={fontSize * .75}>{word.translation}</Typography>
            )}
        </Card>
    )
}
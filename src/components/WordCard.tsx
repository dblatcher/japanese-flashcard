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
}


const sizes: Record<Size, Dims> = {
    large: {
        fontSize: 30,
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

export const WordCard = ({ word, noCaption = false, size = 'normal' }: Props) => {

    const { fontSize, padding } = sizes[size]

    return (
        <Card sx={{
            padding,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            boxSizing: 'border-box',
        }}>
            <Typography fontSize={fontSize * 1.5} lineHeight={1}>{word.write()}</Typography>
            <Typography paddingBottom={1}
                variant="overline" fontSize={fontSize} lineHeight={1}>{word.text}</Typography>
            {!noCaption && (
                <Typography
                    variant='caption' fontSize={fontSize * .75}>{word.translation}</Typography>
            )}
        </Card>
    )
}
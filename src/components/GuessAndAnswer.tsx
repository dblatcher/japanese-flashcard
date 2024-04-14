import { Box, Typography } from "@mui/material"

interface Props {
    answer: string,
    rightAnswer: string,
}

export const GuessAndAnswer = ({ answer, rightAnswer }: Props) => {

    const correct = answer === rightAnswer

    return <Box display={'flex'} gap={1}>
        <Typography color={correct ? 'success' : 'error'}>
            {answer}
        </Typography>
        <Typography color={correct ? 'success' : 'error'}>
            {correct ? "+" : "x"}
        </Typography>
        {!correct && <Typography>{rightAnswer}</Typography>}
    </Box>
}
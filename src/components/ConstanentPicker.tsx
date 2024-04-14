import { Box, Checkbox, FormControl, FormLabel, Stack } from "@mui/material"
import { FunctionComponent } from "react"

interface Props {
    constanents: string[]
    setConstanents: { (constanents: string[]): void }
    options: string[]
}

export const ConstanentPicker: FunctionComponent<Props> = ({
    options, constanents, setConstanents
}) => {

    const toggle = (option: string) => {
        const currentIndex = constanents.indexOf(option);
        if (currentIndex === -1) {
            setConstanents([...constanents, option])
        } else {
            setConstanents(constanents.filter(_ => _ !== option))
        }
    }

    return <Box display={'flex'} flexWrap={'wrap'}>
        {options.map((option, index) => (
            <Stack key={index} flexDirection={'row'} border={1} alignItems={'center'}>
                <FormLabel>"{option}..."</FormLabel>
                <Checkbox checked={constanents.includes(option)} size="small" onChange={() => { toggle(option) }} />
            </Stack>
        ))}
    </Box>
}
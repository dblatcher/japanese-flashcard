import { Box, Button, Checkbox, FormControl, FormLabel, Stack } from "@mui/material"
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

    const selectAll = () => {
        setConstanents([...options])
    }
    const selectNone = () => {
        setConstanents([])
    }

    return <Box display={'flex'} flexWrap={'wrap'}>
        {options.map((option, index) => (
            <Stack key={index} flexDirection={'row'} border={1} alignItems={'center'} minWidth={60} justifyContent={'center'}>
                <FormLabel>{option === '' ? '_' : option}:</FormLabel>
                <Checkbox checked={constanents.includes(option)} size="small" onChange={() => { toggle(option) }} />
            </Stack>
        ))}
        <Button onClick={selectAll} sx={{ minWidth: 60 }} >all</Button>
        <Button onClick={selectNone} sx={{ minWidth: 60 }} >none</Button>
    </Box>
}
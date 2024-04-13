import { Alphabet } from "@/lib/language/alphabet";
import { Grid } from "@mui/material";
import { SyllableCard } from "./SyllableCard";

interface Props {
    alphabet: Alphabet
}

export const AlphabetGrid = ({ alphabet }: Props) => {

    const all = Object.values(alphabet.characters)

    const { constanents } = alphabet

    return constanents.map(constanent => (
        <Grid container spacing={1} key={constanent} marginBottom={1}>
            {all.filter(c => c.constanent === constanent).map(character => (
                <Grid item key={character.identifier}>
                    <SyllableCard character={character} />
                </Grid>
            ))}
        </Grid>
    ))

    
}
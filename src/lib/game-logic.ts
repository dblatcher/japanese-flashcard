import { Character } from "./language/character"
import { HIRAGANA } from "./language/hiragana"


export type Round = {
    character: Character
    answer: string
    correct: boolean
}

export const getCharacterForNextRound = (previousRounds:Round[], hiraganaConstanents:string[] ):Character =>{
    const lastCharacter = previousRounds[previousRounds.length-1]?.character
    const filterFunction = (possibleCharacter: Character) => {
        if (possibleCharacter.identifier === lastCharacter?.identifier) {
            return false
        }
        // treat none as 'vowels only'
        if (hiraganaConstanents.length === 0) {
            return possibleCharacter.constanent === ""
        }
        return hiraganaConstanents.includes(possibleCharacter.constanent)
    }

    return HIRAGANA.random(filterFunction)
}

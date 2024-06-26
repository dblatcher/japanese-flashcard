import { Character } from "./language/character"
import { HIRAGANA } from "./language/hiragana"
import { KATAKANA } from "./language/katakana"
import { Word } from "./language/word"
import { pickAtRandom, pickManyAtRandom, shuffle } from "./util"
import { hiraganaWordList, katakanaWordList } from "./wordlists"


export type Round = {
    character: Character
    answer: string
    correct: boolean
}

export type VocabRound = {
    word: Word
    answer: string
    correct: boolean
}

export const getCharacterForNextRound = (
    previousRounds: Round[],
    hiraganaConstanents: string[],
    katakanaConstanents: string[],
): Character => {
    const lastCharacter = previousRounds[previousRounds.length - 1]?.character

    const hiraganaFilterFunction = (possibleCharacter: Character) => {
        if (possibleCharacter === lastCharacter) {
            return false
        }
        // treat none as 'hiragana vowels only'
        if (katakanaConstanents.length === 0 && hiraganaConstanents.length === 0) {
            return possibleCharacter.constanent === ""
        }
        return hiraganaConstanents.includes(possibleCharacter.constanent)
    }
    const katakanaFilterFunction = (possibleCharacter: Character) => {
        if (possibleCharacter === lastCharacter) {
            return false
        }
        if (katakanaConstanents.length === 0) {
            return false
        }
        return katakanaConstanents.includes(possibleCharacter.constanent)
    }
    const hiraganaOptions = HIRAGANA.characterArray.filter(hiraganaFilterFunction)
    const katakanaOptions = KATAKANA.characterArray.filter(katakanaFilterFunction)

    const both = [...hiraganaOptions, ...katakanaOptions]
    return pickAtRandom(both) ?? both[0]
}

export const getWordForNextRound = (
    previousRounds: VocabRound[]
): Word => {
    const lastWord = previousRounds[previousRounds.length - 1]?.word;
    const allWords = [...hiraganaWordList, ...katakanaWordList].filter(_ => _ !== lastWord)
    return pickAtRandom(allWords)
}

export const getOptionsForNextRound = (
    correctWord: Word,
    previousRounds: VocabRound[],
): Word[] => {
    const lastWord = previousRounds[previousRounds.length - 1]?.word;
    const allWords = [...hiraganaWordList, ...katakanaWordList].filter(_ => _ !== lastWord && _ !== correctWord)

    const options = [correctWord, ...pickManyAtRandom(3, allWords)]

    return shuffle(options)

}
import { Character } from "./language/character"
import { HIRAGANA } from "./language/hiragana"
import { KATAKANA } from "./language/katakana"
import { Word } from "./language/word"
import { pickAtRandom, pickManyAtRandom, shuffle } from "./util"
import { hiraganaWordList, katakanaWordList } from "./wordlists"


export type CharacterRound = {
    character: Character
    answer: string
    correct: boolean
    options: Character[], /// not used - split union to avoid
    type: 'enter-romanji'
} | {
    character: Character
    answer: string
    correct: boolean,
    options: Character[],
    type: 'pick-character'
}

export type CharacterRoundInProgress = Omit<CharacterRound, 'answer' | 'correct'>

export type VocabRound = {
    word: Word
    answer: string
    correct: boolean
}

export const getCharacterForNextRound = (
    previousRounds: CharacterRound[],
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

export const getNextCharacterRound = (
    previousRounds: CharacterRound[],
    hiraganaConstanents: string[],
    katakanaConstanents: string[],
): CharacterRoundInProgress => {
    const character = getCharacterForNextRound(previousRounds, hiraganaConstanents, katakanaConstanents)
    const type: CharacterRound['type'] = pickAtRandom(['enter-romanji', 'pick-character'])
    if (type === 'enter-romanji') {
        return {
            type, character, options: []
        }
    }

    const possibleAnswers = [...HIRAGANA.characterArray, ...KATAKANA.characterArray].filter(otherCharacter => otherCharacter !== character)
    const options: Character[] = shuffle([character, ...pickManyAtRandom(5, possibleAnswers)])
    return {
        type, character, options
    }
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
import vocabData from './vocab.json'
import { HIRAGANA } from './language/hiragana'
import { KATAKANA } from './language/katakana';

const hiraganaSymbols = HIRAGANA.characterArray.map(character => character.string);
const katakana = KATAKANA.characterArray.map(character => character.string);

class VocabItem {
    english: string[]
    japanese: string[]

    constructor(data: { english: string[], japanese: string[] }) {
        this.english = data.english
        this.japanese = data.japanese
    }

    get hiragana() {
        return this.japanese.filter(
            word => word.split('')
                .every(symbol => hiraganaSymbols.includes(symbol))
        )
    }
    get isSingleHiraganaWord() {
        return this.japanese.length === 1 && this.hiragana.length === 1
    }
    get katakana() {
        return this.japanese.filter(
            word => word.split('')
                .every(symbol => katakana.includes(symbol))
        )
    }
    get isSingleKatakanWord() {
        return this.japanese.length === 1 && this.katakana.length === 1
    }
}

export const vocabulary = vocabData.map(_ => new VocabItem(_))

export const hiraganaVocab = vocabulary.filter(_ => _.isSingleHiraganaWord)
export const katakanaVocab = vocabulary.filter(_ => _.isSingleKatakanWord)


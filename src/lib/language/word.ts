import { Alphabet } from "./alphabet"

class Word {
    text: string
    translation: string
    alphabet: Alphabet
    constructor(text: string, translation: string, alphabet: Alphabet) {
        this.text = text
        this.translation = translation
        this.alphabet = alphabet
    }

    write() {
        return this.alphabet.write(this.text)
    }
}


export { Word }
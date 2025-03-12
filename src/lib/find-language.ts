import { Character } from "./language/character";
import { HIRAGANA } from "./language/hiragana";
import { KATAKANA } from "./language/katakana";

export const findLanguage = (character:Character) => {

    if (HIRAGANA.characterArray.includes(character)) {
        return 'HIRAGANA'
    }
    if (KATAKANA.characterArray.includes(character)) {
        return 'KATAKANA'
    }

    return 'IDK!'

}
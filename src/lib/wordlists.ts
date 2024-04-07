import { Word } from "./language/word";
import { HIRAGANA } from "./language/hiragana";
import { KATAKANA } from "./language/katakana";

const hiraganaWordList = [
    new Word('kinnoko', 'mushrooms', HIRAGANA),
    new Word('konbanwa', 'good evening', HIRAGANA),
    new Word('ki', 'tree', HIRAGANA),
    new Word('inu', 'dog', HIRAGANA),
    new Word('tamogo', 'eggs', HIRAGANA),
    new Word('niku', 'meat', HIRAGANA),
    new Word('ohashi', 'chopsticks', HIRAGANA),
]

var katakanaWordList = [
    new Word("gurasu", "glass", KATAKANA),
    new Word("minibah", "minibar", KATAKANA),
    new Word('shiatsu', 'shirt', KATAKANA),
    new Word('nekutai', '(neck)tie', KATAKANA),
    new Word('tahminaru', 'terminal', KATAKANA),
]

export { hiraganaWordList, katakanaWordList }
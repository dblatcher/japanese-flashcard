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

const katakanaWordsFromData: [string, string][] = [
    ['enjinia', 'engineer'],
    ['chihtah', 'cheetah'],
    ['sarada', 'salad'],
    ['dezahto', 'dessert'],
    ['pan', 'bread'],
    ['aisukurihmu', 'ice cream'],
    ['bihru', 'beer'],
    ['wain', 'wine'],
    ['gasu', 'gas'],
    ['mehtoru', 'meter'],
    ['guramu', 'gram'],
    ['kiro', 'kilo-'],
    ['miri', 'milli-'],
    ['inchi', 'inch'],
    ['hoteru', 'hotel'],
    ['doa', 'door'],
    ['erebehtah', 'elevator'],
    ['esukarehtah', 'escalator'],
    ['inku', 'ink'],
    ['pen', 'pen'],
    ['bohrupen', 'ball-point pen'],
    ['nohto', 'notebook'],
    ['kabah', 'book cover'],
    ['botan', 'button'],
    ['beruto', 'belt'],
    ['pasokon', 'personal computer'],
    ['pinku', 'pink'],
    ['orenji', 'orange'],
    ['supohtsu', 'sport'],
    ['shisutemu', 'system']
]


var katakanaWordList = [
    new Word("gurasu", "glass", KATAKANA),
    new Word("minibah", "minibar", KATAKANA),
    new Word('shiatsu', 'shirt', KATAKANA),
    new Word('nekutai', '(neck)tie', KATAKANA),
    new Word('tahminaru', 'terminal', KATAKANA),
    ...katakanaWordsFromData.map(([romanji, english]) => new Word(romanji, english, KATAKANA))
]

export { hiraganaWordList, katakanaWordList }
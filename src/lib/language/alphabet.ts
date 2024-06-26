import { Character } from './character'

type CharacterData = [number, string, string] | [number, string]

class Alphabet {
    characters: Record<string, Character>

    constructor(data: CharacterData[]) {
        const characters: Record<string, Character> = {}
        for (var i = 0; i < data.length; i++) {
            characters[data[i][1]] = new Character(data[i][1], data[i][0], {
                phonetic: data[i][2]
            })
        }
        this.characters = characters
    }

    get identifiers() {
        return Object.keys(this.characters)
    }

    get characterArray(): Character[] {
        return Object.values(this.characters)
    }

    get constanents() {
        var output = []
        var all = this.characterArray.map(function (character: Character) { return character.constanent })
        for (var i = 0; i < all.length; i++) {
            if (output.indexOf(all[i]) === -1) { output.push(all[i]) }
        }
        return output
    }

    decode(input: string) {
        var decodedCharacters: (Character | string)[] = [];
        var that = this

        function getNextCharacter() {
            //TO DO - check for identifiers that are substrings of another 
            var characterLength = 0,
                phonetic: string, section: string;
            for (var i = 0; i < that.identifiers.length; i++) {
                characterLength = that.identifiers[i].length

                section = input.substring(0, that.identifiers[i].length).toUpperCase()


                if (section == that.identifiers[i]) {
                    decodedCharacters.push(that.characters[that.identifiers[i]])
                    input = input.substring(section.length)
                    return
                }

                phonetic = that.characters[that.identifiers[i]].phonetic
                section = input.substring(0, phonetic.length).toUpperCase()
                if (section == phonetic) {
                    decodedCharacters.push(that.characters[that.identifiers[i]])
                    input = input.substring(section.length)
                    return
                }
            }
            decodedCharacters.push(input.substring(0, 1))
            input = input.substring(1)
        }

        while (input.length > 0) {
            getNextCharacter()
        }

        return decodedCharacters
    }

    write(input: string, options = {}) {
        var characters = this.decode(input)

        var output = ""
        for (var i = 0; i < characters.length; i++) {
            const character = characters[i]
            if (typeof character === 'string') {
                output += character
                continue
            }
            output += character.string
        }
        return output
    }

    random(filterFunction: { (predicate: Character, index?: number): boolean }) {
        var set = filterFunction ? this.characterArray.filter(filterFunction) : this.characterArray
        var i = Math.floor(Math.random() * set.length)
        return set[i]
    }

    romaniseWord(japanese: string) {
        const charactersInWord = japanese.split('')
            .map((symb) => this.characterArray
                .find(char => char.string === symb))
        const romanisedSymbols = charactersInWord
            .map(maybeChar => maybeChar?.phonetic ?? "")
        return romanisedSymbols
            .join('')
            .toLowerCase()
    }
}


export { Alphabet }
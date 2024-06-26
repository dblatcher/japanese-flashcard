class Character {
    identifier: string
    charCode: number
    phonetic: string

    constructor(identifier: string, charCode: number, config: {
        phonetic?: string
    }) {
        if (!config) { config = {} }
        this.identifier = identifier.toUpperCase()
        this.charCode = charCode
        this.phonetic = config.phonetic || identifier
    }

    get vowel() {
        if (this.identifier.length === 1) {
            return ["A", "E", "I", "O", "U"].indexOf(this.identifier) !== -1 ? this.identifier : ""
        }
        return this.identifier.charAt(1)
    }

    get constanent() {
        if (this.identifier.length === 1) {
            return ["A", "E", "I", "O", "U"].indexOf(this.identifier) === -1 ? this.identifier : ""
        }
        return this.identifier.charAt(0)
    }

    get html() {
        return "&#" + this.charCode + ";"
    }
    get string() {
        return String.fromCharCode(this.charCode)
    }
}

export { Character }
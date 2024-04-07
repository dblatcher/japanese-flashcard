
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


    get span() {
        var node = document.createElement('span')
        node.innerHTML = this.html
        return node
    }

    get phoneticSpan() {
        var node = document.createElement('span')
        node.innerHTML = this.phonetic
        return node
    }
}

export { Character }
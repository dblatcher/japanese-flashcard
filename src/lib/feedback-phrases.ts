
export const LETS_START = "はじめましょう";

const PHRASES = {
    "Congratulations! Perfect score!": "おめでとうございます！満点です!",
    "Not bad at all!": "全然悪くないよ！",
    "keep trying!": "頑張ってください！",
} as const

export const scoreComment = (score: number, total: number) => {

    const ratio = score / total;

    if (ratio === 1) {
        return PHRASES['Congratulations! Perfect score!']
    }

    if (ratio >= .8) {
        return PHRASES['Not bad at all!']
    }

    return PHRASES['keep trying!']

}
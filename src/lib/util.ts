export const pickAtRandom = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

export const shuffle = <T,>(list: T[]): T[] => [...list].sort(function (a, b) { return Math.random() - Math.random() })

export const pickManyAtRandom = <T,>(amount: number, list: T[]): T[] => {
    const picked: T[] = []
    const pool = [...list]
    while (pool.length > 0 && picked.length < amount) {
        const nextPick = pickAtRandom(pool)
        picked.push(nextPick)
        pool.splice(pool.indexOf(nextPick), 1)
    }
    return picked
}
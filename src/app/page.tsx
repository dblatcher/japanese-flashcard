import { hiraganaWordList, katakanaWordList } from "@/lib/wordlists";
import styles from "./page.module.css";
import Link from "next/link";
import { SyllableCard } from "@/components/SyllableCard";
import { HIRAGANA } from "@/lib/language/hiragana";

export default function Home() {

  const hiraganaWord = hiraganaWordList[0]
  const katakanaWord = katakanaWordList[1]


  return (
    <main className={styles.main}>
      <h1>Japanese Flashcards</h1>
      <span>フラッシュカード</span>
      <SyllableCard character={HIRAGANA.characters['O']} />
      <SyllableCard character={HIRAGANA.characters['A']} />
      <SyllableCard character={HIRAGANA.characters['KI']} />

      <p>{hiraganaWord.text}, {hiraganaWord.translation}</p>
      <p>{hiraganaWord.write()}</p>

      <p>{katakanaWord.text}, {katakanaWord.translation}</p>
      <p>{katakanaWord.write()}</p>
      <Link href="/about">about page</Link>
    </main>
  );
}

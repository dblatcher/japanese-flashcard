import { hiraganaWordList, katakanaWordList } from "@/lib/wordlists";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

  const hiraganaWord = hiraganaWordList[0]
  const katakanaWord = katakanaWordList[1]


  return (
    <main className={styles.main}>
      <h1>Japanese Flashcards</h1>

      <p>{hiraganaWord.text}, {hiraganaWord.translation}</p>
      <p>{hiraganaWord.write()}</p>

      <p>{katakanaWord.text}, {katakanaWord.translation}</p>
      <p>{katakanaWord.write()}</p>
      <Link href="/about">about page</Link>
    </main>
  );
}

import { AlphabetGrid } from "@/components/AlphabetGrid";
import { HIRAGANA } from "@/lib/language/hiragana";
import { hiraganaWordList, katakanaWordList } from "@/lib/wordlists";
import Link from "next/link";
import styles from "./page.module.css";
import { KATAKANA } from "@/lib/language/katakana";
import { TalkingTile } from "@/components/TalkingTile";
import { Box } from "@mui/material";

export default function Home() {

  const hiraganaWord = hiraganaWordList[0]
  const katakanaWord = katakanaWordList[1]


  return (
    <main className={styles.main}>
      <h1>Japanese Flashcards</h1>
      <span>フラッシュカード</span>


      <p>{hiraganaWord.text}, {hiraganaWord.translation}</p>
      <p>{hiraganaWord.write()}</p>

      <p>{katakanaWord.text}, {katakanaWord.translation}</p>
      <p>{katakanaWord.write()}</p>
      <Link href="/about">about page</Link>
      <Link href="/learn-characters">learn characters</Link>

      <Box>
        <TalkingTile identifier="NI" />
        <TalkingTile identifier="WA" />
      </Box>

      <AlphabetGrid alphabet={HIRAGANA} />
      <AlphabetGrid alphabet={KATAKANA} />
    </main>
  );
}

import { AlphabetGrid } from "@/components/AlphabetGrid";
import { PageMain } from "@/components/layout/PageMain";
import { HIRAGANA } from "@/lib/language/hiragana";
import { KATAKANA } from "@/lib/language/katakana";
import { hiraganaWordList, katakanaWordList } from "@/lib/wordlists";

export default function Home() {

  const hiraganaWord = hiraganaWordList[0]
  const katakanaWord = katakanaWordList[1]


  return (
    <PageMain>

      <p>{hiraganaWord.text}, {hiraganaWord.translation}</p>
      <p>{hiraganaWord.write()}</p>

      <p>{katakanaWord.text}, {katakanaWord.translation}</p>
      <p>{katakanaWord.write()}</p>

      <AlphabetGrid alphabet={HIRAGANA} />
      <AlphabetGrid alphabet={KATAKANA} />
    </PageMain>
  );
}

import { AlphabetGrid } from "@/components/AlphabetGrid";
import { WordCard } from "@/components/WordCard";
import { PageMain } from "@/components/layout/PageMain";
import { HIRAGANA } from "@/lib/language/hiragana";
import { KATAKANA } from "@/lib/language/katakana";
import { hiraganaWordList, katakanaWordList } from "@/lib/wordlists";
import { Box, Typography } from "@mui/material";

export default function Home() {

  const hiraganaWord = hiraganaWordList[3]
  const katakanaWord = katakanaWordList[3]


  return (
    <PageMain>
      <Box display='flex' flexWrap='wrap' gap={2}>
        <WordCard word={katakanaWord} />
        <WordCard word={hiraganaWord} />
      </Box>

      <Box display='flex' flexWrap='wrap' gap={2} justifyContent='space-between'>
        <Box>
          <Typography variant="h2">HIRAGANA</Typography>
          <AlphabetGrid alphabet={HIRAGANA} />
        </Box>
        <Box>
          <Typography variant="h2">KATAKANA</Typography>
          <AlphabetGrid alphabet={KATAKANA} />
        </Box>
      </Box>
    </PageMain>
  );
}

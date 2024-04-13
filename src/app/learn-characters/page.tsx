import { CharacterGame } from "@/components/CharacterGame";
import styles from "../page.module.css";

export default function LearnCharacters() {
  return (
    <main className={styles.main}>
      <h1>Japanese Flashcards</h1>
      <CharacterGame />
    </main>
  );
}

import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Japanese Flashcards</h1>
      <div>placeholder</div>
      <Link href="/about">about page</Link>
    </main>
  );
}

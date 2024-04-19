import { Box, Typography } from "@mui/material";
import styles from "../page.module.css";

export default function About() {
  return (
    <main className={styles.main}>
      <Box>
        <Typography>This a free web app to help you learn your Japanese characters.</Typography>
        <Typography>I wrote it to practise them myself.</Typography>
      </Box>
    </main>
  );
}

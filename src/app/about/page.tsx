import { PageMain } from "@/components/layout/PageMain";
import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <PageMain>
      <Box>
        <Typography>This a free web app to help you learn your Japanese characters.</Typography>
        <Typography>I wrote it to practise them myself.</Typography>
      </Box>
    </PageMain>
  );
}

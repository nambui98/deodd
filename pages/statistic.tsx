import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useDashboardStat } from "hooks/useDashboardStat";
import { StreakSection } from "@/templates/statistic/StreakSection";
import { FlipResultSection } from "@/templates/statistic/FlipResultSection";
import { TotalSection } from "@/templates/statistic/TotalSection";

export default function Statistic() {
  const { error, flipDashboardStat, streak, userFlipStat } =
    useDashboardStat();

  return (
    <Container sx={{ mt: 2, mb: { md: 10, xs: 8.125 } }}>
      <Typography variant="h2" mb={3} fontWeight={{ md: 500, xs: 700 }}>
        Today stat
      </Typography>
      <Box
        display={"grid"}
        rowGap={3}
        columnGap={4}
        gridTemplateColumns={"repeat(6, 1fr)"}
      >
        <StreakSection error={error} streak={streak} />
        <FlipResultSection
          error={error}
          flipDashboardStat={flipDashboardStat}
        />
        <TotalSection
          error={error}
          flipDashboardStat={flipDashboardStat}
          userFlipStat={userFlipStat}
        />
      </Box>
    </Container>
  );
}

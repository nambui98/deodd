import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useDashboardStat } from "hooks/useDashboardStat";
import { StreakSection } from "@/templates/statistic/StreakSection";
import { FlipResultSection } from "@/templates/statistic/FlipResultSection";
import { TotalSection } from "@/templates/statistic/TotalSection";

export default function Statistic() {
  const { error, flipDashboardStat, streak, userPerFlip, totalUser } =
    useDashboardStat();

  return (
    <Container sx={{ mt: { md: 5, xs: 2 }, mb: { md: 10, xs: 8.125 } }}>
      <Typography variant="h2" mb={3} fontWeight={{ md: 500, xs: 700 }}>
        Today stat
      </Typography>
      <Grid container spacing={2}>
        <StreakSection error={error} streak={streak} />
        <FlipResultSection
          error={error}
          flipDashboardStat={flipDashboardStat}
        />
        <TotalSection
          error={error}
          flipDashboardStat={flipDashboardStat}
          userPerFlip={userPerFlip}
          totalUser={totalUser}
        />
      </Grid>
    </Container>
  );
}

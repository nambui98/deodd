import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { StreakSection } from "@/templates/statistic/StreakSection";
import { FlipResultSection } from "@/templates/statistic/FlipResultSection";
import { TotalSection } from "@/templates/statistic/TotalSection";
import DashboardProvider from "contexts/DashboardContext";

export default function Statistic() {

  return (
    <DashboardProvider>
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
          <StreakSection />
          <FlipResultSection />
          <TotalSection />
        </Box>
      </Container>
    </DashboardProvider>
  );
}

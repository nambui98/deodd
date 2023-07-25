import React from "react";
import { Container, Typography, Box, Stack, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useDashboardStat } from "hooks/useDashboardStat";
import { StreakSection } from "@/templates/statistic/StreakSection";
import { FlipResultSection } from "@/templates/statistic/FlipResultSection";
import { TotalSection } from "@/templates/statistic/TotalSection";

export default function Statistic() {
  const { error, flipDashboardStat, streak, userFlipStat, timeStatus, setTimeStatus } =
    useDashboardStat();

  return (
    <Container sx={{ mt: 2, mb: { md: 10, xs: 8.125 } }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant="h2" mb={3} fontWeight={{ md: 500, xs: 700 }}>
          Today stat
        </Typography>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeStatus}
          sx={{
            // backgroundColor: "background.paper",
            border: '0px solid',
            borderColor: 'background.paper',
            borderRadius: 2,
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none'
            },
            fontSize: 16,

            // bgcolor: 'background.default',
            'div': {
              py: "12px",
              fontSize: 16,
            }
          }}
          onChange={(event: SelectChangeEvent) => {
            setTimeStatus(event.target.value as 'UNTIL_NOW' | 'TODAY')
          }}
        >
          <MenuItem value={'UNTIL_NOW'}>Until now</MenuItem>
          <MenuItem value={'TODAY'}>Today</MenuItem>
        </Select>
      </Stack>
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

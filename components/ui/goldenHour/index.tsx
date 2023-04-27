import { Stack, Typography, Box } from "@mui/material";
import { useGoldenHour } from "hooks/useGoldenHour";
import { InfoCircleIcon } from "utils/Icons";

export function GoldenHour() {
  const { displayTime, isGoldenHour } = useGoldenHour();

  return (
    <Stack width={'100%'} alignItems={isGoldenHour ? "center" : "initial"}>
      <Typography variant='body2' color={'primary.200'} >{isGoldenHour ? "Golden Hour" : "Golden Hour starts in"}</Typography>
      <Typography variant='h3' fontWeight={600} color={'primary.200'} >{displayTime}</Typography>
      <Box sx={{ position: "absolute", top: "50%", right: "0.75rem", transform: "translateY(-42%)" }}>
        <InfoCircleIcon />
      </Box>
    </Stack>
  );
}
import { Typography } from "@mui/material";
import { useGoldenHour } from "hooks/useGoldenHour";

export function CountdownTimer() {
  const { displayTime } = useGoldenHour();

  return (
    <Typography variant='h3' fontWeight={600} color={'primary.200'}>{displayTime}</Typography>
  );
}
import { Typography } from "@mui/material";
import { useGoldenHour } from "hooks/useGoldenHour";

export function CountdownTimer() {
  const { displayTime } = useGoldenHour();
  if (process.env.NEXT_PUBLIC_RELEASE_EARLY && JSON.parse(process.env.NEXT_PUBLIC_RELEASE_EARLY)) {
    return (
      <Typography variant='h3' fontWeight={600} color={'primary.200'}>00:00:00</Typography>
    );
  }
  return (
    <Typography variant='h3' fontWeight={600} color={'primary.200'}>{displayTime}</Typography>
  );
}
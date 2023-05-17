import { Typography } from "@mui/material";
import { useGoldenHour } from "hooks/useGoldenHour";
import { TypographyProps } from "@mui/material";

export function CountdownTimer(props: TypographyProps) {
  const { displayTime } = useGoldenHour();
  if (process.env.NEXT_PUBLIC_RELEASE_EARLY && JSON.parse(process.env.NEXT_PUBLIC_RELEASE_EARLY)) {
    return (
      <Typography variant='h3' {...props}>00:00:00</Typography>
    );
  }
  return (
    <Typography variant='h3' {...props}>{displayTime}</Typography>
  );
}
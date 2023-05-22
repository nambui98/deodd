import { Typography } from "@mui/material";
import { useGoldenHour } from "hooks/useGoldenHour";
import { TypographyProps } from "@mui/material";

export function CountdownTimer(props: TypographyProps) {
  const { displayTime } = useGoldenHour();

  return (
    <Typography variant='h3' {...props}>{displayTime}</Typography>
  );
}
import { Typography } from "@mui/material";

// This component is to be used with absolute position parents in order to make the content perfectly center.
export function TitleTextAbsolute({ text }: { text: string }) {
  return (
    <Typography
      top={"1rem"}
      left={"1rem"}
      position={"absolute"}
      textTransform={"uppercase"}
      variant="body2"
    >
      {text}
    </Typography>
  );
}

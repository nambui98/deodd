import { Box } from "@mui/material";
import { BoxProps } from "@mui/material";

export function DashboardCard(props: BoxProps) {
  return (
    <Box
      p={2}
      bgcolor={"secondary.300"}
      borderRadius={"0.5rem"}
      display={"flex"}
      alignItems={"center"}
      {...props}
    >
      {props.children}
    </Box>
  );
}

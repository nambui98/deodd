import { Box } from "@mui/material";

type CardProps = {
  justifyContent?: any;
  position?: any;
  flexDirection?: any;
  sx?: {
    backgroundImage: string;
    backgroundSize?: string;
    backgroundRepeat?: string;
    backgroundPosition?: string;
  };
  height: string;
  children?: React.ReactNode;
};

export function DashboardCard(props: CardProps) {
  return (
    <Box
      p={2}
      bgcolor={"secondary.300"}
      borderRadius={1.5}
      display={"flex"}
      alignItems={"center"}
      {...props}
    >
      {props.children}
    </Box>
  );
}

import { Typography, Box } from "@mui/material";
import { Colors } from "constants/index";

type Props = {};

type ItemProps = {
  times: string;
  users: string;
  percentage: string;
};

function RowItem({ times, users, percentage }: ItemProps) {
  return (
    <Box
      display={"flex"}
      gap={3}
      justifyContent={"space-between"}
      flexGrow={"1"}
    >
      <Typography variant="body2" minWidth={"3rem"}>
        {times}
      </Typography>
      <Box display={"flex"} alignItems={"center"} width={"100%"}>
        <Box
          width={"100%"}
          height={"0.25rem"}
          bgcolor={Colors.secondaryDark}
          borderRadius={"100vh"}
        >
          <Box
            width={percentage}
            bgcolor={Colors.primaryDark}
            height={"100%"}
            borderRadius={"100vh"}
          ></Box>
        </Box>
      </Box>
      <Box display={"flex"} gap={2} minWidth={"6.75rem"} textAlign="right">
        <Typography variant="body2" flex={1}>
          {users}
        </Typography>
        <Typography variant="body2" flex={0.5}>
          {+parseFloat(percentage).toFixed(0)}%
        </Typography>
      </Box>
    </Box>
  );
}

export function FlipPerUserTable({}: Props) {
  return (
    <Box
      sx={{
        paddingInline: { xs: 0, sm: 1, md: 3 },
        width: "100%",
        mt: 3,
        maxHeight: "25rem",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mb={2}
        bgcolor={"secondary.300"}
        sx={{ position: "sticky", top: "0px", paddingBlockEnd: 2 }}
      >
        <Typography variant="body2" textTransform={"uppercase"}>
          times
        </Typography>
        <Typography variant="body2" textTransform={"uppercase"}>
          users
        </Typography>
      </Box>

      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <RowItem times="0-5" users="522322" percentage="50%" />
        <RowItem times="0-5" users="522322" percentage="50%" />
        <RowItem times="0-5" users="3213" percentage="3%" />
        <RowItem times="0-5" users="522322" percentage="80%" />
        <RowItem times="0-5" users="522322" percentage="65.12%" />
        <RowItem times="0-5" users="522322" percentage="5%" />
        <RowItem times="0-5" users="522322" percentage="10%" />
        <RowItem times="30-35" users="522322" percentage="50%" />
        <RowItem times="40-45" users="522322" percentage="20%" />
        <RowItem times="45-50" users="522322" percentage="50%" />
      </Box>
    </Box>
  );
}

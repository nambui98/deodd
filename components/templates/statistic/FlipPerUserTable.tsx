import { Typography, Box } from "@mui/material";
import { Colors } from "constants/index";

function RowItem({
  totalUser,
  times,
  percentage,
}: {
  totalUser: number;
  times: string;
  percentage: number;
}) {
  return (
    <Box
      sx={{
        gap: { xs: 1, sm: 2, md: 3 },
      }}
      width={1}
      display={"flex"}
      gap={1}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography variant="body2" minWidth={"3rem"}>
        {times}
      </Typography>
      <Box height={1} width={1}>
        <Box
          width={1}
          height={"0.25rem"}
          bgcolor={Colors.secondary}
          borderRadius={"100vh"}
        >
          <Box
            width={`${percentage}%`}
            bgcolor={Colors.primaryDark}
            height={1}
            borderRadius={"100vh"}
          ></Box>
        </Box>
      </Box>
      <Typography variant="body2">{totalUser}</Typography>
      <Typography variant="body2" minWidth={"2.3rem"} textAlign={"right"}>
        {percentage}%
      </Typography>
    </Box>
  );
}

type FlipPerUserType = {
  error: {
    haveFlipped: boolean;
    errorMessage: string;
  };
  userPerFlip: any;
  totalUser: number;
};

export function FlipPerUserTable({
  userPerFlip,
  totalUser,
  error,
}: FlipPerUserType) {
  return (
    <Box
      sx={{
        paddingInline: { xs: 1, sm: 2, md: 3 },
        width: "100%",
        mt: 3,
        height: "fit-content",
        maxHeight: "27rem",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mb={1.5}
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

      <Box
        width={1}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={3}
      >
        {error.haveFlipped ? (
          userPerFlip.map(
            ([property, value]: [string, number], index: number) => {
              return (
                <RowItem
                  key={index}
                  totalUser={totalUser}
                  times={property}
                  percentage={value}
                />
              );
            }
          )
        ) : (
          <Typography variant="h2" textAlign={"center"}>
            {error.errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

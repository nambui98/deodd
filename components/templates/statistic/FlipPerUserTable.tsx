import { Typography, Box } from "@mui/material";
import { Colors } from "constants/index";

function RowItem({
  times,
  percentage,
  count,
}: {
  times: string;
  percentage: number;
  count: number;
}) {
  return (
    <>
      <Typography variant="body2" lineHeight={"1.375rem"}>
        {times}
      </Typography>
      <Box display={"flex"} alignItems={"center"} px={{ xs: 0, sm: 2, md: 3.75 }}>
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
      <Typography variant="body2" textAlign={"right"} lineHeight={"1.375rem"} pr={0.75}>{count}</Typography>
      <Typography variant="body2" textAlign={"right"} lineHeight={"1.375rem"} fontSize={"0.75rem"}>
        {percentage}%
      </Typography>
    </>
  );
}

type FlipPerUserType = {
  error: {
    haveFlipped: boolean;
    errorMessage: string;
  };
  userFlipStat: any;
};

export function FlipPerUserTable({
  userFlipStat,
  error,
}: FlipPerUserType) {
  return (
    <Box
      sx={{
        paddingInline: { xs: 1, sm: 2, md: 3 },
        width: "100%",
        mt: 3.25,
        height: { xs: "fit-content", md: "100%" },
        maxHeight: "22.875rem",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        bgcolor={"secondary.300"}
        sx={{ position: "sticky", top: "0px", paddingBlockEnd: 2 }}
      >
        <Typography variant="body2" textTransform={"uppercase"} lineHeight={"1.375rem"}>
          times
        </Typography>
        <Typography variant="body2" textTransform={"uppercase"} lineHeight={"1.375rem"}>
          flip
        </Typography>
      </Box>

      {error.haveFlipped ? (<Box
        width={1}
        display={"grid"}
        gridTemplateColumns={"auto 1fr auto auto"}
        alignItems={"center"}
        rowGap={1.5}
        columnGap={1.25}
      >

        {userFlipStat.map(
          ([property, { percentFlip, numberFlip }]: [string, { percentFlip: number, numberFlip: number }], index: number) => {
            return (
              <RowItem
                key={index}
                times={property}
                percentage={percentFlip}
                count={numberFlip}
              />
            );
          }
        )}

      </Box>) : (
        <Typography
          variant="h2"
          textAlign={"center"}
          width={1}
          // Center the text when the viewport is bigger. This is a temporary implementation, still thinking of better solution.
          sx={theme => ({
            [theme.breakpoints.up("xs").replace("@media", "@container")]: {
              paddingBlockEnd: "2rem",
            },
            [theme.breakpoints.up("md").replace("@media", "@container")]: {
              paddingBlockEnd: 0,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -100%)",
              position: "absolute",
            },
          })}>
          {error.errorMessage}
        </Typography>
      )}
    </Box>
  );
}

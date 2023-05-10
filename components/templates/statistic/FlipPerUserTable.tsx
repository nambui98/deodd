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
      <Typography variant="body2">
        {times}
      </Typography>
      <Box display={"flex"} alignItems={"center"}>
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
      <Typography variant="body2" textAlign={"right"}>{count}</Typography>
      <Typography variant="body2" textAlign={"right"}>
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
        mt: 3,
        height: { xs: "fit-content", md: "100%" },
        maxHeight: "27rem",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
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
          flip
        </Typography>
      </Box>

      {error.haveFlipped ? (<Box
        width={1}
        display={"grid"}
        gridTemplateColumns={"auto 1fr auto auto"}
        alignItems={"center"}
        gap={3}
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
          sx={
            {
              paddingBlockEnd: { xs: "2rem", md: 0 }, top: { md: "50%" }, left: { md: "50%" }, transform: { md: "translate(-50%, -100%)" }, position: { md: "absolute" }
            }
          }>
          {error.errorMessage}
        </Typography>
      )}
    </Box>
  );
}

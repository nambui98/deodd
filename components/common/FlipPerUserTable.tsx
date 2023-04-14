import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Colors } from "constants/index";
import { getFlipPerUser } from "libs/apis/statisticapi";

type Props = {};

function RowItems({
  userPerFlip,
  totalUser,
}: {
  userPerFlip: any;
  totalUser: number;
}) {
  return (
    <Box
      display={"flex"}
      flexGrow={"1"}
      sx={{
        gap: {
          xs: 2,
          sm: 3,
        },
      }}
    >
      <Box
        display={"flex"}
        width={"100%"}
        sx={{
          gap: {
            xs: 1,
            sm: 3,
          },
        }}
      >
        <Box
          minWidth={"fit-content"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
        >
          {Object.keys(userPerFlip).map((element: string, index: number) => {
            return (
              <Typography key={index} variant="body2">
                {element}
              </Typography>
            );
          })}
        </Box>
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
        >
          {Object.values(userPerFlip).map((element: any, index: number) => {
            return (
              <Box
                key={index}
                display={"flex"}
                height={"100%"}
                alignItems={"center"}
              >
                <Box
                  width={"100%"}
                  height={"0.25rem"}
                  bgcolor={Colors.secondaryDark}
                  borderRadius={"100vh"}
                >
                  <Box
                    width={`${element}%`}
                    bgcolor={Colors.primaryDark}
                    height={"100%"}
                    borderRadius={"100vh"}
                  ></Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box minWidth={"fit-content"} display={"flex"} gap={2} textAlign="right">
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          {Object.values(userPerFlip).map((element, index: number) => {
            return (
              <Typography key={index} variant="body2" width={1}>
                {totalUser}
              </Typography>
            );
          })}
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          {Object.values(userPerFlip).map((element: any, index: number) => {
            return (
              <Typography key={index} variant="body2" minWidth={"fit-content"}>
                {+parseFloat(element).toFixed(0)}%
              </Typography>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export function FlipPerUserTable({}: Props) {
  const [userPerFlip, setUserPerFlip] = useState({});
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    async function returnFlipPerUser() {
      const promiseResult = await getFlipPerUser();
      const data = promiseResult.data.data;
      setUserPerFlip(data.userPerFlip);
      setTotalUser(data.totalUser);
    }
    returnFlipPerUser();
  }, []);

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

      <RowItems totalUser={totalUser} userPerFlip={userPerFlip} />
    </Box>
  );
}

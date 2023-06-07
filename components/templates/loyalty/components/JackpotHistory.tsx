import { Box, Stack, Typography } from "@mui/material";
import { Convert } from "utils/convert";
import Image from "next/image";
import { BnbIcon } from "utils/Icons";
import { CoinEmptyImage } from "utils/Images";

type PropsType = {
  history: {
    endTime: string;
    jackpot: number;
    startTime: string;
    tossPointRequire: number;
    userTossPoint: number;
    winnerAvatarId: number;
    winnerUserName: string;
    winnerWallet: string;
  };
};

function JackpotHistory({ history }: PropsType) {
  return (
    <Stack
      direction={"row"}
      justifyContent={history != null ? "space-between" : "center"}
      bgcolor={"background.paper"}
      p={2}
      borderRadius={3}
      height={history != null ? 215 : 384}
    >
      {history && (
        <>
          <Stack justifyContent={"space-between"}>
            <Stack gap={1}>
              <Typography variant="body2" lineHeight={"1.25rem"}>
                Your TossPoint
              </Typography>
              <Typography fontSize={"2.5rem"} fontWeight={500}>
                9.500
              </Typography>
            </Stack>
            <Stack gap={0.5}>
              <Typography
                fontSize={"0.75rem"}
                lineHeight={"1rem"}
                fontWeight={400}
                color={"text.secondary"}
              >
                Winner
              </Typography>
              <Typography variant="body2" lineHeight={"1.25rem"}>
                {history.winnerUserName} (
                {Convert.convertWalletAddress(history.winnerWallet, 5, 4)})
              </Typography>
              <Typography
                variant="h2"
                lineHeight={"2rem"}
                color={"text.secondary"}
              >
                {history.userTossPoint} <BnbIcon width={24} />
              </Typography>
            </Stack>
          </Stack>
          <Stack justifyContent={"space-between"}>
            <Stack gap={1}>
              <Typography variant="body2" lineHeight={"1.25rem"}>
                TossPoint Required
              </Typography>
              <Typography fontSize={"2.5rem"} fontWeight={500}>
                {history.tossPointRequire}
              </Typography>
            </Stack>
            <Stack gap={0.5}>
              <Typography
                fontSize={"0.75rem"}
                lineHeight={"1rem"}
                fontWeight={400}
                color={"text.disabled"}
              >
                Start
              </Typography>
              <Typography variant="body2" lineHeight={"1.25rem"}>
                {new Intl.DateTimeFormat(undefined, {
                  hour12: false,
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(history.startTime))}
              </Typography>
              <Typography
                fontSize={"0.75rem"}
                lineHeight={"1rem"}
                fontWeight={400}
                color={"text.disabled"}
              >
                End
              </Typography>
              <Typography variant="body2" lineHeight={"1.25rem"}>
                {new Intl.DateTimeFormat(undefined, {
                  hour12: false,
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(history.endTime))}
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
      {!history && (
        <>
          <Stack
            sx={{ inset: 0 }}
            gap={5}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
          >
            <Image
              width={144}
              height={144}
              src={CoinEmptyImage}
              alt="Empty Coin Image"
            />
            <Typography
              fontSize={"1rem"}
              lineHeight={"1.375rem"}
              fontWeight={600}
              color={"secondary.100"}
            >
              This season&apos;s information hasn&apos;t been updated yet
            </Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default JackpotHistory;

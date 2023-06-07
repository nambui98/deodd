import { Box, Stack, Typography } from "@mui/material";
import { Convert } from "utils/convert";
import Image from "next/image";
import { BnbIcon } from "utils/Icons";
import { CoinEmptyImage } from "utils/Images";
import { LoyaltyJackpotHistoryType } from "libs/types";
import { getPathAvatar } from "utils/checkAvatar";

type PropsType = {
  history: LoyaltyJackpotHistoryType;
};

function formatNumber(number: number) {
  return new Intl.NumberFormat("en-us").format(
    Math.round(number * 1000) / 1000
  );
}

function formatDate(dateString: string) {
  const dateObject = new Date(dateString);
  const date = dateObject.toLocaleDateString("vi", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hour = dateObject.toLocaleTimeString(undefined, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${hour} - ${date}`;
}

function JackpotHistory({ history }: PropsType) {
  return (
    <Stack
      direction={"row"}
      justifyContent={history.endTime != null ? "space-between" : "center"}
      bgcolor={"background.paper"}
      p={2}
      borderRadius={3}
      height={history.endTime != null ? 215 : 384}
    >
      {history.endTime && (
        <>
          <Stack justifyContent={"space-between"}>
            <Stack gap={1}>
              <Typography variant="body2" lineHeight={"1.25rem"}>
                Your TossPoint
              </Typography>
              <Typography fontSize={"2.5rem"} fontWeight={500}>
                {formatNumber(history.userTossPoint) ?? 0}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={1}>
              <Image
                src={getPathAvatar(history.winnerAvatarId)}
                width={24}
                height={24}
                alt="Winner Avatar"
              />
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
                <Stack direction={"row"} gap={1} color={"text.secondary"}>
                  <Typography variant="h2" lineHeight={"2rem"}>
                    {formatNumber(history.jackpot)}
                  </Typography>
                  <BnbIcon width={24} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack justifyContent={"space-between"}>
            <Stack gap={1}>
              <Typography variant="body2" lineHeight={"1.25rem"}>
                TossPoint Required
              </Typography>
              <Typography fontSize={"2.5rem"} fontWeight={500}>
                {formatNumber(history.tossPointRequire)}
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
                {formatDate(history.startTime)}
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
                {formatDate(history.endTime)}
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
      {!history.endTime && (
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

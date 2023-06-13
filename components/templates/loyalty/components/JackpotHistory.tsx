import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { Convert } from "utils/convert";
import Image from "next/image";
import MyImage from "components/ui/image";
import { BnbIcon } from "utils/Icons";
import { CoinEmptyImage } from "utils/Images";
import {
  LoyaltyJackpotHistoryType,
  LoyaltyLoadingType,
} from "libs/types/loyaltyTypes";
import { getPathAvatar } from "utils/checkAvatar";
import { Format } from "utils/format";

type PropsType = {
  history: LoyaltyJackpotHistoryType;
  loading: LoyaltyLoadingType;
};

function formatNumber(number: number) {
  return new Intl.NumberFormat("en-us").format(
    Math.round(number * 1000) / 1000
  );
}

function formatDate(dateString: string) {
  const date = Format.formatDateTime(dateString);
  const hour = Format.formatDateTime(dateString, "kk:mm");
  return `${hour} - ${date}`;
}

function JackpotHistory({ history, loading }: PropsType) {
  return (
    <Stack
      direction={"row"}
      justifyContent={history.endTime != null ? "space-between" : "center"}
      bgcolor={"background.paper"}
      p={2}
      borderRadius={3}
      sx={{
        mx: { xs: 2, md: 0 },
        height: { xs: 218, md: history.endTime != null ? 218 : 384 },
      }}
    >
      {loading.history && (
        <Stack
          height={1}
          width={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress size={40} color="secondary" />
        </Stack>
      )}
      {!loading.history && history.endTime && (
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
      {!loading.history && !history.endTime && (
        <>
          <Stack
            sx={{ inset: 0 }}
            gap={5}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
          >
            <MyImage
              sx={{
                width: { xs: 80, md: 144 },
                height: { xs: 80, md: 144 },
              }}
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
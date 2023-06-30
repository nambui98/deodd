import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { Convert } from "utils/convert";
import Image from "next/image";
import MyImage from "components/ui/image";
import { BnbIcon } from "utils/Icons";
import { CoinEmptyImage } from "utils/Images";
import { LoyaltyJackpotHistoryType } from "libs/types/loyaltyTypes";
import { getPathAvatar } from "utils/checkAvatar";
import { Format } from "utils/format";
import { UseQueryResult } from "@tanstack/react-query";

type PropsType = {
  history: UseQueryResult<LoyaltyJackpotHistoryType, unknown>;
};

function formatDate(dateString: string) {
  const date = Format.formatDateTimeAlt(dateString, "UTC", "MMMM dd, yyyy");
  const hour = Format.formatDateTimeAlt(dateString, "UTC", "kk:mm");
  return `${hour} - ${date}`;
}

function JackpotHistory({ history }: PropsType) {
  return (
    <Stack
      direction={"row"}
      justifyContent={
        history?.data?.endTime != null ? "space-between" : "center"
      }
      bgcolor={"background.paper"}
      p={2}
      borderRadius={3}
      sx={{
        mx: { xs: 2, md: 0 },
        height: { xs: 218, md: history?.data?.endTime != null ? 218 : 384 },
      }}
    >
      {history.isLoading && (
        <Stack
          height={1}
          width={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress size={40} color="secondary" />
        </Stack>
      )}
      {!history.isLoading && !history.isError && history.data.endTime && (
        <>
          <Stack justifyContent={"space-between"}>
            <Stack gap={1}>
              <Typography variant="body2" lineHeight={"1.25rem"}>
                Your TossPoint
              </Typography>
              <Typography fontSize={"2.5rem"} fontWeight={500}>
                {history.data.userTossPoint
                  ? Format.formatMoney(history.data.userTossPoint, 4)
                  : 0}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={1}>
              <Image
                src={getPathAvatar(history.data.winnerAvatarId)}
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
                  {history.data.winnerUserName ?? ""} (
                  {Convert.convertWalletAddress(
                    history.data.winnerWallet,
                    5,
                    4
                  )}
                  )
                </Typography>
                <Stack direction={"row"} gap={1} color={"text.secondary"}>
                  <Typography variant="h2" lineHeight={"2rem"}>
                    {Format.formatMoney(history.data.jackpot, 4)}
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
                {Format.formatMoney(history.data.tossPointRequire, 4)}
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
                {formatDate(history.data.startTime)}
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
                {formatDate(history.data.endTime)}
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
      {!history.isLoading && (history.isError || !history.data.endTime) && (
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

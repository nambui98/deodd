import { useEffect, useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import Image from "next/image";
import { BnbIcon, CloseSquareIcon2 } from "utils/Icons";
import { getPathAvatar } from "utils/checkAvatar";
import { Convert } from "utils/convert";
import { getJackpotBoom } from "libs/apis/loyaltyAPI";
import { Format } from "utils/format";
import { useQuery } from "@tanstack/react-query";

function JackpotPopup() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // Close the popup after 6 seconds.
  useEffect(() => {
    if (open) {
      const timeOut = setTimeout(() => {
        setOpen(false);
      }, 6000);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [open]);

  const { data: jackpotWinner } = useQuery({
    queryKey: ["jackpotWinner"],
    queryFn: async () => {
      const jackpotWinnerResult = await getJackpotBoom();
      if (
        jackpotWinnerResult.status === 200 &&
        jackpotWinnerResult.data.data != null
      ) {
        const jackpotWinnerData = jackpotWinnerResult.data.data;
        setOpen(true);
        return jackpotWinnerData;
      } else if (
        jackpotWinnerResult.status === 200 &&
        jackpotWinnerResult.data.data === null
      ) {
        throw new Error(jackpotWinnerResult.data.meta.error_message);
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 100500,
    refetchInterval: 110000, // refetch every less then 2 minutes
  });

  if (open && jackpotWinner) {
    return (
      <Box
        p={1.5}
        pr={8.5}
        bgcolor={"background.paper"}
        border={"1px solid"}
        borderColor={"border.main"}
        borderRadius={3}
        boxShadow={"0px 2px 16px rgba(254, 241, 86, 0.5);"}
        position={"fixed"}
        top={40}
        right={40}
        width={320}
        zIndex={9999}
      >
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            lineHeight: 0,
            color: "secondary.100",
            cursor: "pointer",
            transition: "transform 300ms",
            ":hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={handleClose}
        >
          <CloseSquareIcon2 width={16} />
        </Box>
        <Typography fontSize={"0.75rem"} fontWeight={400} lineHeight={"1rem"}>
          Jackpot season{" "}
          <Box component={"span"} color={"text.secondary"}>
            #{jackpotWinner.id < 10 ? `0${jackpotWinner.id}` : jackpotWinner.id}
          </Box>{" "}
          Ended!
        </Typography>
        <Stack direction={"row"} gap={1} mt={1}>
          <Image
            src={getPathAvatar(jackpotWinner.avatar_id)}
            width={24}
            height={24}
            alt="Avatar image"
          />
          <Stack gap={0.5}>
            <Typography
              fontSize={"0.75rem"}
              fontWeight={400}
              lineHeight={"1rem"}
              color={"text.secondary"}
            >
              Winner
            </Typography>
            <Typography
              fontSize={"0.875rem"}
              lineHeight={"1.25rem"}
              fontWeight={400}
            >
              {jackpotWinner.user_name ?? ""} (
              {Convert.convertWalletAddress(jackpotWinner.winner, 5, 4)})
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              color={"text.secondary"}
            >
              <Typography
                fontSize={"1rem"}
                fontWeight={600}
                lineHeight={"1.375rem"}
                sx={{
                  verticalAlign: "bottom",
                }}
              >
                {Format.formatMoney(jackpotWinner.reward)}
              </Typography>
              <BnbIcon width={20} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    );
  } else {
    return null;
  }
}

export default JackpotPopup;

import { useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import Image from "next/image";
import { BnbIcon, CloseSquareIcon2 } from "utils/Icons";
import { getPathAvatar } from "utils/checkAvatar";
import { Convert } from "utils/convert";

const dummyData = {
  // Remove me later
  season: 2,
  jackpotReward: 1000,
  username: "Whale",
  wallet: "0xFb90d8319043C00A0398aD197944FFB52ef18Bdb",
  avatarId: 1,
};

type PropsType = {
  handleClose: () => void;
}

function JackpotPopup({ handleClose }: PropsType) {

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
          #{dummyData.season}
        </Box>{" "}
        Ended!
      </Typography>
      <Stack direction={"row"} gap={1} mt={1}>
        <Image
          src={getPathAvatar(dummyData.avatarId)}
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
            {dummyData.username ?? ""} {dummyData.username ? "(" : ""}
            {Convert.convertWalletAddress(dummyData.wallet, 5, 4)}
            {dummyData.username ? ")" : ""}
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
              {new Intl.NumberFormat("en").format(dummyData.jackpotReward)}
            </Typography>
            <BnbIcon width={20} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default JackpotPopup;

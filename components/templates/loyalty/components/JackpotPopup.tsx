import MyModal from "components/common/Modal";
import { Typography, Box, Stack } from "@mui/material";
import Image from "next/image";
import { BnbIcon, CloseSquareIcon2 } from "utils/Icons";
import { toLineHeight } from "chart.js/dist/helpers/helpers.options";

function JackpotPopup() {
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
        }}
      >
        <CloseSquareIcon2 width={16} />
      </Box>
      <Typography fontSize={"0.75rem"} fontWeight={400} lineHeight={"1rem"}>
        Jackpot season{" "}
        <Box component={"span"} color={"text.secondary"}>
          #12
        </Box>{" "}
        Ended!
      </Typography>
      <Stack direction={"row"} gap={1} mt={1}>
        <Image src={""} width={24} height={24} alt="Avatar image" />
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
            Arlene McCoy (3535***3534)
          </Typography>
          <Typography
            fontSize={"1rem"}
            fontWeight={600}
            lineHeight={"1.375rem"}
            color={"text.secondary"}
          >
            1,108 <BnbIcon width={20} />
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default JackpotPopup;

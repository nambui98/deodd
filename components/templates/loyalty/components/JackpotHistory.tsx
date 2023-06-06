import { Box, Stack, Typography } from "@mui/material";
import { Convert } from "utils/convert";
import Image from "next/image";
import { BnbIcon } from "utils/Icons";

function JackpotHistory() {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      bgcolor={"background.paper"}
      p={2}
      borderRadius={3}
      height={215}
    >
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
            Arlene McCoy (3535***3534)
          </Typography>
          <Typography variant="h2" lineHeight={"2rem"} color={"text.secondary"}>
            1,108 <BnbIcon width={24} />
          </Typography>
        </Stack>
      </Stack>
      <Stack justifyContent={"space-between"}>
        <Stack gap={1}>
          <Typography variant="body2" lineHeight={"1.25rem"}>
            TossPoint Required
          </Typography>
          <Typography fontSize={"2.5rem"} fontWeight={500}>
            15.000
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
            15:14 - 22/10/2022
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
            17:53 - 14/12/2022
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default JackpotHistory;

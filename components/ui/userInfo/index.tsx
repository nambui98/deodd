import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { ArrowDownIcon, BnbIcon } from "utils/Icons";
import { Colors } from "constants";
import Image from "next/image";
import { Avatar2Image } from "utils/Images";

function FlipHistoryItem() {
  return (
    <Stack gap={0.5}>
      <Typography fontSize={"0.5rem"}>Claim all reward</Typography>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontSize={"0.875rem"} color={Colors.secondary}>
          -100 BNB
        </Typography>
        <Typography fontSize={"0.75rem"} color={Colors.secondary}>
          12 seconds ago
        </Typography>
      </Stack>
    </Stack>
  );
}

export function UserInfo() {
  return (
    <Accordion
      disableGutters
      sx={{
        maxWidth: "25rem",
        backgroundColor: "black",
        transform: "translateY(50%)",
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDownIcon fill="#F5F5FA" sx={{ border: "none" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack
          direction={"row"}
          spacing={2}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: "white" }}
            />
          }
        >
          <Stack direction={"row"} spacing={1}>
            <Typography
              fontSize={"0.75rem"}
              textTransform={"uppercase"}
              color={Colors.secondary}
            >
              balance
            </Typography>
            <Typography fontSize={"0.875rem"}>1.534</Typography>
            <BnbIcon fill={Colors.primaryDark} />
          </Stack>

          <Stack direction={"row"} spacing={1}>
            <Typography fontSize={"0.875rem"}>0xC90...fbF1</Typography>
            <Box
              sx={{
                borderRadius: "50%",
                width: "1.5rem",
                aspectRatio: "1",
                position: "relative",
              }}
              overflow={"hidden"}
            >
              <Image src={Avatar2Image} fill alt="avatar-image" />
            </Box>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <Stack direction={"row"} spacing={1}>
          <Button variant="contained" sx={{ width: "50%" }}>
            Profile
          </Button>
          <Button variant="contained" sx={{ width: "50%" }}>
            Assets
          </Button>
        </Stack>
        <Divider></Divider>
        <Typography fontSize={"0.875rem"} color={Colors.secondary}>
          Flipping History
        </Typography>
        <Stack
          p={1}
          gap={1}
          divider={<Divider flexItem sx={{ backgroundColor: "white" }} />}
        >
          <FlipHistoryItem />
          <FlipHistoryItem />
          <FlipHistoryItem />
          <FlipHistoryItem />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

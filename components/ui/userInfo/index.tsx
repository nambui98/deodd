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
import {
  ArchiveIcon,
  ArrowDownIcon,
  BnbIcon,
  ProfileCircleIcon,
} from "utils/Icons";
import { Colors } from "constants";
import Image from "next/image";
import { Avatar2Image } from "utils/Images";

function FlipHistoryItem() {
  return (
    <>
      <Stack gap={0.5} px={1}>
        <Typography variant="body2" fontSize={"0.75rem"}>
          Claim all reward
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="body2"
            fontSize={"0.875rem"}
            color={"text.disabled"}
          >
            -100 BNB
          </Typography>
          <Typography
            variant="body2"
            fontSize={"0.75rem"}
            color={"text.disabled"}
          >
            12 seconds ago
          </Typography>
        </Stack>
      </Stack>
      <Divider flexItem></Divider>
    </>
  );
}

export function UserInfo() {
  return (
    <Box>
      <Accordion
        disableGutters
        sx={{
          maxWidth: "25rem",
          backgroundColor: "primary.100",
          transform: "translateY(50%)",
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDownIcon fill="#F5F5FA" />}
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
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography
                variant="h3"
                fontSize={"0.75rem"}
                textTransform={"uppercase"}
                color={"text.disabled"}
              >
                balance
              </Typography>
              <Typography fontSize={"0.875rem"} variant="h3">
                1.534
              </Typography>
              <BnbIcon fill={Colors.primaryDark} />
            </Stack>

            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              paddingRight={1}
            >
              <Typography fontSize={"0.875rem"} variant="h3">
                0xC90...fbF1
              </Typography>
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
            <Button
              variant="contained"
              sx={{
                width: "50%",
                color: "secondary.100",
                backgroundColor: "#3F4251",
                fontSize: "0.875rem",
                fontWeight: "400",
              }}
              startIcon={<ProfileCircleIcon />}
            >
              Profile
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "50%",
                color: "secondary.100",
                backgroundColor: "#3F4251",
                fontSize: "0.875rem",
                fontWeight: "400",
              }}
              startIcon={<ArchiveIcon />}
            >
              Assets
            </Button>
          </Stack>
          <Divider></Divider>
          <Typography
            variant="h3"
            fontSize={"0.875rem"}
            color={"text.disabled"}
          >
            Flipping History
          </Typography>
          <Stack gap={1}>
            <FlipHistoryItem />
            <FlipHistoryItem />
            <FlipHistoryItem />
            <FlipHistoryItem />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

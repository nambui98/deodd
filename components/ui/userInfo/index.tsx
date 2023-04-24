import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Box,
  Divider,
  Button,
  ButtonProps,
} from "@mui/material";
import {
  ArchiveIcon,
  ArrowDownIcon,
  BnbIcon,
  ProfileCircleIcon,
  LogoutIcon,
} from "utils/Icons";
import { Colors } from "constants/index";
import Image from "next/image";
import { Avatar2Image } from "utils/Images";
import { useState } from "react";
import { Utils } from "@/utils/index";
import { Convert } from "utils/convert";
import { useWalletContext } from "contexts/WalletContext";
import { ethers } from "ethers";
import { Format } from "utils/format";
import Link from "next/link";
import { useDisconnect } from "wagmi";

function UserInfoButton(props: ButtonProps & { text: string }) {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        width: "50%",
        color: "secondary.100",
        backgroundColor: "#3F4251",
        fontSize: "0.875rem",
        fontWeight: "400",
        border: "none",
        svg: {
          stroke: "#96A5C0",
          transition: "0.3s"
        },
        "&:hover": {
          svg: {
            stroke: "#F5F5FA",
            fill: "#F5F5FA",
          },
          border: "none",
          backgroundColor: "neutral.A100",
          color: "secondary.600"
        },
      }}
      startIcon={props.startIcon}
    >
      {props.text}
    </Button>
  );
}



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
  const [expanded, setExpanded] = useState<boolean>(false);
  const { walletIsConnected, walletAddress, bnbBalance } = useWalletContext();

  const { disconnect } = useDisconnect()
  const handleChange = () => () => {
    setExpanded(!expanded);
  };
  if (walletIsConnected) {
    return null;
  } else {
    return (
      <Box position={"relative"} height={"3rem"} width={238} >
        <Accordion
          disableGutters
          expanded={expanded} onChange={handleChange()}
          sx={{
            backgroundColor: "primary.100",
            position: "absolute",
            top: 0,
            right: 2,
            transition: '.3s all',
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDownIcon fill="#F5F5FA" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              transition: '.3s all',
            }}
          >
            <Stack
              direction={"row"}
              gap={2}
            >
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography
                  variant="h3"
                  fontSize={"0.75rem"}
                  textTransform={"uppercase"}
                  color={"text.disabled"}
                  display={{ sm: 'inline', xs: 'none' }}
                >
                  balance
                </Typography>

                <Typography fontSize={"0.875rem"} variant="h3">
                  {/* 1.534 */}
                  {Format.formatMoneyFromBigNumberEther(bnbBalance)}
                </Typography>
                <BnbIcon fill={Colors.primaryDark} />

              </Stack>

              <Stack
                direction={"row"}
                gap={2}
                alignItems={"center"}
                sx={{
                  // opacity: !expanded ? 0 : 1,
                  transition: '.3s all',
                  width: { xs: expanded ? 1 : 0, xl: 1 },

                  display: { xs: expanded ? 'flex' : 'none', xl: 'flex' },

                }}
              >
                <Divider
                  orientation="vertical"
                  sx={{
                    width: '1.5px', backgroundColor: "primary.300",

                  }}
                />
                <Typography fontSize={"0.875rem"} variant="h3">
                  {
                    Convert.convertWalletAddress(walletAddress, 5, 4)
                  }
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
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, transition: !expanded ? '.3s width' : '', width: { xs: expanded ? 1 : 0, xl: 1 } }}
          >
            <Stack direction={"row"} spacing={1}>
              <UserInfoButton text="Profile" startIcon={<ProfileCircleIcon />} />
              <UserInfoButton text="Assets" startIcon={<ArchiveIcon />} />
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
              <Typography textAlign={'center'} variant="h3">Comming soon</Typography>
              {/* <FlipHistoryItem />
              <FlipHistoryItem />
              <FlipHistoryItem />
              <FlipHistoryItem /> */}
            </Stack>
            <Button
              variant="text"
              onClick={() => { disconnect() }}
              startIcon={<LogoutIcon />}
              sx={{
                color: "secondary.400",
                fontSize: "0.75rem",
                border: "none",
                "&:hover": {
                  border: "none",
                  color: "secondary.400",
                  backgroundColor: "transparent"
                },
              }}
            >
              Disconnect Wallet
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box >
    );
  }
}

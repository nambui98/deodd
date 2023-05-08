import {
  Typography,
  Stack,
  Box,
  Divider,
  Button,
  ButtonProps,
  Collapse,
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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ClickAwayListener } from '@mui/base';
import ProfileUsername from "../profileUsername";

function UserInfoButton(props: ButtonProps & { text: string }) {
  return (
    <Button
      LinkComponent={Link}
      variant="contained"
      disableElevation
      sx={{
        width: "100%",
        color: "secondary.100",
        backgroundColor: "#3F4251",
        fontSize: "0.875rem",
        fontWeight: "400",
        border: "none",
        textTransform: "capitalize",
        svg: {
          fill: "#96A5C0",
          stroke: "transparent",
          transition: "0.3s"
        },
        "&:hover": {
          svg: {
            fill: "#F5F5FA",
            stroke: "transparent",
          },
          border: "none",
          backgroundColor: "neutral.A100",
          color: "secondary.600"
        },
      }}
      startIcon={props.startIcon}
      {...props}
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
    </>
  );
}

export function UserInfo() {
  const theme = useTheme();
  const matchesScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [expanded, setExpanded] = useState<boolean>(false);
  const { walletIsConnected, walletAddress, bnbBalance } = useWalletContext();
  const [isProfileOpened, setIsProfileOpened] = useState(false);

  const { disconnect } = useDisconnect()
  if (!walletIsConnected) {
    return null;
  } else {
    return (
      <ClickAwayListener onClickAway={() => { setExpanded(false) }}>
        {/* Box to refer to position */}
        <Box position={"relative"} height={"3rem"} >
          <ProfileUsername open={isProfileOpened} onClose={() => { setIsProfileOpened(false) }} />
          {/* Menu Container */}
          <Box
            sx={{
              backgroundColor: "primary.100",
              position: "absolute",
              top: 0,
              right: 0,
              borderRadius: "0.5rem",
              transition: "300ms outline",
              outline: `${expanded ? "2px solid #3F4251" : "2px solid transparent"}`,
            }}>
            {/* Summary Container */}
            <Stack
              onClick={() => setExpanded(!expanded)}
              direction="row"
              divider={<Divider flexItem sx={{ width: "1px", backgroundColor: "primary.300", display: { xs: expanded ? "block" : "none", md: "block" } }} />}
              sx={
                {
                  justifyContent: "space-between",
                  padding: "0.875rem 0.75rem",
                  gap: { xs: expanded ? 2 : 0, md: 2 },
                  transition: "300ms gap",
                  cursor: "pointer",
                }
              }
            >
              <Stack direction="row" alignItems="center" gap={1}>
                {/* <Collapse in={!matchesScreen ? expanded ? true : false : true} orientation="horizontal" timeout={100}>
                  <Typography
                    variant="h3"
                    fontSize={"0.75rem"}
                    textTransform={"uppercase"}
                    color={"text.disabled"}
                  >
                    balance
                  </Typography>
                </Collapse> */}
                <Typography variant="h3" fontSize={"0.875rem"}>{Format.formatMoneyFromBigNumberEther(bnbBalance)}</Typography>
                <BnbIcon fill={Colors.primaryDark} />
              </Stack>
              <Stack direction={"row"} gap={1} alignItems="center">
                <Collapse in={!matchesScreen ? expanded ? true : false : true} orientation="horizontal" timeout={100}>
                  <Stack direction={"row"} gap={1} alignItems="center">
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
                </Collapse>
                <Stack justifyContent="center" sx={{ transform: expanded ? "rotate(180deg)" : "", transition: "transform 300ms" }}>
                  <ArrowDownIcon fill={"#F5F5FA"} />
                </Stack>
              </Stack>
            </Stack>

            {/* Details Container */}
            <Collapse in={expanded}>
              <Collapse
                in={!matchesScreen ? expanded ? true : false : true}
                timeout={100}
                orientation="horizontal"
                sx={{
                  ".MuiCollapse-wrapper": {
                    flexFlow: "column wrap"
                  },
                }}
              >
                <Stack
                  sx={{ gap: 1.5, opacity: expanded ? 1 : 0, transition: "opacity 600ms", padding: "0 0.75rem" }}
                >
                  <Stack direction={"row"} spacing={1}>
                    <UserInfoButton onClick={() => { setIsProfileOpened(true) }} text="Profile" startIcon={<ProfileCircleIcon />} />
                    <UserInfoButton href="/assets" text="Assets" startIcon={<ArchiveIcon />} />
                  </Stack>
                  <Divider></Divider>
                  <Typography
                    variant="h3"
                    fontSize={"0.875rem"}
                    color={"text.disabled"}
                  >
                    Flipping History
                  </Typography>
                  <Stack gap={1} divider={<Divider />}>
                    {/* <Typography textAlign={'center'} variant="h3">Empty</Typography> */}
                    <FlipHistoryItem />
                    <FlipHistoryItem />
                    <FlipHistoryItem />
                    <FlipHistoryItem />
                  </Stack>
                  <Stack>
                    <Divider></Divider>
                    <Button
                      variant="text"
                      onClick={() => { disconnect() }}
                      startIcon={<LogoutIcon />}
                      sx={{
                        color: "secondary.400",
                        fontSize: "0.75rem",
                        border: "none",
                        padding: "0.75rem 0",
                        textTransform: "capitalize",
                        "&:hover": {
                          border: "none",
                          color: "secondary.400",
                          backgroundColor: "transparent"
                        },
                      }}
                    >
                      disconnect wallet
                    </Button>
                  </Stack>
                </Stack>
              </Collapse>
            </Collapse>

          </Box>
        </Box >
      </ClickAwayListener >
    );
  }
}

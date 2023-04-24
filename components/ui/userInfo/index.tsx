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
          stroke: "transparent",
          transition: "0.3s"
        },
        "&:hover": {
          svg: {
            stroke: "transparent",
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
      <Box position={"relative"} height={"3rem"} >
        <Accordion
          disableGutters
          expanded={expanded} onChange={handleChange()}
          sx={{
            backgroundColor: "primary.100",
            position: "absolute",
            padding: "0",
            top: 0,
            right: 0,
            outline: `${expanded ? "2px solid #3F4251" : ""}`,
            "&.MuiAccordion-root": {
              borderRadius: "0.5rem",
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDownIcon fill="#F5F5FA" />}
            aria-controls="userinfo-content"
            id="userinfo-header"
            sx={{
              transition: '.3s all',
              "&.MuiAccordionSummary-root": {
                paddingInline: "0.75rem", //12px
              }
            }
            }
          >
            <Stack
              direction={"row"}
              gap={2}
              divider={expanded ? (<Divider sx={{ width: "1px", backgroundColor: "primary.300" }} />) : ""}
              paddingRight={expanded ? 1 : 0.5} // Spacing between expand icon and content
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
                gap={1}
                alignItems={"center"}
                sx={{
                  // opacity: !expanded ? 0 : 1,
                  transition: '.3s opacity',
                  width: { xs: expanded ? 1 : 0, xl: 1 },
                  display: { xs: expanded ? 'flex' : 'none', xl: 'flex' },
                }}
              >
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
            sx={{
              display: expanded ? "flex" : "none", flexDirection: "column", gap: 1.5, transition: '.3s opacity', opacity: !expanded ? 0 : 1, "&.MuiAccordionDetails-root": {
                padding: "0.75rem",
                paddingBlockStart: 0,
                paddingBlockEnd: 0.5,
              }
            }}
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
            <Stack gap={1} divider={<Divider />}>
              {/* <Typography textAlign={'center'} variant="h3">Comming soon</Typography> */}
              <FlipHistoryItem />
              <FlipHistoryItem />
              <FlipHistoryItem />
              <FlipHistoryItem />
            </Stack>
            <Stack>
              <Divider sx={{ marginBottom: 0.5 }}></Divider>
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
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box >
    );
  }
}

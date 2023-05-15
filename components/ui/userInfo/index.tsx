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
import { useEffect, useState, useRef } from "react";
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
import { LocalStorage } from "libs/LocalStorage";
import MyImage from "../image";
import { useRouter } from "next/router";

const avatars = [
  '/assets/images/avatar-yellow.png',
  '/assets/images/avatar-orange.png',
  '/assets/images/avatar-pink.png',
  '/assets/images/avatar-violet.png',
  '/assets/images/avatar-green.png'
]

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

// function FlipHistoryItem() {
//   return (
//     <>
//       <Stack gap={0.5} px={1}>
//         <Typography variant="body2" fontSize={"0.75rem"}>
//           Claim all reward
//         </Typography>
//         <Stack direction={"row"} justifyContent={"space-between"}>
//           <Typography
//             variant="body2"
//             fontSize={"0.875rem"}
//             color={"text.disabled"}
//           >
//             -100 BNB
//           </Typography>
//           <Typography
//             variant="body2"
//             fontSize={"0.75rem"}
//             color={"text.disabled"}
//           >
//             12 seconds ago
//           </Typography>
//         </Stack>
//       </Stack>
//     </>
//   );
// }

export function UserInfo() {
  const theme = useTheme();
  const router = useRouter();
  const matchesScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [expanded, setExpanded] = useState<boolean>(false);
  const { walletIsConnected, walletAddress, bnbBalance, userInfo } = useWalletContext();
  const [isProfileOpened, setIsProfileOpened] = useState(false);

  useEffect(() => {
    const isProfileModalOpened = LocalStorage.getIsProfileModalOpened();
    if ((userInfo.username === undefined || userInfo.username === null) && walletAddress && isProfileModalOpened === false) {
      setIsProfileOpened(true);
      LocalStorage.setIsProfileModalOpened(true);
    }
  }, [walletAddress, userInfo.username])

  const handleDisconnect = () => {
    disconnect();
    setExpanded(false);
    if (router.pathname === "/assets") {

      router.replace("/");
    }

  }
  const { disconnect } = useDisconnect()
  if (!walletIsConnected) {
    return null;
  } else {
    return (
      <ClickAwayListener onClickAway={() => { setExpanded(false) }}>
        {/* Menu Container */}
        <Box
          sx={{
            width: matchesScreen ? "auto" : expanded ? 1 : "auto",
            position: "absolute",
            right: 0,
          }}>
          <ProfileUsername open={isProfileOpened} onClose={() => { setIsProfileOpened(false) }} />
          {/* Summary Container */}
          <Stack
            onClick={() => setExpanded(!expanded)}
            direction="row"
            divider={<Divider flexItem sx={{ width: "1px", backgroundColor: "primary.300", display: { xs: expanded ? "block" : "none", md: "block" } }} />}
            sx={{
              minWidth: matchesScreen ? "14rem" : "",
              justifyContent: "space-between",
              backgroundColor: "primary.100",
              padding: { xs: expanded ? "0.875rem 0.75rem" : "0.5rem 0.75rem", md: "0.875rem 0.75rem" },
              gap: { xs: expanded ? 2 : 0, md: 2 },
              transition: `box-shadow 300ms, 300ms gap, ${!expanded ? "300ms" : "0ms"} border-radius ${!expanded ? "150ms" : ""}`,
              borderRadius: expanded ? "8px 8px 0 0" : "8px",
              boxShadow: expanded ? "0 -2px 0 #3F4251, 2px 0px 0 #3F4251, -2px 0px 0 #3F4251" : "",
              cursor: "pointer",
            }}
          >
            <Stack direction="row" alignItems="center" sx={{ gap: { xs: expanded ? 1 : 0.5, md: 1 } }}>
              <Typography variant="h3" fontSize={"0.875rem"} fontWeight={500} lineHeight={"1.25rem"}>{Format.formatMoneyFromBigNumberEther(bnbBalance)}</Typography>
              <BnbIcon fill={Colors.primaryDark} height={matchesScreen ? 20 : expanded ? 20 : 16} width={matchesScreen ? 20 : expanded ? 20 : 16} />
            </Stack>
            <Stack direction={"row"} alignItems="center" sx={{ gap: { xs: expanded ? 1 : 0.5, md: 1 } }}>
              <Collapse in={!matchesScreen ? expanded ? true : false : true} orientation="horizontal" timeout={100}>
                <Stack direction={"row"} gap={1} alignItems="center">
                  <Typography fontSize={"0.875rem"} variant="h3" fontWeight={500} lineHeight={"1.25rem"}>
                    {
                      userInfo.username ? userInfo.username : Convert.convertWalletAddress(walletAddress, 5, 4)
                    }
                  </Typography>
                  <MyImage
                    src={avatars[userInfo.avatar]}
                    height={matchesScreen ? "1.5rem" : expanded ? "1.5rem" : 0}
                    width="1.5rem"
                    sx={{ position: "relative", borderRadius: "50%" }} alt="avatar-image" />
                </Stack>
              </Collapse>
              <Stack sx={{
                transform: expanded ? "rotate(180deg)" : "", transition: "transform 300ms, color 300ms",
                color: matchesScreen ? "#F5F5FA" : expanded ? "#F5F5FA" : Colors.secondary
              }}>
                <ArrowDownIcon
                  height={matchesScreen ? 20 : expanded ? 20 : 16} width={matchesScreen ? 20 : expanded ? 20 : 16} />
              </Stack>
            </Stack>
          </Stack>

          {/* Details Container */}
          <Collapse in={expanded} sx={{
            position: "absolute",
            top: "100%",
            right: 0,
            width: 1,
            backgroundColor: "primary.100",
            borderRadius: "0 0 8px 8px",
            transition: "300ms",
            boxShadow: expanded ? "2px 0px 0 #3F4251, -2px 0px 0 #3F4251, 0px 2px 0 #3F4251" : "",
          }}>
            <Collapse
              in={!matchesScreen ? expanded ? true : false : true}
              orientation="horizontal"
              timeout={100}
              sx={{
                ".MuiCollapse-wrapper": {
                  flexFlow: "column nowrap",
                  width: 1,
                },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack
                sx={{
                  gap: 1.5,
                  opacity: expanded ? 1 : 0,
                  transition: "opacity 600ms",
                  padding: "0 0.75rem",
                }}
              >
                <Stack direction={"row"} spacing={1}>
                  <UserInfoButton onClick={() => { setIsProfileOpened(true) }} text="Profile" startIcon={<ProfileCircleIcon />} />
                  <UserInfoButton href="/assets" text="Assets" startIcon={<ArchiveIcon />} />
                </Stack>
                {/* <Divider></Divider>
                  <Typography
                    variant="h3"
                    fontSize={"0.875rem"}
                    color={"text.disabled"}
                  >http://localhost:3000/loyalty
                    Flipping History
                  </Typography>
                  <Stack gap={1} divider={<Divider />}>
                    <Typography textAlign={'center'} variant="h3">Empty</Typography>
                  </Stack> */}
                <Stack>
                  <Divider></Divider>
                  <Button
                    variant="text"
                    onClick={() => handleDisconnect()}
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
      </ClickAwayListener >
    );
  }
}

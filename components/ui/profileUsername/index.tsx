import { useState, useEffect } from "react";
import { Modal, Stack, Box, Typography, CircularProgress, InputBase, Zoom } from "@mui/material";
import MyImage from "components/ui/image";
import { ButtonMain } from "components/ui/button";
import { useWalletContext } from "contexts/WalletContext";
import { DeoddService } from "libs/apis";

const avatars = [
  '/assets/images/avatar-yellow.png',
  '/assets/images/avatar-orange.png',
  '/assets/images/avatar-pink.png',
  '/assets/images/avatar-violet.png',
  '/assets/images/avatar-green.png'
]

type HandleSetProfileProps = {
  currentProfile: { username: string, avatar: any },
  isLoading: boolean,
  setIsLoading: Function,
  userInfo: any, // Change me later
  walletAddress: any, // Change me later
  refresh: any, // Change me later
  setRefresh: any, // Change me later
}

async function handleSetProfile({
  currentProfile,
  isLoading,
  setIsLoading,
  userInfo,
  walletAddress,
  refresh,
  setRefresh,
}: HandleSetProfileProps) {
  const format = /^(?=.{0,15}[\w\d\s\S]$)\S+$/; // No whitespace, 1-15 characters.
  if (format.test(currentProfile.username.trim())) {
    if (!isLoading) {
      setIsLoading(true);
      try {
        debugger
        const resService = await DeoddService.saveInfoUser({
          wallet: walletAddress,
          username: currentProfile.username || userInfo.userName,
          avatarId: currentProfile.avatar
        });
        localStorage.setItem("nickname", JSON.stringify({
          wallet: walletAddress,
          username: currentProfile.username || userInfo.userName,
          avatarId: currentProfile.avatar
        }));
        setIsLoading(false);
        if (resService.status === 200) {
          setRefresh(!refresh);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

export default function ProfileUsername({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { walletAddress, refresh, setRefresh } = useWalletContext();
  const [userInfo, setUserInfo] = useState({ username: "", avatar: 0 } as { username: string; avatar: number });
  const [currentProfile, setCurrentProfile] = useState({ username: userInfo.username || "", avatar: userInfo.avatar || 0 } as { username: string; avatar: number });

  useEffect(() => {
    const localNickname = localStorage.getItem("nickname");
    console.log(localNickname);
  }, []);

  return (
    <Modal aria-labelledby="profile-nickname-modal" open={open} onClose={onClose} sx={{ display: "flex", justifyContent: "center" }}>
      <Zoom in={open}>
        <Stack gap={3} alignItems={"center"} sx={{
          position: 'fixed',
          top: "20%",
          maxWidth: "22rem",
          bgcolor: "primary.200",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 40px rgba(112, 113, 179, 0.3)",
          p: 3,
        }}>
          <Box sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
            transition: "300ms opacity, 300ms transform",
            ":hover": {
              opacity: 0.8,
              transform: "scale(1.1)"
            }
          }}
            onClick={onClose}
          >
            <MyImage src="/assets/icons/close-square2.svg" width={14} height={14} alt="close-modal-icon" />
          </Box>

          <Typography variant="h3" fontSize={"1rem"} lineHeight={"1.375rem"} fontWeight={600}>Your profile</Typography>
          <MyImage src={currentProfile.avatar !== null ? avatars[currentProfile.avatar] : avatars[userInfo.avatar]} width={120} height={120} alt="profile-avatar" />
          <Stack direction={"row"} spacing={2} >
            {avatars.map((avatarSrc, index) => (<MyImage key={index} onClick={() => { setCurrentProfile(prev => ({ ...prev, avatar: index })) }} src={avatarSrc} width={40} height={40} alt="profile-avatar" sx={{ cursor: "pointer" }} />))}
          </Stack>
          <InputBase
            sx={{
              backgroundColor: "#2A2D3E",
              borderRadius: "0.5rem",
              padding: "0.75rem 2rem",
              input: {
                textAlign: "center",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
                ":focus::placeholder": {
                  opacity: 0.2,
                }
              }
            }}
            placeholder="Your nickname"
            fullWidth
            value={currentProfile.username}
            onChange={(e) => { setCurrentProfile(prev => ({ ...prev, username: e.target.value })) }}
            onKeyDown={(e) => { if (e.key === "Enter") { handleSetProfile({ currentProfile, isLoading, setIsLoading, userInfo, walletAddress, refresh, setRefresh }) } }}
          />
          <Typography variant="body2" fontSize={"0.75rem"} lineHeight={"1rem"}>*If you change a Nickname, you will be charged some gas fee for this.</Typography>
          <ButtonMain
            disable={((currentProfile.avatar !== userInfo.avatar) || (currentProfile.username !== userInfo.username && currentProfile.username !== null)) ? false : true}
            active={true}
            customStyle={{ width: 1, height: "3.375rem" }}
            title={isLoading ? <CircularProgress size={26} color="inherit" /> : 'SAVE'}
            onClick={() => { handleSetProfile({ currentProfile, isLoading, setIsLoading, userInfo, walletAddress, refresh, setRefresh }) }}
          ></ButtonMain>
        </Stack>
      </Zoom>
    </Modal >
  );

}

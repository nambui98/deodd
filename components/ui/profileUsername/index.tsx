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

export default function ProfileUsername({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { walletAddress, userInfo, setUserInfo, refresh, setRefresh } = useWalletContext();
  const [currentProfile, setCurrentProfile] = useState({ username: userInfo.username, avatar: userInfo.avatar } as { username: string; avatar: number });

  async function handleSetProfile() {
    const format = /^(?=.{0,15}[\w\d\s\S]$)\S+$/; // No whitespace, 1-15 characters.
    if (format.test(currentProfile.username.trim()) || currentProfile.username === "") {
      if (!isLoading) {
        setIsLoading(true);
        try {
          debugger
          const resService = await DeoddService.saveInfoUser({
            wallet: walletAddress,
            username: currentProfile.username,
            avatarId: currentProfile.avatar,
          });
          if (resService.data.meta.code === 1) {
            setErrorMessage(resService.data.meta.error_message);
            setIsLoading(false);
          } else {
            setUserInfo(currentProfile);
            localStorage.setItem("nickname", JSON.stringify({
              wallet: walletAddress,
              username: currentProfile.username,
              avatarId: currentProfile.avatar,
            }));
            setIsLoading(false);
            onClose();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  useEffect(() => {
    setCurrentProfile({ username: userInfo.username, avatar: userInfo.avatar });
  }, [userInfo]);

  return (
    <Modal aria-labelledby="profile-nickname-modal" open={open} onClose={onClose} sx={{ display: "flex", justifyContent: "center" }}>
      <Zoom in={open}>
        <Stack gap={3} alignItems={"center"} sx={{
          position: 'fixed',
          top: "20%",
          width: "22rem",
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
            inputProps={{ maxLength: 15 }}
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
            onChange={(e) => {
              setCurrentProfile(prev => ({ ...prev, username: e.target.value.split(" ").join("") }));
              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && ((currentProfile.avatar !== userInfo.avatar) || (currentProfile.username !== userInfo.username))) {
                handleSetProfile();
              }
            }}
          />
          {/* The box and relative, absolute position is here to maintain the space if there are no error message */}
          <Box alignSelf={"flex-start"} width={1} sx={{ display: "flex", alignItems: "center", position: "relative", marginBlockStart: "-0.3rem", marginBlockEnd: "-0.3rem" }}>
            <Typography variant="body2" color={"#EE3E3E"} fontSize={"0.75rem"} lineHeight={"1rem"} position={"absolute"} >
              {errorMessage}
            </Typography>
          </Box>
          <ButtonMain
            active={true}
            disabled={((currentProfile.avatar !== userInfo.avatar) || (currentProfile.username !== userInfo.username)) ? false : true}
            sx={{ width: 1, height: "3.375rem" }}
            title={isLoading ? <CircularProgress size={26} color="inherit" /> : 'SAVE'}
            onClick={() => { handleSetProfile() }}
          ></ButtonMain>
        </Stack>
      </Zoom>
    </Modal >
  );

}

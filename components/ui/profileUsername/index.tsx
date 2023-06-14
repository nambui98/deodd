import { useState, useEffect } from "react";
import { Stack, Box, Typography, CircularProgress, InputBase, Zoom } from "@mui/material";
import MyImage from "components/ui/image";
import { ButtonMain } from "components/ui/button";
import { useWalletContext } from "contexts/WalletContext";
import { DeoddService } from "libs/apis";
import { LocalStorage } from "libs/LocalStorage";
import MyModal from "components/common/Modal";
import { Colors } from 'constants/index';
import { useForm } from "react-hook-form";

const avatars = [
  '/assets/images/avatar-yellow.png',
  '/assets/images/avatar-orange.png',
  '/assets/images/avatar-pink.png',
  '/assets/images/avatar-violet.png',
  '/assets/images/avatar-green.png'
]

export default function ProfileUsername({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { walletAddress, userInfo, setUserInfo, refresh, setRefresh } = useWalletContext();
  const { register, watch, setValue, setError, handleSubmit, reset, formState: { isDirty, errors } } = useForm({
    defaultValues: {
      username: userInfo.username,
      avatar: userInfo.avatar,
    }
  });

  async function handleSetProfile(data: any) {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const resService = await DeoddService.saveInfoUser({
          wallet: walletAddress,
          username: data.username ? data.username : null,
          avatarId: data.avatar,
        });
        if (resService.data.meta.code === 1) {
          setError("username", { message: resService.data.meta.error_message }, { shouldFocus: true });
          setIsLoading(false);
        } else {
          setUserInfo({
            username: data.username,
            avatar: data.avatar,
          });
          LocalStorage.setUserInfo({
            wallet: walletAddress,
            username: data.username,
            avatarId: data.avatar ?? 0,
          });
          setIsLoading(false);
          onClose();
        }
      } catch (err) {
        throw new Error("Something went wrong", { cause: err });
      }
    }
  }

  useEffect(() => {
    reset({
      username: userInfo.username,
      avatar: userInfo.avatar,
    })
  }, [userInfo.username, userInfo.avatar, open, reset]);

  return (
    <MyModal
      open={open} setOpen={onClose}
      haveIconClosed
      iconProps={{ width: 16, color: Colors.secondary }}
      sx={{
        boxShadow: "0px 0px 40px rgba(112, 113, 179, 0.3)",
        minWidth: "22rem",
      }}
    >
      <Zoom in={open}>
        <Stack component={"form"} onSubmit={handleSubmit(handleSetProfile)} gap={3} alignItems={"center"} sx={{
          bgcolor: "primary.200",
          borderRadius: "0.5rem",
        }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isDirty) {
              e.preventDefault();
              handleSubmit(handleSetProfile)();
            }
          }}
        >
          <Typography variant="h3" fontSize={"1rem"} lineHeight={"1.375rem"} fontWeight={600}>Your profile</Typography>
          <MyImage src={avatars[watch("avatar")] ?? avatars[userInfo.avatar]} width={120} height={120} alt="profile-avatar" />
          <Stack direction={"row"} spacing={2}>
            {avatars.map((avatarSrc, index) => (
              <MyImage
                key={index}
                tabIndex={-1} // Set this so user can press enter to save form when choosing avatar
                onClick={() => setValue("avatar", index, { shouldDirty: true })}
                src={avatarSrc}
                width={40}
                height={40}
                alt="profile-avatar"
                sx={{ cursor: "pointer", outline: "none" }}
              />
            ))}
          </Stack>
          <InputBase
            {...register("username", {
              onChange: (e) => {
                setValue("username", e.target.value.split(" ").join("").replaceAll(/[^a-zA-Z0-9!@#\$%\^\&\~\*\(\)_\+`\-=\[\]\\{}|;':",\.<>\/\?]/g, ''))
              }
            })}
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
            fullWidth />
          {/* The box and the relative, absolute position are here to maintain the white space if there are no error message */}
          <Box alignSelf={"flex-start"} width={1} sx={{ display: "flex", alignItems: "center", position: "relative", marginBlockStart: "-0.3rem", marginBlockEnd: "-0.3rem" }}>
            <Typography variant="body2" color={"#EE3E3E"} fontSize={"0.75rem"} lineHeight={"1rem"} position={"absolute"} >
              {errors.username?.message}
            </Typography>
          </Box>
          <ButtonMain
            type="submit"
            active={true}
            disabled={!isDirty}
            sx={{ width: 1, height: "3.375rem" }}
            title={isLoading ? <CircularProgress size={26} color="inherit" /> : 'SAVE'}
          ></ButtonMain>
        </Stack>
      </Zoom>
    </MyModal >
  );
}

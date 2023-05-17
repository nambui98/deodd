import { Box, IconButton, Stack, Typography, styled } from "@mui/material";
// import { Button } from "../ui/button";
import { Colors } from "../../constants";
import { useColorModeContext } from "../../contexts/ColorModeContext";
import { DiscordIcon, TelegramIcon, TwitterIcon } from "utils/Icons";


export const Contact: React.FC<any> = () => {
  const { darkMode } = useColorModeContext();
  return <Stack direction={'row'} mx={3} my={2}>
    <Box display={"flex"} flexDirection={"column"} sx={{ pointerEvents: "auto" }} alignItems={"center"} alignSelf={"flex-end"} >
      <Typography display={'inline-block'} fontWeight={500} variant="body2" color="secondary.500">JOIN OUR SOCIAL</Typography>
      <Box display={'flex'} columnGap={.5} marginTop={0} >
        <a href="https://discord.com/invite/6jQZQqGxez" target="_blank" rel="noreferrer">
          <IconButton color="primary" sx={{ p: 1 }}><DiscordIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /></IconButton>
        </a>
        <a href="https://t.me/deodd_official_ann" target="_blank" rel="noreferrer">
          <IconButton color="primary" sx={{ p: 1 }}><TelegramIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /></IconButton>
        </a>
        <a href="https://twitter.com/Deodd_io" target="_blank" rel="noreferrer">
          <IconButton color="primary" sx={{ p: 1 }}><TwitterIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /></IconButton>
        </a>
      </Box>
    </Box>
  </Stack>
}

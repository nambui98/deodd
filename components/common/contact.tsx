import { Box, IconButton, Typography, styled } from "@mui/material";
// import { Button } from "../ui/button";
import { Colors } from "../../constants";
import { useColorModeContext } from "../../contexts/ColorModeContext";
import { DiscordIcon, TelegramIcon, TwiterIcon } from "./icons";


export const Contact: React.FC<any> = () => {
  const { darkMode } = useColorModeContext();
  return <Box position={'fixed'} bottom={{ lg: "80px", md: "30px" }} left={{ lg: '80px', md: "30px" }} display={{ xs: 'none', md: 'block' }} >
    <Box display={"flex"} flexDirection={"column"} sx={{ pointerEvents: "auto" }} alignItems={"center"} alignSelf={"flex-end"} >
      <Typography display={'inline-block'} fontWeight={500}>JOIN OUR SOCIAL</Typography>
      <Box display={'flex'} gap={2} marginTop={2} >
        <IconButton color="primary" ><DiscordIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /></IconButton>
        <IconButton color="primary" ><TelegramIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /></IconButton>
        <IconButton color="primary" ><TwiterIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /></IconButton>
      </Box>
    </Box>
  </Box>
}

const Wrap = styled(Box)({
  position: "fixed",
  // inset: 0,
  bottom: '10%',
  left: '5%',
  // zIndex: 1,
  // height: "100vh",
  // display: 'flex',
  // pointerEvents: "none"
})


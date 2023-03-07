import { Box, Button, IconButton, Typography, styled } from "@mui/material";
import { Container, TEXT_STYLE } from "../../styles/common";
// import { Button } from "../ui/button";
import { propsTheme } from '../../pages/homepage';
import { DiscordIcon, TelegramIcon, TwiterIcon } from "./icons";
import { useColorModeContext } from "../../contexts/ColorModeContext";
import { Colors } from "../../constants";


export const Contact: React.FC = () => {
  const { darkMode } = useColorModeContext();
  return <Wrap>
    <Box display={"flex"} flexDirection={"column"} sx={{ pointerEvents: "auto" }} alignItems={"center"} alignSelf={"flex-end"} marginBottom={10} marginLeft={10}>
      <Typography display={'inline-block'} fontWeight={500}>JOIN OUR SOCIAL</Typography>
      <Box display={'flex'} gap={2} marginTop={2} >
        <IconButton color="primary" ><DiscordIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /></IconButton>
        <IconButton color="primary" ><TelegramIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /></IconButton>
        <IconButton color="primary" ><TwiterIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /></IconButton>
      </Box>
    </Box>
  </Wrap>
}

const Wrap = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: 101,
  height: "100vh",
  display: 'flex',
  pointerEvents: "none"
})

const Logo = styled(Box)({

})
const BoxRight = styled(Box)({
  display: 'flex',
  alignItems: 'center'
})
const ItemRight = styled(Box)((props: propsTheme) => ({
  ...TEXT_STYLE(12, 500, props.themeLight ? '#181536' : '#FFFFFF'),
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  background: props.themeLight ? '#FFFFFF' : '#181536',
  border: '2px solid ',
  borderColor: props.themeLight ? '#E9EAEF' : '#181536',
  borderRadius: 8,
  marginLeft: 8,
  '&.stats': {
    background: props.themeLight ? '#E9EAEF' : '#181536',
    '& > div': {
      color: props.themeLight ? '#181536 !important' : ''
    }
  },
  '&.leadeboard': {
    '& > div': {
      color: props.themeLight ? '#181536 !important' : ''
    }
  },
  '& .MuiInputBase-root': {
    ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#7071B3'),
    outline: 0,
    border: 0,
    '& svg': {
      color: props.themeLight ? 'transparent' : '#7071B3'
    },
    '& fieldset': {
      display: 'none'
    },
    '& .MuiSelect-select': {
      padding: '8px',
    }
  },
  '& span': {
    ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#7071B3'),
    margin: '0 8px'
  }
}))
const HeaderPopup = styled(Box)({
  marginBottom: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const HistoryPopup = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#7071B3'),
  margin: '8px 0'
}))
const BoxItemHistory = styled(Box)((props: propsTheme) => ({
  maxHeight: 400,
  overflow: 'auto',
  paddingRight: 10,
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    background: '#E9EAEF',
    borderRadius: 10
  },
  '&::-webkit-scrollbar-thumb': {
    background: `linear-gradient(180deg, ${props.themeLight ? '#FC753F' : '#FEF156'} 2.08%, ${props.themeLight ? '#FC753F' : '#FEF156'} 66.9%)`,
    borderRadius: 10
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: `linear-gradient(180deg, ${props.themeLight ? '#FC753F' : '#FEF156'} 2.08%, ${props.themeLight ? '#FC753F' : '#FEF156'} 66.9%)`
  }
}))
const ItemHistory = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 0'
})
const TimeHistory = styled(Typography)({
  ...TEXT_STYLE(12, 500, '#A7ACB8')
})
type propsBnbHistory = {
  active: boolean,
  themeLight: boolean
}
const BnbHistory = styled(Typography)((props: propsBnbHistory) => ({
  display: 'flex',
  alignItems: 'flex-end',
  ...TEXT_STYLE(14, 500, props.themeLight ? props.active ? '#FC753F' : '#A7ACB8' : props.active ? '#FEF156' : '#A7ACB8'),
  '& > div': {
    ...TEXT_STYLE(10, 500, '#5A6178'),
    marginLeft: 4
  }
}))
const TitleHistory = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(14, 400, props.themeLight ? '#181536' : '#FFFFFF'),
  marginBottom: 6
}))
const BoxStats = styled(Box)({
  ...TEXT_STYLE(14, 500, '#7071B3')
})
const Leadeboard = styled(Box)({
  ...TEXT_STYLE(14, 500, '#FEF156'),
  display: 'flex',
  alignItems: 'center',
  '& img': {
    marginLeft: 8,
    maxWidth: 20
  }
})
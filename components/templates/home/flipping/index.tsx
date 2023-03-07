import { TEXT_STYLE } from "../../../../styles/common"
import { Box, BoxProps, ButtonProps, Stack, styled, Typography } from "@mui/material";
import { propsTheme } from "../../../../pages/homepage";
import { useWalletContext } from "../../../../contexts/WalletContext";
import { useColorModeContext } from "../../../../contexts/ColorModeContext";

interface IProps {
  amount: string
}

export const Flipping: React.FC<IProps> = ({ amount }) => {
  const { darkMode } = useColorModeContext()
  return <Wrap sx={{
    backgroundColor: darkMode ? "#1C1B3E" : '#fff',

  }}>
    <Box sx={{
      position: 'absolute',
      top: "50%",
      left: "50%",
      transform: 'translate(-50%, -50%)',
    }} >
      <Coin><img src="assets/coin-flip.gif" /></Coin>
      <Title themeLight={!darkMode}>FLIPPING</Title>
      <Amount themeLight={!darkMode}>{amount} BNB</Amount>

    </Box>
  </Wrap>
}

const Wrap = styled(Box)({
  textAlign: 'center',
  position: "absolute",
  zIndex: "100",
  inset: 0,
  height: "100vh",
  // marginTop: 20,
  '@media (max-width: 800px)': {
    marginTop: 20
  }
})
const Title = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(24, 500, props.themeLight ? '#181536' : '#FFFFFF'),
  marginBottom: 24
}))
const Amount = styled(Box)((props: propsTheme) => ({
  ...TEXT_STYLE(24, 700, props.themeLight ? '#FC753F' : '#FEF156'),
}))
const Coin = styled(Box)({
  marginBottom: 24,
  '& img': {
    maxWidth: 144
  }
})
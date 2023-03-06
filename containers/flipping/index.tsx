import { TEXT_STYLE } from "../../styles/common"
import { Box, BoxProps, ButtonProps, Stack, styled, Typography } from "@mui/material";
import { propsTheme } from "../../pages/homepage";
import { useWalletContext } from "../../contexts/WalletContext";

interface IProps {
  amount: string
}

export const Flipping: React.FC<IProps> = ({amount}) => {
  const {theme} = useWalletContext()
  return <Wrap>
    <Coin><img src="assets/coin-flip.gif" /></Coin>
    <Title themeLight={theme === 'light'}>FLIPPING</Title>
    <Amount themeLight={theme === 'light'}>{amount} BNB</Amount>
  </Wrap>
}

const Wrap = styled(Box)({
  textAlign: 'center',
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
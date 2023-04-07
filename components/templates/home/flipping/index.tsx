import { Box, styled, Typography } from "@mui/material";
import { useColorModeContext } from "../../../../contexts/ColorModeContext";
interface IProps {
  amount: string
}

export const Flipping: React.FC<IProps> = ({ amount }) => {
  const { darkMode } = useColorModeContext()
  return <Box sx={{
    position: 'fixed',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }} >
    <Box>
      <Coin><img alt="" src="assets/coin-flip.gif" /></Coin>
      <Typography variant="h2" fontWeight={500} mb={3}>FLIPPING</Typography>
      <Typography variant="h2" fontWeight={700} color={"secondary.main"} >{amount} BNB</Typography>
    </Box>
  </Box>
}

const Coin = styled(Box)({
  marginBottom: 40,
  '& img': {
    maxWidth: 144
  }
})
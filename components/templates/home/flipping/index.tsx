import { Box, Stack, styled, Typography } from "@mui/material";
import { useColorModeContext } from "../../../../contexts/ColorModeContext";
import { CoinAnimation } from "components/common/CoinAnimation";
interface IProps {
  amount: string
}

export const Flipping: React.FC<IProps> = ({ amount }) => {
  return <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{
    position: 'fixed',
    inset: 0,
    overflow: 'hidden',
  }} >
    <Box>
      <CoinAnimation mb={3} width={112} height={112} />
      <Typography variant="h2" fontWeight={500} mb={3}>FLIPPING</Typography>
      <Typography variant="h2" fontWeight={700} color={"secondary.main"} >{amount} BNB</Typography>
    </Box>
  </Stack>
}

const Coin = styled(Box)({
  marginBottom: 40,
  '& img': {
    maxWidth: 144
  }
})
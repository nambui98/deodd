import { Box, Stack, styled, Typography } from "@mui/material";
import { useColorModeContext } from "../../../../contexts/ColorModeContext";
import CoinAnimation from "components/common/CoinAnimation";
import { BnbIcon, HeadCoinIcon, TailCoinIcon } from "utils/Icons";
import { Colors } from "constants/index";
import { BnbImage, HeadCoinImage, TailCoinImage } from "utils/Images";
interface IProps {
  amount: string,
  isHead: boolean
}

export const Flipping: React.FC<IProps> = ({ amount, isHead }) => {
  return <Box textAlign={'center'} >
    <Box>
      <CoinAnimation mx="auto" width={160} height={160} />
      <Stack my={5} direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>

        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Typography component={'span'} variant="h2" fontWeight={700}>Flipping
          </Typography>
          <Typography component={'span'} variant="h2" fontWeight={700} color={"secondary.main"} >
            {amount}
          </Typography>
          <BnbIcon fill={Colors.secondaryDark} />
          {/* <img src={BnbImage} alt="" width={22} /> */}
          <Typography component={'span'} variant="h2" fontWeight={700} >for
          </Typography>
        </Stack>
        {
          isHead ?
            <Stack direction={'row'} alignItems={'center'} gap={1} justifyContent={'center'}  >
              <Box>
                <img alt="" src={HeadCoinImage} width={32} height={32} />
              </Box>
              <Typography textTransform={'uppercase'} variant="h2" fontWeight={700} color={"secondary.main"} >
                HEAD
              </Typography>
            </Stack>
            :
            <Stack direction={'row'} alignItems={'center'} gap={1} justifyContent={'center'}  >
              <Box>
                <img alt="" src={TailCoinImage} width={32} height={32} />
              </Box>
              <Typography textTransform={'uppercase'} variant="h2" fontWeight={700} color={"secondary.main"} >
                Tail
              </Typography>
            </Stack>

        }

      </Stack>
      <Typography variant="body2" color="secondary.100" >Gambling is not about how well you play the games, it’s really about how well you handle your money.</Typography>
    </Box>
  </Box >
}

const Coin = styled(Box)({
  marginBottom: 40,
  '& img': {
    maxWidth: 144
  }
})
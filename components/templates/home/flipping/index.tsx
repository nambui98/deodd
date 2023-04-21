import { Box, Stack, styled, Typography } from "@mui/material";
import CoinAnimation from "components/common/CoinAnimation";
import MyImage from "components/ui/image";
import { Colors } from "constants/index";
import Image from 'next/image';
import { BnbIcon } from "utils/Icons";
import { HeadCoinImage, TailCoinImage } from "utils/Images";
interface IProps {
  amount: string,
  isHead: boolean
}

export const Flipping: React.FC<IProps> = ({ amount, isHead }) => {
  return <Box textAlign={'center'} >
    <Box>
      <CoinAnimation mx="auto" width={{ md: 160, xs: 120 }} height={{ md: 160, xs: 120 }} />
      <Stack my={{ md: 5, xs: 3 }} direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Typography component={'span'} variant="h2" fontWeight={700}>Flipping
          </Typography>
          <Typography component={'span'} variant="h2" fontWeight={700} color={"secondary.main"} >
            {amount}
          </Typography>
          <BnbIcon fill={Colors.secondaryDark} />
          <Typography component={'span'} variant="h2" fontWeight={700} >for
          </Typography>
        </Stack>
        {
          isHead ?
            <Stack direction={'row'} alignItems={'center'} gap={1} justifyContent={'center'}  >
              <Box position={'relative'} width={32} height={32}>
                <Image alt="" src={HeadCoinImage} fill style={{
                  objectFit: 'contain'
                }} />
              </Box>
              <Typography textTransform={'uppercase'} variant="h2" fontWeight={700} color={"secondary.main"} >
                HEAD
              </Typography>
            </Stack>
            :
            <Stack direction={'row'} alignItems={'center'} gap={1} justifyContent={'center'}  >
              <MyImage alt="" src={TailCoinImage} width={32} height={32} />
              <Typography textTransform={'uppercase'} variant="h2" fontWeight={700} color={"secondary.main"} >
                Tail
              </Typography>
            </Stack>

        }

      </Stack>
      <Typography variant="body2" color="secondary.100" fontSize={{ md: 14, xs: 12 }}>Gambling is not about how well you play the games, it’s really about how well you handle your money.</Typography>
    </Box>
  </Box >
}

const Coin = styled(Box)({
  marginBottom: 40,
  '& img': {
    maxWidth: 144
  }
})
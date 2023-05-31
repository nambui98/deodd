import { Box, Stack, Typography, Divider } from '@mui/material';
import { BnbIcon, GoldCup1Icon, NotiIcon } from 'utils/Icons';
import { LoyaltyImage } from 'utils/Images';
import { Colors } from "constants/index";
import JackpotPoolLeaderboard from './JackpotPoolLeaderboard';
import { useWalletContext } from 'contexts/WalletContext';

type Props = {}

function JackpotPool({ }: Props) {
  const { walletIsConnected } = useWalletContext();

  return (
    <Box width={1}>
      <Stack direction={"row"} gap={1}>
        <GoldCup1Icon width={32} />
        <Typography variant='h2' fontWeight={700} lineHeight={"2rem"}>
          Jackpot pool
        </Typography>
      </Stack>

      <Stack position="relative" height={"413px"} bgcolor={"secondary.300"} borderRadius={1.5} mt={3} sx={{
        backgroundImage: `url(${LoyaltyImage})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}>
        <Typography mt={3.5} variant="body2">Season <Box component={"span"} color={"text.secondary"}>#2</Box> Started at 12/12/2022</Typography>
        <Typography variant="body2" color={"text.disabled"}>Jackpot Reward</Typography>
        <Stack direction={'row'} columnGap={1} alignItems={'center'} justifyContent={"center"} mb={1.25}>
          <Typography variant='h3' fontSize={"3rem"} lineHeight={"3.75rem"}>0,534</Typography>
          <BnbIcon width={40} color={Colors.primaryDark} />
        </Stack>
        <Typography variant="body2" color={"text.disabled"}>Tosspoint to win</Typography>
        <Typography fontSize={"1.75rem"} lineHeight={"2,2rem"} fontWeight={500} color={"text.primary"}>120/
          <Box component={"span"} color={"text.secondary"} fontSize={"2.375rem"} >15.000</Box>
        </Typography>
        <Box position="absolute" right={"1rem"} bottom={"1rem"} lineHeight={0} sx={{ cursor: "pointer" }}>
          <NotiIcon width={24} />
        </Box>
      </Stack>
      {walletIsConnected ? (<>
        <Divider sx={{
          mt: { xs: 3, md: 5 },
          mb: 3,
          backgroundColor: "primary.100",
        }} />
        <JackpotPoolLeaderboard />
      </>) : null}
    </Box>

  );
}

export default JackpotPool
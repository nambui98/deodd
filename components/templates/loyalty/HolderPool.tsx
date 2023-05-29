import { Box, Stack, Typography, Divider } from '@mui/material';
import { BnbIcon, Growth1Icon, NotiIcon } from 'utils/Icons';
import { LoyaltyImage, Loyalty2Image } from 'utils/Images';
import { Colors } from "constants/index";
import HolderPoolLeaderboard from './HolderPoolLeaderboard';

type Props = {}

function HolderPool({ }: Props) {
  return (

    <Box width={1}>
      <Stack direction={"row"} gap={1}>
        <Growth1Icon width={32} />
        <Typography variant='h2' fontWeight={700} lineHeight={"2rem"}>
          NFT Holder pool
        </Typography>
      </Stack>

      <Stack position={"relative"} height={"413px"} bgcolor={"secondary.300"} borderRadius={1.5} overflow={'hidden'} mt={3} sx={{
        backgroundImage: `url(${Loyalty2Image})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Typography variant="body2">Period <Box component={"span"} color={"text.secondary"}>#2</Box> Started at 12/12/2022</Typography>
        <Typography variant="body2" color={"text.disabled"}>Total NFT Holder Reward</Typography>
        <Stack mt={1} direction={'row'} columnGap={1} alignItems={'center'} justifyContent={"center"}>
          <Typography variant='h3' fontSize={"48px"}>0,534</Typography>
          <BnbIcon width={40} color={Colors.primaryDark} />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={0.25}>
          <Typography variant="body2" color={"text.disabled"}>Your current reward in this period is <Box component={"span"} color={"text.primary"}>1,5</Box></Typography>
          <BnbIcon width={16} color={Colors.primaryDark} />
        </Stack>
        <Typography variant="body2">Claimable in: 24:39:12</Typography>
        <Box position="absolute" right={"1rem"} bottom={"1rem"} lineHeight={0} sx={{ cursor: "pointer" }}>
          <NotiIcon width={24} />
        </Box>
      </Stack>
      <Divider sx={{
        mt: { xs: 3, md: 5 },
        mb: 3,
      }} />
      <HolderPoolLeaderboard />
    </Box>

  );
}

export default HolderPool
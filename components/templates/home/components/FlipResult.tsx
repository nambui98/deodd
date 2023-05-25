import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import MyImage from "components/ui/image";
import { EnumNFT } from "libs/types";
import Link from "next/link";
import { RightIcon } from "utils/Icons";
import { BnbImage, GoldCupImage } from "utils/Images";
import { Format } from "utils/format";
import { StatusGame, useGameContext } from "../../../../contexts/GameContext";
import { ButtonLoading } from "../../../ui/button";

const dataTypeNFT: { [key in EnumNFT]: string } = {
  [EnumNFT.BRONZE]: "/assets/images/bronze.png",
  [EnumNFT.GOLD]: "/assets/images/gold.png",
  [EnumNFT.DIAMOND]: "/assets/images/diamond.png",
}
export default function FlipResult({ isShowing }: { isShowing: boolean }) {
  const { gameResult, setStatusGame } = useGameContext();
  const {
    coinSide,
    isWinner,
    amount,
    tokenId,
    typeId,
    winningStreakLength,
    tossPoints,
    jackpotWin
  } = gameResult!;

  const renderImage = () => {
    if (isWinner) {
      if (coinSide === 0) {
        return 'head'
      }
      return 'tail'
    } else {
      if (coinSide === 1) {
        return 'head-disable'
      }
      return 'tail-disable'
    }
  }

  return <Box display={isShowing ? 'block' : 'none'}>
    <MyImage mx="auto" width={120} height={120} alt="" src={`/assets/icons/${renderImage()}.svg`} />
    <Stack direction={'row'} mt={5} justifyContent={'center'}>
      <Typography variant="h2" fontWeight={700}>{isWinner ? 'Congrats! You won' : 'Whoops... You lost'} </Typography>
      <Stack ml={1} gap={1} direction={'row'}>
        <Typography variant="h2" color="secondary.main">{isWinner ? amount * 2 : amount} </Typography>
        <MyImage src={BnbImage} alt="" width={24} height={24} />
      </Stack>
    </Stack>
    <Box mx="auto" mt={3} maxWidth={{ xs: 1, sm: 456 }}>
      <Grid container justifyContent="center" rowSpacing={3}>
        {
          winningStreakLength !== null && winningStreakLength !== undefined && winningStreakLength > 1 &&
          <Grid item xs={6}>
            <Stack alignItems={'center'} rowGap={1}>
              <Typography variant="h2" fontWeight={700} color={'secondary.main'}>{winningStreakLength}</Typography>
              <Typography variant="body2" fontWeight={500}  >
                WIN Streak
              </Typography>
            </Stack>
          </Grid>
        }

        {
          tossPoints !== null && tossPoints !== undefined && tossPoints > 0 &&
          <Grid item xs={6}>
            <Stack alignItems={'center'} rowGap={1}>
              <Typography variant="h2" fontWeight={700} color={'secondary.main'}>{tossPoints}</Typography>
              <Typography variant="body2" fontWeight={500}>
                TossPoint
              </Typography>
            </Stack>
          </Grid>
        }

        {
          typeId !== null && typeId !== undefined &&
          <Grid item xs={6}>
            <Stack alignItems={'center'} rowGap={1}>
              <Image width={32} height={32} src={dataTypeNFT[typeId]} alt="" />
              <Typography textAlign={'center'} fontWeight={500} variant="body2">NFT Item</Typography>
            </Stack>
          </Grid>
        }
        {
          jackpotWin !== null && jackpotWin !== undefined && jackpotWin > 0 &&
          <Grid item xs={6}>
            <Stack alignItems={'center'} rowGap={1}>
              <Stack gap={1} direction={'row'} alignItems={'center'}>
                <Image width={32} height={32} src={GoldCupImage} alt="" />
                <Typography textAlign={'center'} fontWeight={700} color={'secondary.main'} variant="h2">{Format.formatMoney(jackpotWin)}</Typography>
                <Image width={24} height={24} src={BnbImage} alt="" />
              </Stack>
              <Typography textAlign={'center'} fontWeight={500} variant="body2">JackPot Win</Typography>
            </Stack>
          </Grid>
        }

      </Grid>

      {!isWinner && <Typography variant="body2" mt={3} fontWeight={400} color="dark.60" textAlign={'center'}>Fall where, double there, don’t give up</Typography>}
      <Grid mt={5} mb={3} columnSpacing={{ xs: 2, md: 3 }} container justifyContent={'center'}>
        <Grid item xs={6}>
          <ButtonLoading title={!isWinner ? 'Try Again' : "Continue Flipping"} onClick={() => {
            setStatusGame(StatusGame.FLIP);
          }} sx={{
            py: 2,
            width: '100%',
          }}>
            <Typography variant="h3" fontWeight={600} textTransform={'none'}>{!isWinner ? 'Try Again' : "Continue Flipping"}</Typography>
          </ButtonLoading>
        </Grid>
        {
          tokenId !== null && tokenId !== undefined &&
          <Grid item xs={6}>
            <ButtonLoading
              href="/assets"
              LinkComponent={Link}
              sx={{
                py: 2,
                width: '100%',
                color: "primary.main",
              }}>
              <Typography variant="h3" fontWeight={600} textTransform={'none'}>Claim NFT in Assets</Typography>
            </ButtonLoading>
          </Grid>
        }

      </Grid>

      {/* <Box display="flex" justifyContent={'center'} sx={{ cursor: 'pointer' }} onClick={() => setStatusGame(StatusGame.FLIP_LOG_DETAIL)}>
        <Typography mr={.5} variant="body2" fontWeight={400} textTransform={'none'}>Fliping Log Detail
        </Typography>
        <RightIcon stroke="#fff" />
      </Box> */}
    </Box>
  </Box >
}
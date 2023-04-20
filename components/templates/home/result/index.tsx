import { TEXT_STYLE } from "../../../../styles/common"
import { Box, BoxProps, ButtonProps, CircularProgress, Stack, styled, Typography } from "@mui/material";
import Image from "next/image"
// import { handleClaimAll } from "../../../../libs/flipCoinContract";
import { useWalletContext } from "../../../../contexts/WalletContext";
import { useEffect, useState } from 'react'
import { Popup } from "../../../common/popup";
import { propsTheme } from "../../../../pages/homepage";
import { useColorModeContext } from "../../../../contexts/ColorModeContext";
import { ButtonMain } from "../../../ui/button";
import { BigNumber, ethers } from "ethers";
import { Format } from "../../../../utils/format";
import { GameResultType, StatusGame, useContractContext } from "../../../../contexts/ContractContext";
import { useDeoddContract } from "hooks/useDeoddContract";
import { BnbImage, GoldCupImage } from "utils/Images";

const dataTypeNFT: any = {
  0: "/assets/images/bronze.png",
  1: "/assets/images/gold.png",
  2: "/assets/images/diamond.png",
}
export const Result = () => {
  const { bnbAssets } = useWalletContext()
  const { darkMode } = useColorModeContext();
  const { gameResult, setStatusGame } = useContractContext();
  const { handleClaimBnb } = useDeoddContract();
  const [statusLoading, setStatusLoading] = useState<boolean>(false)
  const [popup, setPopup] = useState<{ status: boolean, body: any }>({
    status: false,
    body: <></>
  })
  const {
    coinSide,
    flipResult,
    amount,
    tokenId,
    typeId,
    winningStreakAmount,
    winningStreakLength,
    tossPoints,
    jackpotWin
  } = gameResult || {
    coinSide: 1,
    flipResult: 1,
    amount: '0.5',
    typeId: BigNumber.from(0),
    tokenId: BigNumber.from(2),
    tossPoints: BigNumber.from(4),
    winningStreakLength: 1,
    // jackpotWin: BigNumber.from(2)
  };
  console.log(!jackpotWin)
  // console.log();

  const renderImage = () => {
    if (coinSide === flipResult) {
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

  const bodyPopupError = (message: string) => {
    return (
      <Box sx={{ textAlign: 'center', maxWidth: '304px', margin: 'auto' }}>
        <Box><img alt="" src='assets/icons/close-circle.svg' /></Box>
        <Typography sx={{ ...TEXT_STYLE(14, 500, !darkMode ? '#181536' : '#ffffff'), margin: '24px 0' }}>{message}</Typography>
        <ButtonMain active={true} title={'Try again'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ width: "100%" }} />
      </Box>
    )
  }

  const handleClaim = async () => {
    if (!statusLoading && bnbAssets.gt(BigNumber.from(0))) {
      setStatusLoading(true)
      try {
        await handleClaimBnb();
      } catch (error: any) {
        setStatusLoading(false)
        setPopup({ status: true, body: bodyPopupError(error.reason || 'Something went wrong. Please try again!') })
      }
    }
  }

  // useEffect(() => {
  //   const audio = new Audio(`/assets/${coinSide === flipResult ? 'win' : 'lost'}.mp3`);
  //   audio.play();
  // }, [flipResult, coinSide])

  let typeNFT: number | undefined = typeId.toNumber();
  return <Box>
    <Box><img width={120} height={120} alt="" src={`assets/icons/${renderImage()}.svg`} /></Box>
    <Stack direction={'row'} mt={5} justifyContent={'center'}>

      <Typography variant="h2">{coinSide === flipResult ? 'Congrats! You won' : 'Whoops... You lost'} </Typography>
      <Stack ml={1} gap={1} direction={'row'}>

        <Typography variant="h2" color="secondary.main">{amount} </Typography>
        <img src={BnbImage} alt="" width={24} height={24} />
      </Stack>
    </Stack>

    <Box mt={3} mb={5}>
      <Stack direction={'row'} justifyContent={'center'} columnGap={20.875} alignItems={'flex-start'}>
        <Stack>
          <Stack alignItems={'center'} rowGap={1}>
            <Typography variant="h2" fontWeight={700} color={'secondary.main'}>{winningStreakLength}</Typography>
            <Typography variant="h3" >
              WIN STREAK
            </Typography>
          </Stack>
          {
            tokenId.gt(BigNumber.from(0)) &&
            jackpotWin?.gt(BigNumber.from(0)) &&
            <Box mt={3} >
              <Stack alignItems={'center'} rowGap={1}>
                <Image width={32} height={32} src={dataTypeNFT[typeNFT || 0]} alt="" />
                <Typography textAlign={'center'} fontWeight={500} variant="body2">NFT Item</Typography>
              </Stack>
            </Box>
          }
        </Stack>
        <Box>
          {
            tossPoints?.gt(BigNumber.from(0)) &&
            <Stack alignItems={'center'} rowGap={1}>
              <Typography variant="h2" fontWeight={700} color={'secondary.main'}>{tossPoints?.toNumber()}</Typography>
              <Typography variant="h3">

                TOSSPOINT
              </Typography>
            </Stack>
          }

          {

            jackpotWin?.gt(BigNumber.from(0)) &&
            tokenId?.gt(BigNumber.from(0)) &&
            <Stack mt={3} alignItems={'center'} rowGap={1}>
              <Stack gap={1} direction={'row'} alignItems={'center'}>
                <Image width={32} height={32} src={GoldCupImage} alt="" />
                <Typography textAlign={'center'} fontWeight={700} color={'secondary.main'} variant="h2">1,242</Typography>
                <Image width={24} height={24} src={BnbImage} alt="" />
              </Stack>
              <Typography textAlign={'center'} fontWeight={500} variant="body2">JackPot Win</Typography>
            </Stack>
          }

        </Box>
      </Stack>
      {

        (tokenId.lte(BigNumber.from(0)) || !jackpotWin ||
          jackpotWin?.lte(BigNumber.from(0))) && <Stack direction={'row'} justifyContent={'center'} mt={3}>
          {
            tokenId.gt(BigNumber.from(0)) &&
            <Stack alignItems={'center'} rowGap={1}>
              <Image width={32} height={32} src={dataTypeNFT[typeNFT || 0]} alt="" />
              <Typography textAlign={'center'} fontWeight={500} variant="body2">NFT Item</Typography>
            </Stack>
          }
          {

            jackpotWin?.gt(BigNumber.from(0)) &&
            <Stack alignItems={'center'} rowGap={1}>
              <Stack gap={1} direction={'row'} alignItems={'center'}>
                <Image width={32} height={32} src={GoldCupImage} alt="" />
                <Typography textAlign={'center'} fontWeight={700} color={'secondary.main'} variant="h2">1,242</Typography>
                <Image width={24} height={24} src={BnbImage} alt="" />
              </Stack>
              <Typography textAlign={'center'} fontWeight={500} variant="body2">JackPot Win</Typography>
            </Stack>
          }
        </Stack>
      }

    </Box>
    <Stack
      direction={'row'}
      gap={3}
      mb={3}
      justifyContent='center'
    >

      <ButtonMain title={coinSide !== flipResult ? 'TRY AGAIN' : "CONTINUE FLIP"} active={true} onClick={() => {
        setStatusGame(StatusGame.flip);
      }} customStyle={{

        padding: '13.5px',
        maxWidth: '225px',
        width: '100%',

        // maxWidth: 216,
        // width: '100%',
      }} />
      {
        (jackpotWin?.gt(BigNumber.from(0)) ||
          tokenId.gt(BigNumber.from(0))) &&
        <ButtonMain
          active
          title={statusLoading ? <CircularProgress sx={{ width: '25px !important', height: 'auto !important' }} color="inherit" /> : "Claim NFT in Assets"} onClick={handleClaim} customStyle={{
            padding: '13.5px',
            maxWidth: '225px',
            width: '100%',
            borderColor: "primary.main",
            color: "primary.main",

          }} />

      }
    </Stack>

    {coinSide !== flipResult && <Typography variant="h3" mb={2}>Fall where, double there, don’t give up</Typography>}
    <Popup status={popup.status} handleClose={() => setPopup({ ...popup, status: false })} customWidth={{ width: '100%', maxWidth: '381px', padding: '16px' }} body={<Box>
      {popup.body}
    </Box>} />
  </Box >
}



const Title = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(24, 500, props.themelight ? '#181536' : '#FFFFFF'),
  fontFamily: 'BeVietnamPro',
  textTransform: 'uppercase',
  marginBottom: 40,
  '& span': {
    color: props.themelight ? '#FC753F' : '#FEF156'
  }
}))
const BoxAmount = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between'
})
// const WinStreak = styled(Box)((props: propsTheme) => ({
//   ...TEXT_STYLE(24, 500, props.themelight ? '#181536' : '#FFFFFF'),
//   marginBottom: 40,
//   padding: '0 21.5px',
//   '& div': {
//     ...TEXT_STYLE(40, 500, props.themelight ? '#FC753F' : '#FEF156'),
//     marginBottom: 8
//   }
// }))
const TextFail = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(16, 500, props.themelight ? '#181536' : '#FFFFFF'),
  marginBottom: 24
}))
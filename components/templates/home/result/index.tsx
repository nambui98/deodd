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
  } = gameResult!;
  const renderImage = () => {
    if (coinSide === flipResult) {
      if (coinSide === '0') {
        return 'head'
      }
      return 'tail'
    } else {
      if (coinSide === '1') {
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

  const bodyPopupSuccess = (
    <Box sx={{ textAlign: 'center', maxWidth: '304px', margin: 'auto' }}>
      <Typography sx={{ ...TEXT_STYLE(24, 500, !darkMode ? '#181536' : '#ffffff'), marginBottom: '24px' }}>Claim successful!</Typography>
      <ButtonMain active={true} title={'OKEY'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ width: "100%" }} />
    </Box>
  )

  const handleClaim = async () => {
    if (!statusLoading && bnbAssets.gt(BigNumber.from(0))) {
      setStatusLoading(true)
      try {
        const res = await handleClaimBnb();
        if (res.status) {
          setStatusLoading(false)
          setPopup({ status: true, body: bodyPopupSuccess })
        }
      } catch (error: any) {
        setStatusLoading(false)
        setPopup({ status: true, body: bodyPopupError(error.reason || 'Something went wrong. Please try again!') })
      }
    }
  }

  useEffect(() => {
    const audio = new Audio(`/assets/${coinSide === flipResult ? 'win' : 'lost'}.mp3`);
    audio.play();
  }, [flipResult, coinSide])

  let typeNFT: number | undefined = typeId.toNumber();
  return <Wrap>
    <Coin><img alt="" src={`assets/icons/${renderImage()}.svg`} /></Coin>
    <Title themelight={!darkMode}>{coinSide === flipResult ? 'Congrats! YOU WON' : 'WHOOPS! YOU LOST'} <span style={{ color: !darkMode ? coinSide === flipResult ? '#FC753F' : '#FF6F61' : coinSide === flipResult ? '#FEF156' : '#FF6F61' }}>{amount} BNB</span>!</Title>
    <Box>
      <Box display={'flex'} justifyContent={"center"} alignItems={'flex-start'}>
        <Box>
          <WinStreak themelight={!darkMode}>
            <div>{winningStreakLength}</div>
            WIN STREAK
          </WinStreak>
          {
            tokenId.gt(BigNumber.from(0)) && <>
              <Image width={47} height={48} src={dataTypeNFT[typeNFT || 0]} alt="" />
              <Typography mt={1} mb={4} textAlign={'center'} variant="h5" style={{ ...TEXT_STYLE(24, 500), textTransform: 'uppercase' }}>NFT ITEM</Typography>
            </>
          }
        </Box>
        <Box>
          {
            tossPoints?.gt(BigNumber.from(0)) &&
            <WinStreak themelight={!darkMode}>
              <div>{tossPoints?.toNumber()}</div>
              TOSSPOINT
            </WinStreak>
          }
          {
            jackpotWin?.gt(BigNumber.from(0)) &&
            <WinStreak sx={{ mt: 0 }} themelight={!darkMode}>
              <div>{Format.formatMoney(ethers.utils.formatUnits(jackpotWin ?? BigNumber.from(0)))}</div>
              JACKPOT WIN (BNB)
            </WinStreak>
          }
        </Box>
      </Box>
      {

        (jackpotWin?.gt(BigNumber.from(0)) ||
          tokenId.gt(BigNumber.from(0))) &&
        <ButtonMain title={statusLoading ? <CircularProgress sx={{ width: '25px !important', height: 'auto !important' }} color="inherit" /> : "CLAIM ALL"} active={bnbAssets.gt(BigNumber.from(0)) ? true : false} onClick={handleClaim} customStyle={{
          padding: '13.5px',
          maxWidth: '225px',
          width: '100%',
          marginBottom: '24px'
        }} />

      }
    </Box>
    {coinSide !== flipResult && <TextFail themelight={!darkMode}>Fall where, double there, don’t give up</TextFail>}
    <Box sx={{
      display: 'flex',
      justifyContent: 'center'
    }}>

      <ButtonMain title={coinSide !== flipResult ? 'TRY AGAIN' : "CONTINUE FLIP"} active={true} onClick={() => {
        setStatusGame(StatusGame.flip);
      }} customStyle={{
        padding: '13.5px',
        maxWidth: '225px',
        width: '100%',
      }} />
    </Box>
    <Popup status={popup.status} handleClose={() => setPopup({ ...popup, status: false })} customWidth={{ width: '100%', maxWidth: '381px', padding: '16px' }} body={<Box>
      {popup.body}
    </Box>} />
  </Wrap>
}

const Wrap = styled(Box)({

})

const Coin = styled(Box)({
  marginBottom: 24
})

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
const WinStreak = styled(Box)((props: propsTheme) => ({
  ...TEXT_STYLE(24, 500, props.themelight ? '#181536' : '#FFFFFF'),
  marginBottom: 40,
  padding: '0 21.5px',
  '& div': {
    ...TEXT_STYLE(40, 500, props.themelight ? '#FC753F' : '#FEF156'),
    marginBottom: 8
  }
}))
const TextFail = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(16, 500, props.themelight ? '#181536' : '#FFFFFF'),
  marginBottom: 24
}))
import { Button } from "../../components/button"
import { TEXT_STYLE } from "../../styles/common"
import { Box, BoxProps, ButtonProps, CircularProgress, Stack, styled, Typography } from "@mui/material";
import { handleClaimAll } from "../../libs/flipCoinContract";
import { useWalletContext } from "../../contexts/WalletContext";
import { useEffect, useState } from 'react'
import { Popup } from "../../components/popup";
import { propsTheme } from "../../pages/homepage";

interface IProps {
  amount: string | undefined,
  coinSide: string | undefined,
  flipResult: string | undefined,
  winningStreakAmount: string | undefined,
  winningStreakLength: string | undefined,
  playAgain: () => any
}

export const Result: React.FC<IProps> = ({ amount, coinSide, flipResult, winningStreakAmount, winningStreakLength, playAgain }) => {
  const { ethersSigner, refresh, setRefresh, bnbAssets, theme } = useWalletContext()
  const [statusLoading, setStatusLoading] = useState<boolean>(false)
  const [popup, setPopup] = useState<{ status: boolean, body: any }>({
    status: false,
    body: <></>
  })
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
        <Box><img src='assets/icons/close-circle.svg' /></Box>
        <Typography sx={{ ...TEXT_STYLE(14, 500, theme === 'light' ? '#181536' : '#ffffff'), margin: '24px 0' }}>{message}</Typography>
        <Button active={true} title={'Try again'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ padding: 13.5 }} />
      </Box>
    )
  }

  const bodyPopupSuccess = (
    <Box sx={{ textAlign: 'center', maxWidth: '304px', margin: 'auto' }}>
      <Typography sx={{ ...TEXT_STYLE(24, 500, theme === 'light' ? '#181536' : '#ffffff'), marginBottom: '24px' }}>Claim successful!</Typography>
      <Button active={true} title={'OKEY'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ padding: 13.5 }} />
    </Box>
  )

  const handleClaim = async () => {
    if (!statusLoading && parseFloat(bnbAssets) > 0) {
      setStatusLoading(true)
      try {
        const res = await handleClaimAll(ethersSigner)
        if (res.status) {
          setStatusLoading(false)
          setRefresh(!refresh)
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
  }, [])

  return <Wrap>
    <Coin><img src={`assets/icons/${renderImage()}.svg`} /></Coin>
    <Title themeLight={theme === 'light'}>{coinSide === flipResult ? 'Congrats! YOU WON' : 'WHOOPS! YOU LOST'} <span style={{ color: theme === 'light' ? coinSide === flipResult ? '#FC753F' : '#FF6F61' : coinSide === flipResult ? '#FEF156' : '#FF6F61' }}>{amount} BNB</span>!</Title>
    {coinSide === flipResult && <BoxAmount sx={{
      justifyContent: 'space-between'
    }}>
      <WinStreak themeLight={theme === 'light'}>
        <div>{winningStreakLength}</div>
        WIN STREAK
      </WinStreak>
      <WinStreak themeLight={theme === 'light'}>
        <div>{winningStreakAmount}</div>
        BALANCE (BNB)
      </WinStreak>
    </BoxAmount>}
    {coinSide !== flipResult && <TextFail themeLight={theme === 'light'}>Fall where, double there, don’t give up</TextFail>}
    <Box sx={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      {coinSide === flipResult && <Button title={statusLoading ? <CircularProgress sx={{ width: '25px !important', height: 'auto !important' }} color="inherit" /> : "CLAIM ALL"} active={parseFloat(bnbAssets) > 0 ? true : false} onClick={handleClaim} customStyle={{
        padding: '13.5px',
        maxWidth: '225px',
        width: '100%',
        marginRight: '24px'
      }} />}
      <Button title={coinSide !== flipResult ? 'TRY AGAIN' : "PLAY AGAIN"} active={true} onClick={playAgain} customStyle={{
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
  ...TEXT_STYLE(24, 500, props.themeLight ? '#181536' : '#FFFFFF'),
  textTransform: 'uppercase',
  marginBottom: 40,
  '& span': {
    color: props.themeLight ? '#FC753F' : '#FEF156'
  }
}))
const BoxAmount = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between'
})
const WinStreak = styled(Box)((props: propsTheme) => ({
  ...TEXT_STYLE(24, 500, props.themeLight ? '#181536' : '#FFFFFF'),
  marginBottom: 40,
  padding: '0 21.5px',
  '& div': {
    ...TEXT_STYLE(40, 500, props.themeLight ? '#FC753F' : '#FEF156'),
    marginBottom: 8
  }
}))
const TextFail = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(16, 500, props.themeLight ? '#181536' : '#FFFFFF'),
  marginBottom: 24
}))
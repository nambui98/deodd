import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { Button } from "../../components/button"
import { useWalletContext } from "../../contexts/WalletContext"
import { approvePurchase, createProfile, getAllowance, getCalculateFee, getFlipTokenDetail, getLastFlipId, getPlayerAssets, getUserInfo, getWinningStreakAmount, getWinningStreakLength, handleFlipToken } from "../../libs/flipCoinContract"
import { convertWalletAddress, formatMoney } from "../../libs/utils/utils"
import { TEXT_STYLE } from "../../styles/common"
import { Flipping } from "../flipping"
import { Result } from "../result"
import { Backdrop, Box, BoxProps, ButtonProps, CircularProgress, InputBase, Stack, styled, Typography } from "@mui/material";
import { propsTheme, StatusGame } from "../../pages/homepage"
import { Popup } from "../../components/popup"

const amount = [0.005, 0.01, 0.025, 0.05, 0.1, 0.2]

const avatar = [
  'assets/images/avatar-yellow.png',
  'assets/images/avatar-orange.png',
  'assets/images/avatar-pink.png',
  'assets/images/avatar-violet.png',
  'assets/images/avatar-green.png'
]

interface IProps {
  statusGame: StatusGame
  setStatusGame: (status: StatusGame) => any
}

export const PlayPart: React.FC<IProps> = ({ statusGame, setStatusGame }) => {
  const { walletAccount, setWalletAccount, ethersSigner, updateAssetsBalance, userInfo, setRefresh, refresh, theme, bnbAssets } = useWalletContext()
  const [popup, setPopup] = useState<{ status: boolean, body: any }>({
    status: false,
    body: <></>
  })
  const [currentProfile, setCurrentProfile] = useState<{ username: any, avatar: any }>({ username: null, avatar: userInfo.avatar || 0 })
  const [dataSelect, setDataSelect] = useState<{
    coinSide?: 0 | 1,
    amount?: number
  }>()
  const [dataResult, setDataResult] = useState<{
    amount: string,
    coinSide: string,
    flipResult: string,
    winningStreakAmount: string,
    winningStreakLength: string
  }>()
  const [statusLoading, setStatusLoading] = useState<boolean>(false)
  const [statusLoadingFlip, setStatusLoadingFlip] = useState<boolean>(false)

  const bodyPopupError = (message: string) => {
    return (
      <Box sx={{ textAlign: 'center', maxWidth: '304px' }}>
        <Box><img src='assets/icons/close-circle.svg' /></Box>
        <Typography sx={{ ...TEXT_STYLE(14, 500, theme === 'light' ? '#181536' : '#ffffff'), margin: '24px 0' }}>{message}</Typography>
        <Button active={true} title={'Try again'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ padding: 13.5 }} />
      </Box>
    )
  }

  const bodyPopupSuccess = (
    <Box sx={{ textAlign: 'center', maxWidth: '304px', margin: 'auto' }}>
      <Typography sx={{ ...TEXT_STYLE(24, 500, '#ffffff'), marginBottom: '24px' }}>Profile updated !</Typography>
      <Button active={true} title={'OKAY'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ padding: 13.5 }} />
    </Box>
  )

  const handlePlayGame = async () => {
    if (!statusLoadingFlip) {
      setStatusLoadingFlip(true)
      const getCaculateFee = await getCalculateFee(ethersSigner, `${dataSelect?.amount}`)
      const handleDeposit = async () => {
        const audio = new Audio('/assets/roll.mp3');
        audio.play();
        try {
          setStatusGame(StatusGame.flipping)
          setPopup({ ...popup, status: false })
          if (getCaculateFee) {
            const res = await handleFlipToken(
              ethersSigner,
              `${(dataSelect?.amount || 0)}`,
              dataSelect?.coinSide || 0,
              `${(dataSelect?.amount || 0) + parseFloat(ethers.utils.formatUnits(getCaculateFee)) - parseFloat(bnbAssets)}`
            )
            if (res.status) {
              await handleGetResult()
            }
          }
          setStatusLoadingFlip(false)
        } catch (error: any) {
          setStatusLoadingFlip(false)
          setStatusGame(StatusGame.flip)
          setPopup({
            status: true,
            body: bodyPopupError(error.reason || 'Something went wrong. Please try again!')
          })
        }
      }
      if ((dataSelect?.coinSide === 0 || dataSelect?.coinSide === 1) && dataSelect.amount) {
        try {
          if (parseFloat(bnbAssets) > parseFloat(`${dataSelect?.amount}`)) {
            const audio = new Audio('/assets/roll.mp3');
            audio.play();
            setStatusGame(StatusGame.flipping)
            const res = await handleFlipToken(ethersSigner, `${(dataSelect.amount || 0)}`, dataSelect.coinSide || 0, '0')
            if (res.status) {
              await handleGetResult()
            }
          } else if (parseFloat(bnbAssets) === 0) {
            handleDeposit()
          } else {
            setPopup({
              status: true,
              body: <>
                <TitlePopup themeLight={theme === 'light'}>Add more token</TitlePopup>
                <Typography sx={{
                  ...TEXT_STYLE(14, 400, theme === 'light' ? '#181536' : '#FFFFFF'),
                  marginBottom: '24px'
                }}>You don’t have enough token, add more to flip!</Typography>
                <Box>
                  <ItemBodyPopup themeLight={theme === 'light'}>Current balance <span>{formatMoney(`${bnbAssets}`)} BNB</span></ItemBodyPopup>
                  <ItemBodyPopup themeLight={theme === 'light'}>Bet amount <span>{dataSelect.amount} BNB</span></ItemBodyPopup>
                  <ItemBodyPopup themeLight={theme === 'light'}>Need more <span>{formatMoney(`${(dataSelect?.amount || 0) - parseFloat(bnbAssets) + parseFloat(ethers.utils.formatUnits(getCaculateFee))}`)} BNB</span></ItemBodyPopup>
                </Box>
                <Button active={true} title={'DEPOSITE & FLIP'} onClick={handleDeposit} customStyle={{ padding: 13.5 }} />
              </>,
            })
          }
          setStatusLoadingFlip(false)
        } catch (error: any) {
          setStatusGame(StatusGame.flip)
          setStatusLoadingFlip(false)
          setPopup({
            status: true,
            body: bodyPopupError(error.reason || 'Something went wrong. Please try again!')
          })
        }
      }
    }
  }

  const handleGetResult = async () => {
    try {
      const getIdFlip = await getLastFlipId(ethersSigner, walletAccount)
      const res = await getFlipTokenDetail(ethersSigner, parseFloat(ethers.utils.formatUnits(getIdFlip, 'wei')))
      if (res) {
        const winningStreakAmount = await getWinningStreakAmount(ethersSigner, walletAccount)
        const winningStreakLength = await getWinningStreakLength(ethersSigner, walletAccount)
        setDataResult({
          amount: parseFloat(ethers.utils.formatUnits(res.amount)).toString(),
          coinSide: ethers.utils.formatUnits(res.coinSide, 'wei'),
          flipResult: ethers.utils.formatUnits(res.flipResult, 'wei'),
          winningStreakAmount: parseFloat(ethers.utils.formatUnits(winningStreakAmount)).toString(),
          winningStreakLength: parseFloat(ethers.utils.formatUnits(winningStreakLength, 'wei')).toString()
        })
        setStatusGame(StatusGame.result)
        setRefresh(!refresh)
      }
    } catch (error: any) {
      setStatusGame(StatusGame.flip)
      setPopup({
        status: true,
        body: bodyPopupError(error.reason || 'Something went wrong. Please try again!')
      })
    }
  }

  const handleShowDisconnect = () => {
    setPopup({
      status: true,
      body: <Box>
        <TitlePopup themeLight={theme === 'light'}>Disconnect</TitlePopup>
        <SubtitlePopup themeLight={theme === 'light'}>Do you want to disconnect your wallet?</SubtitlePopup>
        <Button active={true} title={'NO'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ padding: 13.5, marginBottom: '16px' }} />
        <Button active={false} title={'YES'} onClick={() => setWalletAccount(null)} customStyle={{ padding: 13.5 }} />
      </Box>
    })
  }

  const handleSetProfile = async () => {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(currentProfile.username)) {
      return
    }

    if (!statusLoading) {
      setStatusLoading(true)
      try {
        const res = await createProfile(ethersSigner, currentProfile.username || userInfo.userName, currentProfile.avatar)
        if (res.status) {
          setStatusLoading(false)
          setRefresh(!refresh)
          updateAssetsBalance();
          setPopup({ ...popup, body: bodyPopupSuccess })
        }
      } catch (error: any) {
        console.log(error)
        setStatusLoading(false)
        setPopup({
          status: true,
          body: bodyPopupError(error.reason || 'Something went wrong. Please try again!')
        })
      }
    }
  }

  const bodyCreateProfile = (
    <Box sx={{ textAlign: 'center', maxWidth: '304px' }}>
      <TitlePopup themeLight={theme === 'light'}>{userInfo.userName ? 'Change' : 'Create'} profile</TitlePopup>
      <BoxAvatar><img src={currentProfile.avatar !== null ? avatar[currentProfile.avatar] : avatar[parseFloat(userInfo.avatar)]} /></BoxAvatar>
      <ListAvatar>
        {avatar.map((item, index) => <Box onClick={() => setCurrentProfile({ ...currentProfile, avatar: index })} key={index}><img src={item} /></Box>)}
      </ListAvatar>
      <InputNickname value={currentProfile.username !== null ? currentProfile.username : userInfo.userName} themeLight={theme === 'light'} placeholder="Nickname" onChange={(e) => setCurrentProfile({ ...currentProfile, username: e.target.value })}></InputNickname>
      <Typography sx={{
        ...TEXT_STYLE(12, 400, theme === 'light' ? '#181536' : '#FFFFFF'),
        marginBottom: '24px'
      }}>{userInfo.userName ? '*If you change a Nickname, you will be charged some gas fee for this.' : '*If you choose to create a Nickname, you will be charged some gas fee for this.'}</Typography>
      <Button disable={((parseFloat(currentProfile.avatar) !== parseFloat(userInfo.avatar)) || (currentProfile.username !== userInfo.userName && currentProfile.username !== null)) ? false : true}
        active={true}
        title={statusLoading ? <CircularProgress sx={{ width: '25px !important', height: 'auto !important' }} color="inherit" /> : 'SAVE'} onClick={handleSetProfile} customStyle={{ padding: 13.5, marginBottom: '16px' }} />
      <Button active={false} title={'CLOSE'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ padding: 13.5 }} />
    </Box>
  )

  const handleCreateProfile = () => {
    setPopup({
      status: true,
      body: bodyCreateProfile
    })
  }

  const checkAvatar = () => {
    switch (userInfo?.avatar) {
      case '0': return 'avatar-yellow'
      case '1': return 'avatar-orange'
      case '2': return 'avatar-pink'
      case '3': return 'avatar-violet'
      case '4': return 'avatar-green'
    }
  }

  const renderPlayPart = () => {
    return <div>
      <BoxWallet themeLight={theme === 'light'}>
        <Avt><img src={userInfo?.avatar ? `assets/images/${checkAvatar()}.png` : "assets/icons/avt.svg"} /></Avt>
        <Box sx={{ '@media (min-width: 800px)': { display: 'flex', alignItems: 'center' } }}>
          <Wallet themeLight={theme === 'light'}>{userInfo?.userName ? <Box>
            {userInfo?.userName}
            <Box>({convertWalletAddress(walletAccount, 5, 4)})</Box>
          </Box> : convertWalletAddress(walletAccount, 6, 3)}</Wallet>
          <NickName onClick={handleCreateProfile}>{userInfo.userName ? 'Change' : 'Create'} nickname</NickName>
        </Box>
        <NickName style={{ marginLeft: 'auto' }} onClick={handleShowDisconnect}>Disconnect</NickName>
      </BoxWallet>
      <h5 style={{ ...TEXT_STYLE(24, 500, '#FFFFFF'), marginBottom: '16px', textAlign: 'left' }}>You like</h5>
      <BoxCoin>
        <Itemcoin themeLight={theme === 'light'} active={dataSelect?.coinSide === 0} onClick={() => setDataSelect({ ...dataSelect, coinSide: 0 })}><img src={`assets/icons/head${dataSelect?.coinSide === 0 ? '' : '-disable'}.svg`} /> HEAD</Itemcoin>
        <Itemcoin themeLight={theme === 'light'} active={dataSelect?.coinSide === 1} onClick={() => setDataSelect({ ...dataSelect, coinSide: 1 })}><img src={`assets/icons/tail${dataSelect?.coinSide === 1 ? '' : '-disable'}.svg`} /> TAIL</Itemcoin>
      </BoxCoin>
      <h5 style={{ ...TEXT_STYLE(24, 500, '#FFFFFF'), marginBottom: '16px', textAlign: 'left' }}>Bet amount</h5>
      <BoxAmount>
        {amount?.map((item, index) => (
          <AmountItem key={index}><Button title={`${item} BNB`} onClick={() => setDataSelect({ ...dataSelect, amount: item })} active={true} customStyle={{
            padding: '11.5px 9.5px',
            background: theme === 'light' ? (dataSelect?.amount === item ? '#FC753F' : '#FFFFFF') : (dataSelect?.amount === item ? '#FEF156' : '#25244B'),
            color: theme === 'light' ? dataSelect?.amount === item ? '#FFFFFF' : '#FC753F' : dataSelect?.amount === item ? '#1C1B3E' : '#FEF156',
          }} /></AmountItem>
        ))}
      </BoxAmount>
      <Button
        disable={(dataSelect?.coinSide === 0 || dataSelect?.coinSide === 1) && dataSelect.amount ? false : true}
        active={(dataSelect?.coinSide === 0 || dataSelect?.coinSide === 1) && dataSelect.amount ? true : false}
        title={statusLoadingFlip ? <CircularProgress sx={{ width: '25px !important', height: 'auto !important' }} color="inherit" /> : 'double or nothing'}
        onClick={handlePlayGame} customStyle={{
          padding: '13.5px 0',
          marginTop: 16
        }} />
    </div>
  }

  const renderUi = () => {
    switch (statusGame) {
      case 0: return renderPlayPart()
      case 1: return <Flipping amount={`${dataSelect?.amount}`} />
      case 2: return <Result
        amount={dataResult?.amount}
        coinSide={dataResult?.coinSide}
        flipResult={dataResult?.flipResult}
        winningStreakAmount={dataResult?.winningStreakAmount}
        winningStreakLength={dataResult?.winningStreakLength}
        playAgain={() => setStatusGame(0)}
      />
    }
  }

  useEffect(() => {
    popup.status && setPopup({
      status: true,
      body: bodyCreateProfile
    })
  }, [currentProfile.avatar, currentProfile.username])

  useEffect(() => {
    if (localStorage.getItem('popupCreateProfile') !== walletAccount) {
      localStorage.setItem('popupCreateProfile', walletAccount)
      localStorage.getItem('popupCreateProfile') === walletAccount && handleCreateProfile()
    }
  }, [walletAccount, ethersSigner])

  useEffect(() => {
    statusLoading && setPopup({ status: true, body: bodyCreateProfile })
  }, [statusLoading])

  useEffect(() => {
    parseFloat(userInfo.avatar) !== currentProfile.avatar && setCurrentProfile({ username: userInfo.userName, avatar: userInfo.avatar })

  }, [userInfo.avatar])

  return <Wrap>
    {renderUi()}
    <Popup status={popup.status} handleClose={() => { setPopup({ ...popup, status: false }) }} body={<Box>
      {popup.body}
    </Box>} />
  </Wrap>
}

const Wrap = styled(Box)({
  width: '100%',
  maxWidth: 544
})
const BoxWallet = styled(Box)((props: propsTheme) => ({
  padding: '12px 16px',
  background: props.themeLight ? '#F8F9FB' : '#181536',
  borderRadius: 8,
  marginBottom: 32,
  display: 'flex',
  alignItems: 'center',
}))
const Avt = styled(Box)({
  marginRight: 16,
  '& img': {
    maxWidth: 48
  }
})
const Wallet = styled(Box)((props: propsTheme) => ({
  ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#FFFFFF'),
  marginRight: 24,
  marginBottom: 8,
  '@media (min-width: 800px)': {
    marginBottom: 0
  }
}))
const NickName = styled(Box)({
  ...TEXT_STYLE(14, 500, '#7071B3'),
  cursor: 'pointer'
})
const BoxCoin = styled(Box)({
  marginBottom: 32,
  display: 'flex',
  justifyContent: 'center',
  '@media (min-width: 800px)': {
    justifyContent: 'flex-start',
  }
})
type ItemCoinProps = {
  active: boolean,
  themeLight: boolean
}
const Itemcoin = styled(Box)((props: ItemCoinProps) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column' as any,
  marginRight: 38,
  ...TEXT_STYLE(40, 700, props.themeLight ? props.active ? '#FC753F' : '#5A6178' : props.active ? '#FEF156' : '#5A6178'),
  cursor: 'pointer',
  '& img': {
    '@media (min-width: 1000px)': {
      marginRight: 24,
    }
  },
  '@media (min-width: 1000px)': {
    flexDirection: 'row' as any,
  },
  '@media (max-width: 800px)': {
    '&:last-of-type': {
      marginRight: 0
    }
  }
}))
const BoxAmount = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  '@media (min-width: 800px)': {
    justifyContent: 'flex-start'
  }
})
const AmountItem = styled(Box)({
  width: 'calc(33.3333% - 14px)',
  marginBottom: 16,
  '& > div': {
    width: '100% !important',
  },

  '@media (min-width: 800px)': {
    width: 'auto',
    padding: '0 12px 16px',
    '& > div': {
      width: '112px !important',
    },
  }
})

const TitlePopup = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(24, 500, props.themeLight ? '#181536' : '#FFFFFF'),
  marginBottom: 24,
  textAlign: 'center'
}))
const SubtitlePopup = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(14, 400, props.themeLight ? '#181536' : '#FFFFFF'),
  marginBottom: 24
}))
type ItemBodyPopupProps = {
  themeLight: boolean
}
const ItemBodyPopup = styled(Box)((props: ItemBodyPopupProps) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 24,
  ...TEXT_STYLE(14, 400, props.themeLight ? '#181536' : '#FFFFFF'),
  '& span': {
    ...TEXT_STYLE(14, 600, props.themeLight ? '#FC753F' : '#FEF156'),
  },
}))
const BoxAvatar = styled(Box)({
  marginBottom: 24,
  '& img': {
    maxWidth: 120
  }
})
const ListAvatar = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 24,
  '& div': {
    marginRight: 16,
    cursor: 'pointer',
    '&:last-of-type': {
      marginRight: 0
    },
    '& img': {
      maxWidth: 40
    }
  }
})
const InputNickname = styled(InputBase)((props: propsTheme) => ({
  padding: 12,
  background: props.themeLight ? '#E9EAEF' : '#25244B',
  borderRadius: 8,
  textAlign: 'center',
  ...TEXT_STYLE(18, 500, props.themeLight ? '#181536' : '#7071B3'),
  width: '100%',
  marginBottom: 24,
  '& input': {
    textAlign: 'center'
  }
}))


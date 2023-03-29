import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
// import { Button } from "../../../ui/button"
import { useWalletContext } from "../../../../contexts/WalletContext"
import { approvePurchase, createProfile, getAllowance, getCalculateFee, getLastFlipId, getPlayerAssets, getUserInfo, getWinningStreakAmount, getWinningStreakLength, handleFlipToken } from "../../../../libs/flipCoinContract"
import { TEXT_STYLE } from "../../../../styles/common"
import { Flipping } from "../flipping"
import { Result } from "../result"
import { Backdrop, Box, BoxProps, ButtonProps, CircularProgress, Grid, InputBase, Stack, styled, Typography } from "@mui/material";
import { propsTheme, StatusGame } from "../../../../pages/homepage"
import { Popup } from "../../../common/popup"
import { useColorModeContext } from "../../../../contexts/ColorModeContext"
import { ButtonMain } from "../../../ui/button"
import { Format } from "../../../../utils/format"
import { Convert } from "../../../../utils/convert"
import { useContractContext } from "../../../../contexts/ContractContext"

const amounts = [0.016, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12]

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

export const PlayPart: React.FC<any> = () => {
  const { walletAddress, setWalletAddress, contractFeeManager, updateAssetsBalance, userInfo, bnbAssets, bnbBalance } = useWalletContext()
  const { setIsFinish, audio, gameResult, statusGame, setStatusGame } = useContractContext();
  const { darkMode } = useColorModeContext();
  const [popup, setPopup] = useState<{ status: boolean, body: any }>({
    status: false,
    body: <></>
  })
  const [currentProfile, setCurrentProfile] = useState<{ username: any, avatar: any }>({ username: null, avatar: userInfo.avatar || 0 })
  const [dataSelect, setDataSelect] = useState<{
    coinSide?: 0 | 1,
    amount?: number,
    index?: number,
  }>()

  const [statusLoading, setStatusLoading] = useState<boolean>(false)
  const [statusLoadingFlip, setStatusLoadingFlip] = useState<boolean>(false)

  const bodyPopupError = (message: string) => {
    return (
      <Box sx={{ textAlign: 'center', maxWidth: '304px' }}>
        <Box><img alt="" src='assets/icons/close-circle.svg' /></Box>
        <Typography sx={{ ...TEXT_STYLE(14, 500, !darkMode ? '#181536' : '#ffffff'), margin: '24px 0' }}>{message}</Typography>
        <ButtonMain active={true} title={'Try again'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ width: '100%' }} />
      </Box>
    )
  }

  const bodyPopupSuccess = (
    <Box sx={{ textAlign: 'center', maxWidth: '304px', margin: 'auto' }}>
      <Typography sx={{ ...TEXT_STYLE(24, 500), marginBottom: '24px' }} >Profile updated !</Typography>
      <ButtonMain active={true} title={'OKAY'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ width: '100%' }} />
    </Box>
  )

  const handleFlip = async () => {
    const fee = await contractFeeManager?.calcTotalFee(ethers.utils.parseUnits(`${dataSelect?.amount}`))
    // const fee = await getCalculateFee(ethersSigner, `${dataSelect?.amount}`)
    let complement: BigNumber = BigNumber.from(0);
    let totalAmount: BigNumber = ethers.utils.parseUnits(dataSelect!.amount!.toString()).add(fee);
    if (bnbAssets.gte(totalAmount)) {
      complement = BigNumber.from(0);
    }
    else {
      complement = totalAmount.sub(bnbAssets);
    }
    if (bnbAssets < totalAmount && complement.gte(bnbBalance)) {
      // debugger
      setPopup({
        status: true,
        body: bodyPopupError('Something went wrong. Please try again!')
      })
    }
    else {
      if (!statusLoadingFlip) {
        setStatusLoadingFlip(true);
        setIsFinish(false);
        try {
          const getCaculateFee = await getCalculateFee(ethersSigner, `${dataSelect?.amount}`)
          audio.loop = true;
          audio.play();
          setStatusGame(StatusGame.flipping)
          setPopup({ ...popup, status: false })
          if (getCaculateFee) {
            const res = await handleFlipToken(
              ethersSigner,
              dataSelect?.index || 0,
              dataSelect?.coinSide || 0,
              complement
            )
            if (res.status) {
              setStatusLoadingFlip(false)
              setIsFinish(true);
            }
          }
        } catch (error: any) {
          audio.load();
          setStatusLoadingFlip(false)
          setStatusGame(StatusGame.flip)
          setPopup({
            status: true,
            body: bodyPopupError(error.reason || 'Something went wrong. Please try again!')
          })
        }
      }
    }
  }

  const handleShowDisconnect = () => {
    setPopup({
      status: true,
      body: <Box>
        <TitlePopup themelight={!darkMode}>Disconnect</TitlePopup>
        <SubtitlePopup themelight={!darkMode}>Do you want to disconnect your wallet?</SubtitlePopup>
        <Grid container >
          <Grid item xs={12}>

            <ButtonMain active={true} title={'NO'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ width: "100%", padding: "17px 0", marginBottom: '16px' }} />
          </Grid>
          <Grid item xs={12}>

            <ButtonMain active={false} title={'YES'} onClick={() => setWalletAccount(null)} customStyle={{ width: "100%", padding: "17px 0" }} />
          </Grid>

        </Grid>
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
      <TitlePopup themelight={!darkMode}>{userInfo.userName ? 'Change' : 'Create'} profile</TitlePopup>
      <BoxAvatar><img alt="" src={currentProfile.avatar !== null ? avatar[currentProfile.avatar] : avatar[parseFloat(userInfo.avatar)]} /></BoxAvatar>
      <ListAvatar>
        {avatar.map((item, index) => <Box onClick={() => setCurrentProfile({ ...currentProfile, avatar: index })} key={index}><img alt="" src={item} /></Box>)}
      </ListAvatar>
      <InputNickname value={currentProfile.username !== null ? currentProfile.username : userInfo.userName} themelight={!darkMode} placeholder="Nickname" onChange={(e) => setCurrentProfile({ ...currentProfile, username: e.target.value })}></InputNickname>
      <Typography sx={{
        ...TEXT_STYLE(12, 400, !darkMode ? '#181536' : '#FFFFFF'),
        marginBottom: '24px'
      }}>{userInfo.userName ? '*If you change a Nickname, you will be charged some gas fee for this.' : '*If you choose to create a Nickname, you will be charged some gas fee for this.'}</Typography>
      <ButtonMain disable={((parseFloat(currentProfile.avatar) !== parseFloat(userInfo.avatar)) || (currentProfile.username !== userInfo.userName && currentProfile.username !== null)) ? false : true}
        active={true}
        title={statusLoading ? <CircularProgress sx={{ width: '25px !important', height: 'auto !important' }} color="inherit" /> : 'SAVE'} onClick={handleSetProfile} customStyle={{ width: "100%", marginBottom: '16px' }} />
      <ButtonMain active={false} title={'CLOSE'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ width: "100%" }} />
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
      <BoxWallet themelight={!darkMode}>
        <Avt><img alt="" src={userInfo?.avatar ? `assets/images/${checkAvatar()}.png` : "assets/icons/avt.svg"} /></Avt>
        <Box sx={{ '@media (min-width: 800px)': { display: 'flex', alignItems: 'center' } }}>
          <Wallet themelight={!darkMode}>{userInfo?.userName ? <Box>
            {userInfo?.userName}
            <Box>({Convert.convertWalletAddress(walletAccount, 5, 4)})</Box>
          </Box> : Convert.convertWalletAddress(walletAccount, 6, 3)}</Wallet>
          <NickName onClick={handleCreateProfile}>{userInfo.userName ? 'Change' : 'Create'} nickname</NickName>
        </Box>
        <NickName style={{ marginLeft: 'auto' }} onClick={handleShowDisconnect}>Disconnect</NickName>
      </BoxWallet>
      <Typography variant="h5" style={{ ...TEXT_STYLE(24, 500), marginBottom: '16px', textAlign: 'left' }}>You like</Typography>
      <BoxCoin>
        <Itemcoin themelight={!darkMode} active={dataSelect?.coinSide === 0} onClick={() => setDataSelect({ ...dataSelect, coinSide: 0 })}><img alt="" src={`assets/icons/head${dataSelect?.coinSide === 0 ? '' : '-disable'}.svg`} /> HEAD</Itemcoin>
        <Itemcoin themelight={!darkMode} active={dataSelect?.coinSide === 1} onClick={() => setDataSelect({ ...dataSelect, coinSide: 1 })}><img alt="" src={`assets/icons/tail${dataSelect?.coinSide === 1 ? '' : '-disable'}.svg`} /> TAIL</Itemcoin>
      </BoxCoin>
      <Typography variant="h5" style={{ ...TEXT_STYLE(24, 500), marginBottom: '16px', textAlign: 'left' }}>Bet amount</Typography>
      <BoxAmount>
        {amounts?.map((item, index) => (
          <AmountItem key={index}><ButtonMain title={`${item} BNB`} onClick={() => setDataSelect({ ...dataSelect, amount: item, index })} active={true} customStyle={{
            padding: '13px 35px',
            background: !darkMode ? (dataSelect?.amount === item ? '#FC753F' : '#FFFFFF') : (dataSelect?.amount === item ? '#FEF156' : '#25244B'),
            color: !darkMode ? dataSelect?.amount === item ? '#FFFFFF' : '#FC753F' : dataSelect?.amount === item ? '#1C1B3E' : '#FEF156',
          }} /></AmountItem>
        ))}
      </BoxAmount>
      <ButtonMain
        disable={(dataSelect?.coinSide === 0 || dataSelect?.coinSide === 1) && dataSelect.amount ? false : true}
        active={(dataSelect?.coinSide === 0 || dataSelect?.coinSide === 1) && dataSelect.amount ? true : false}
        title={statusLoadingFlip ? <CircularProgress sx={{ width: '25px !important', height: 'auto !important' }} color="inherit" /> : 'double or nothing'}
        onClick={handleFlip} customStyle={{
          padding: '13.5px 0',
          width: "100%",
          marginTop: 4
        }} />
    </div>
  }

  const renderUi = () => {
    switch (statusGame) {
      case 0: return renderPlayPart()
      case 1: return <Flipping amount={`${dataSelect?.amount}`} />
      case 2: return <Result
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
  background: props.themelight ? '#F8F9FB' : '#181536',
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
  ...TEXT_STYLE(14, 500, props.themelight ? '#181536' : '#FFFFFF'),
  marginRight: 24,
  marginBottom: 8,
  textAlign: "left",
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
  themelight: boolean
}
const Itemcoin = styled(Box)((props: ItemCoinProps) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column' as any,
  marginRight: 38,
  ...TEXT_STYLE(40, 700, props.themelight ? props.active ? '#FC753F' : '#5A6178' : props.active ? '#FEF156' : '#5A6178'),
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

  columnGap: 24,
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
    // padding: '0 12px 16px',
    '& > div': {
      width: '112px !important',
    },
  }
})

const TitlePopup = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(24, 500, props.themelight ? '#181536' : '#FFFFFF'),
  marginBottom: 24,
  textAlign: 'center'
}))
const SubtitlePopup = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(14, 400, props.themelight ? '#181536' : '#FFFFFF'),
  marginBottom: 24
}))
type ItemBodyPopupProps = {
  themelight: boolean
}
const ItemBodyPopup = styled(Box)((props: ItemBodyPopupProps) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 24,
  ...TEXT_STYLE(14, 400, props.themelight ? '#181536' : '#FFFFFF'),
  '& span': {
    ...TEXT_STYLE(14, 600, props.themelight ? '#FC753F' : '#FEF156'),
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
  background: props.themelight ? '#E9EAEF' : '#25244B',
  borderRadius: 8,
  textAlign: 'center',
  ...TEXT_STYLE(18, 500, props.themelight ? '#181536' : '#7071B3'),
  width: '100%',
  marginBottom: 24,
  '& input': {
    textAlign: 'center'
  }
}))


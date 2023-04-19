import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import LoadingButton from '@mui/lab/LoadingButton';
// import { Button } from "../../../ui/button"
import { useWalletContext } from "../../../../contexts/WalletContext"
// import { approvePurchase, createProfile, getAllowance, getCalculateFee, getLastFlipId, getPlayerAssets, getUserInfo, getWinningStreakAmount, getWinningStreakLength, handleFlipToken } from "../../../../libs/flipCoinContract"
import { TEXT_STYLE } from "../../../../styles/common"
import { Flipping } from "../flipping"
import { Result } from "../result"
import { Backdrop, Box, BoxProps, ButtonProps, CircularProgress, Grid, InputBase, Stack, styled, Typography } from "@mui/material";
import { propsTheme, StatusGame } from "../../../../pages/homepage"
import { Popup } from "../../../common/popup"
import { useColorModeContext } from "../../../../contexts/ColorModeContext"
import { ButtonLoading, ButtonLoadingShadow, ButtonMain } from "../../../ui/button"
import { Format } from "../../../../utils/format"
import { Convert } from "../../../../utils/convert"
// import { feeManagerContract } from "libs/contract"
import { useDeoddContract } from "hooks/useDeoddContract"
import { useContractContext } from "contexts/ContractContext"
import { DeoddService } from "libs/apis"
import { useProfileContract } from "hooks/useProfileContract"
import { useDisconnect } from "wagmi"
import { CoinAnimation } from "components/common/CoinAnimation"
import { BnbIcon } from "utils/Icons";

const amounts = [0.1, 0.5, 1, 2, 5, 10]

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
  const { walletAddress, refresh, setRefresh, contractFeeManager, userInfo, bnbAssets, bnbBalance } = useWalletContext()
  const { disconnect } = useDisconnect()
  const { setIsFinish, audio, statusGame, setStatusGame } = useContractContext();
  const { registerName } = useProfileContract();
  const { handleFlipToken } = useDeoddContract();
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
    console.log(ethers.utils.parseUnits(`${dataSelect?.amount}`));

    debugger
    const fee = await contractFeeManager?.calcTotalFee(ethers.utils.parseUnits(`${dataSelect?.amount}`))

    debugger
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
          const getCaculateFee = await contractFeeManager?.calcTotalFee(ethers.utils.parseUnits(`${dataSelect?.amount}`))
          audio.loop = true;
          audio.play();
          setStatusGame(StatusGame.flipping)
          setPopup({ ...popup, status: false })
          if (getCaculateFee) {
            setIsFinish(true);
            debugger
            const res = await handleFlipToken(
              dataSelect?.index || 0,
              dataSelect?.coinSide || 0,
              complement
            )
            if (res.status) {
              setStatusLoadingFlip(false)
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

            <ButtonMain active={false} title={'YES'} onClick={() => disconnect()} customStyle={{ width: "100%", padding: "17px 0" }} />
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
    debugger
    if (!statusLoading) {
      setStatusLoading(true)
      try {
        const res = await registerName(currentProfile.username || userInfo.userName, currentProfile.avatar)
        if (res.status) {
          debugger
          const resService = await DeoddService.saveInfoUser({
            wallet: walletAddress,
            username: currentProfile.username || userInfo.userName,
            avatarId: currentProfile.avatar
          });
          setStatusLoading(false)
          if (resService.status === 200) {
            setRefresh(!refresh);
            setPopup({ ...popup, body: bodyPopupSuccess })
          } else {
            setPopup({
              status: true,
              body: bodyPopupError('Something went wrong. Please try again!')
            })
          }
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

  const RenderPlayPart = () => {
    return <Box>
      <CoinAnimation width={160} height={160} mx={'auto'} textAlign={'center'} />
      <Box width={544} mx="auto" textAlign={'left'}>
        <Typography variant="h3" fontWeight={600} mt={{ md: 5 }} mb={2}>Bet amount</Typography>
        <Stack direction={'row'} justifyContent={'space-between'} gap={1.5}>
          {amounts?.map((item, index) => (
            <Box flexBasis={'auto'} flexGrow={0} flexShrink={0} key={index}>

              <ButtonLoadingShadow active={index === dataSelect?.index} onClick={() => setDataSelect({ ...dataSelect, amount: item, index })}>
                <Typography variant="h3" mr={.5} fontWeight={600}>{item}</Typography>
                <BnbIcon />
              </ButtonLoadingShadow>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} mt={3.25} justifyContent={{ xs: 'space-evenly', md: 'space-between' }}>
          <Box onClick={() => setDataSelect({ ...dataSelect, coinSide: 0 })}>
            <SideCoin isHead isSelected={dataSelect?.coinSide === 0} />
          </Box>
          <Box onClick={() => setDataSelect({ ...dataSelect, coinSide: 1 })}>
            <SideCoin isSelected={dataSelect?.coinSide === 1} />
          </Box>
        </Stack>
        <Box mt={3}>
          <ButtonLoading
            onClick={handleFlip}
            disabled={dataSelect?.coinSide >= 0 && dataSelect.amount ? false : true}
            loading={statusLoadingFlip}>
            <Typography variant={"h3"} fontWeight={600}>double or nothing</Typography>
          </ButtonLoading>
        </Box>
        {/* <ButtonMain
          disable={(dataSelect?.coinSide === 0 || dataSelect?.coinSide === 1) && dataSelect.amount ? false : true}
          active={(dataSelect?.coinSide === 0 || dataSelect?.coinSide === 1) && dataSelect.amount ? true : false}
          title={statusLoadingFlip ? <CircularProgress sx={{ width: '25px !important', height: 'auto !important' }} color="inherit" /> : 'double or nothing'}
          onClick={handleFlip} customStyle={{
            padding: '13.5px 0',
            width: "100%",
            marginTop: 4
          }} /> */}

      </Box>
    </Box>
  }

  const renderUi = () => {
    switch (statusGame) {
      case 0: return <RenderPlayPart />
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
    if (localStorage.getItem('popupCreateProfile') !== walletAddress) {
      localStorage.setItem('popupCreateProfile', walletAddress)
      localStorage.getItem('popupCreateProfile') === walletAddress && handleCreateProfile()
    }
  }, [walletAddress])

  useEffect(() => {
    statusLoading && setPopup({ status: true, body: bodyCreateProfile })
  }, [statusLoading])

  useEffect(() => {
    parseFloat(userInfo.avatar) !== currentProfile.avatar && setCurrentProfile({ username: userInfo.userName, avatar: userInfo.avatar })

  }, [userInfo.avatar])

  return <Box mt={10}>
    {renderUi()}
    <Popup status={popup.status} handleClose={() => { setPopup({ ...popup, status: false }) }} body={<Box>
      {popup.body}
    </Box>} />
  </Box>
}

const SideCoin: React.FC<StackProps & { isHead: boolean, isSelected: boolean }> = ({ isHead, isSelected }) =>

  <Stack
    direction="row"
    gap={3}
    backgroundColor={"primary.100"}
    borderRadius={2}
    boxShadow="0px 2px 4px rgba(0, 0, 0, 0.15)"
    width={256}
    py={3}
    justifyContent={"center"}
    transition=".3s all"
    border={isSelected && " 1px solid #FEF156"}
    boxShadow={isSelected && "0px 2px 16px rgba(254, 241, 86, 0.5)"}
    alignItems={'center'}>
    {
      isHead ?
        <>
          <img width="64px" alt="" src={`assets/icons/head${isSelected ? '' : '-disable'}.svg`} />
          <Typography variant="body2" fontSize={40} fontWeight={700} color="secondary.700" color={isSelected ? 'secondary.main' : "secondary.700"}>
            HEAD
          </Typography>
        </>
        : <>
          <img width="64px" alt="" src={`assets/icons/tail${isSelected ? '' : '-disable'}.svg`} />
          <Typography variant="body2" fontSize={40} fontWeight={700} color={isSelected ? 'secondary.main' : "secondary.700"}>
            TAIL
          </Typography>
        </>
    }


  </Stack>



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

type ItemCoinProps = {
  active: boolean,
  themelight: boolean
}
const Itemcoin = styled(Box)((props: ItemCoinProps) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column' as any,
  gap: '24px',
  ...TEXT_STYLE(40, 700, props.themelight ? props.active ? '#FC753F' : '#5A6178' : props.active ? '#FEF156' : '#5A6178'),
  lineHeight: 1,
  cursor: 'pointer',
  '@media (min-width: 900px )': {
    flexDirection: 'row',
  },
}))
// const BoxAmount = styled(Box)({
//   display: 'flex',
//   flexWrap: 'wrap',
//   justifyContent: 'space-between',

//   columnGap: 24,
//   '@media (min-width: 800px)': {
//     justifyContent: 'flex-start'
//   }
// })


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


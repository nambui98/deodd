import { BigNumber, ethers } from "ethers";
import Image from 'next/image';
import React, { useEffect, useState } from "react";
// import { Button } from "../../../ui/button"
import { useWalletContext } from "../../../../contexts/WalletContext";
// import { approvePurchase, createProfile, getAllowance, getCalculateFee, getLastFlipId, getPlayerAssets, getUserInfo, getWinningStreakAmount, getWinningStreakLength, handleFlipToken } from "../../../../libs/flipCoinContract"
import { Box, CircularProgress, Grid, InputBase, Stack, styled, Typography } from "@mui/material";
import { StatusGame } from "../../../../pages/homepage";
import { TEXT_STYLE } from "../../../../styles/common";
import { Popup } from "../../../common/popup";
import { ButtonLoading, ButtonLoadingShadow, ButtonMain } from "../../../ui/button";
import { Result } from "../result";
// import { feeManagerContract } from "libs/contract"
import CoinAnimation from "components/common/CoinAnimation";
import { VRF_FEE } from "constants/index";
import { useContractContext } from "contexts/ContractContext";
import { useSiteContext } from "contexts/SiteContext";
import { useDeoddContract } from "hooks/useDeoddContract";
import { useProfileContract } from "hooks/useProfileContract";
import { DeoddService } from "libs/apis";
import { AudioPlay } from "libs/types";
import { BnbIcon } from "utils/Icons";
import { TestailCoinImage } from "utils/Images";
import { useDisconnect } from "wagmi";
import NotYetFlip from "../components/NotYetFlip";
import { Flipping } from "../components/Flipping";
import MyApp from "pages/_app";
import MyImage from "components/ui/image";

// const amounts = [0.1, 0.5, 1, 2, 5, 10]
// const amounts = [0.013, 0.023, 0.043, 0.073, 0.103, 0.133, 0.163, 0.19]
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
type DataSelected = {
  coinSide?: 0 | 1,
  amount?: number,
  index?: number,
} | undefined

// eslint-disable-next-line react/display-name
export const PlayPart = React.memo(() => {

  const { walletAddress, refresh, setRefresh, userInfo } = useWalletContext()

  const { statusGame } = useContractContext();

  const { registerName } = useProfileContract();

  const { disconnect } = useDisconnect()


  const [popup, setPopup] = useState<{ status: boolean, body: any }>({
    status: false,
    body: <></>
  })
  const [currentProfile, setCurrentProfile] = useState<{ username: any, avatar: any }>({ username: null, avatar: userInfo.avatar || 0 })
  const [statusLoading, setStatusLoading] = useState<boolean>(false)



  const bodyPopupError = (message: string) => {
    return (
      <Box sx={{ textAlign: 'center', maxWidth: '304px' }}>
        <Box><img alt="" src='assets/icons/close-circle.svg' /></Box>
        <Typography sx={{ ...TEXT_STYLE(14, 500, '#ffffff'), margin: '24px 0' }}>{message}</Typography>
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



  const handleShowDisconnect = () => {
    setPopup({
      status: true,
      body: <Box>
        <TitlePopup >Disconnect</TitlePopup>
        <SubtitlePopup >Do you want to disconnect your wallet?</SubtitlePopup>
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
      <TitlePopup >{userInfo.userName ? 'Change' : 'Create'} profile</TitlePopup>
      <BoxAvatar><img alt="" src={currentProfile.avatar !== null ? avatar[currentProfile.avatar] : avatar[parseFloat(userInfo.avatar)]} /></BoxAvatar>
      <ListAvatar>
        {avatar.map((item, index) => <Box onClick={() => setCurrentProfile({ ...currentProfile, avatar: index })} key={index}><img alt="" src={item} /></Box>)}
      </ListAvatar>
      <InputNickname value={currentProfile.username !== null ? currentProfile.username : userInfo.userName} placeholder="Nickname" onChange={(e) => setCurrentProfile({ ...currentProfile, username: e.target.value })}></InputNickname>
      <Typography sx={{
        ...TEXT_STYLE(12, 400),
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





  useEffect(() => {
    popup.status && setPopup({
      status: true,
      body: bodyCreateProfile
    })
  }, [currentProfile.avatar, currentProfile.username])

  useEffect(() => {
    if (localStorage.getItem('popupCreateProfile') !== walletAddress) {
      localStorage.setItem('popupCreateProfile', walletAddress)
      // localStorage.getItem('popupCreateProfile') === walletAddress && handleCreateProfile()
    }
  }, [walletAddress])

  useEffect(() => {
    statusLoading && setPopup({ status: true, body: bodyCreateProfile })
  }, [statusLoading])

  useEffect(() => {
    parseFloat(userInfo.avatar) !== currentProfile.avatar && setCurrentProfile({ username: userInfo.userName, avatar: userInfo.avatar })

  }, [userInfo.avatar])
  console.log("asdfasdf");
  console.log(statusGame);


  return <Box mt={{ xl: 10, md: 3, xs: 2 }} position={'relative'}>

    <RenderUi statusGame={statusGame} />
    <Stack position={'absolute'} top={{ md: 0, xs: 16 }} right={0} direction={'row'} gap={1} alignItems={'center'}>
      <Stack alignItems={'flex-end'}>

        <Typography variant="caption" fontWeight={400} color="secondary.100">Testail Coin</Typography>
        <Typography variant="h3" fontWeight={600}>124</Typography>
      </Stack>
      <MyImage alt="" width={40} height={40} src={TestailCoinImage} />

    </Stack>
    <Popup status={popup.status} handleClose={() => { setPopup({ ...popup, status: false }) }} body={<Box>
      {popup.body}
    </Box>} />
  </Box>
})

// eslint-disable-next-line react/display-name
const RenderUi = React.memo(({ statusGame }: { statusGame: StatusGame }) => {
  switch (statusGame) {
    case 0:
      return <NotYetFlip />
    case 1:
      return <Flipping />
    case 2:
      return <Result />
    default: return <Box></Box>
  }
})

const Avt = styled(Box)({
  marginRight: 16,
  '& img': {
    maxWidth: 48
  }
})
const Wallet = styled(Box)((props) => ({
  ...TEXT_STYLE(14, 500, '#181536'),
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


const TitlePopup = styled(Typography)(() => ({
  ...TEXT_STYLE(24, 500, '#181536'),
  marginBottom: 24,
  textAlign: 'center'
}))
const SubtitlePopup = styled(Typography)(() => ({
  ...TEXT_STYLE(14, 400, '#181536'),
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
const InputNickname = styled(InputBase)((props) => ({
  padding: 12,
  background: '#E9EAEF',
  borderRadius: 8,
  textAlign: 'center',
  ...TEXT_STYLE(18, 500, '#7071B3'),
  width: '100%',
  marginBottom: 24,
  '& input': {
    textAlign: 'center'
  }
}))


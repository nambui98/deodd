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
  const { statusGame } = useContractContext();
  const { disconnect } = useDisconnect()

  const [popup, setPopup] = useState<{ status: boolean, body: any }>({
    status: false,
    body: <></>
  })

  const handleShowDisconnect = () => {
    setPopup({
      status: true,
      body: <Box>
        <TitlePopup >Disconnect</TitlePopup>
        <SubtitlePopup >Do you want to disconnect your wallet?</SubtitlePopup>
        <Grid container >
          <Grid item xs={12}>

            <ButtonMain active={true} title={'NO'} onClick={() => setPopup({ ...popup, status: false })} sx={{ width: "100%", padding: "17px 0", marginBottom: '16px' }} />
          </Grid>
          <Grid item xs={12}>

            <ButtonMain active={false} title={'YES'} onClick={() => disconnect()} sx={{ width: "100%", padding: "17px 0" }} />
          </Grid>

        </Grid>
      </Box>
    })
  }

  return <Box mt={{ xl: 10, md: 3, xs: 2 }} position={'relative'}>

    <RenderUi statusGame={statusGame} />
    {/* <Stack position={'absolute'} top={{ md: 0, xs: 16 }} right={0} direction={'row'} gap={1} alignItems={'center'}>
      <Stack alignItems={'flex-end'}>

        <Typography variant="caption" fontWeight={400} color="secondary.100">Testail Coin</Typography>
        <Typography variant="h3" fontWeight={600}>124</Typography>
      </Stack>
      <MyImage alt="" width={40} height={40} src={TestailCoinImage} />

    </Stack> */}
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

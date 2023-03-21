import { useEffect, useState } from "react"
import { Box, BoxProps, ButtonProps, Stack, styled, Typography, useMediaQuery } from "@mui/material";
import Modal from '@mui/material/Modal';
// import { Button } from "../components/ui/button"
import { Header } from "../components/common/header"
import { CONTENT } from "../constants/connectWallet"
import { ConnectWallet } from "../components/common/connectWallet"
import { PlayPart } from "../components/templates/home/playPart"
import { TopList } from "../components/templates/home/topList"
import { Container, TEXT_STYLE } from "../styles/common"
import { useRouter } from "next/router"
import { changeNetwork, useWalletContext } from "../contexts/WalletContext"
import { Popup } from "../components/common/popup";
import { useColorModeContext } from "../contexts/ColorModeContext";
import { ButtonMain } from "../components/ui/button";
import { useDeoddContract } from "../hooks/useDeoddContract";

export enum StatusGame {
  flip,
  flipping,
  result,
}

const HomePage: React.FC = () => {
  const width800 = useMediaQuery(`(min-width: 800px)`)
  const [statusPopup, setStatusPopup] = useState<boolean>(false);
  const [statusPopupType, setStatusPopupType] = useState<'about' | 'faq' | 'howToPlay' | 'flip'>('about');
  const { chainIdIsSupported, provider, walletAccount } = useWalletContext();

  const { darkMode } = useColorModeContext();
  // const [statusGame, setStatusGame] = useState<StatusGame>(StatusGame.flip)

  const { getFlipTokenDetail, setIsFinish, audio, dataResult, statusGame, setStatusGame } = useDeoddContract();
  const router = useRouter()
  useEffect(() => {
    // const checkChain = async () => {
    //   if (!chainIdIsSupported) {
    //     await changeNetwork(provider)
    //   }
    // }
    // checkChain();
  }, [router.asPath, provider])

  const handleShowPopup = (type: 'about' | 'faq' | 'howToPlay' | 'flip') => {
    setStatusPopup(true)
    setStatusPopupType(type)
  }

  return <Wrap themelight={!darkMode}>
    <Body >
      <Container>
        <Inner sx={{
          '@media (min-width: 800px)': {
            flexDirection: statusGame !== StatusGame.flip ? 'column !important' : 'row',
            alignItems: statusGame !== StatusGame.flip ? 'center !important' : 'flex-start'
          }
        }}>
          <LeftBody>
            {walletAccount ? <PlayPart getFlipTokenDetail={getFlipTokenDetail} setIsFinish={setIsFinish} audio={audio} dataResult={dataResult} statusGame={statusGame} setStatusGame={setStatusGame} /> : <ConnectWallet />}
            {width800 && statusGame === StatusGame.flip && <BoxPopup sx={{ marginTop: 10 }} themelight={!darkMode}>
              <ItemPopup themelight={!darkMode} style={{ marginLeft: 0 }} onClick={() => handleShowPopup('faq')}>FAQ</ItemPopup> |
              <ItemPopup themelight={!darkMode} onClick={() => handleShowPopup('howToPlay')}>How to play</ItemPopup> |
              <ItemPopup themelight={!darkMode} style={{ marginRight: 0 }} onClick={() => handleShowPopup('flip')}>Flip Responsibly</ItemPopup>
            </BoxPopup>}
            <Popup status={statusPopup} handleClose={() => setStatusPopup(false)} body={<Box>
              <Box sx={{ maxWidth: '304px' }}>
                <TitlePopup themelight={!darkMode}>{CONTENT[statusPopupType].title}</TitlePopup>
                <BodyPopup themelight={!darkMode}>{CONTENT[statusPopupType].body}</BodyPopup>
                <ButtonMain active={true} title={'OKAY'} onClick={() => setStatusPopup(false)} customStyle={{ width: '100%' }} />
              </Box>
            </Box>} />
          </LeftBody>
          {statusGame === StatusGame.flip && <RightBody>
            <TopList />
            {!width800 && <BoxPopup themelight={!darkMode}>
              <ItemPopup themelight={!darkMode} style={{ marginLeft: 0 }} onClick={() => handleShowPopup('faq')}>FAQ</ItemPopup> |
              <ItemPopup themelight={!darkMode} onClick={() => handleShowPopup('howToPlay')}>How to play</ItemPopup> |
              <ItemPopup themelight={!darkMode} style={{ marginRight: 0 }} onClick={() => handleShowPopup('flip')}>Flip Responsibly</ItemPopup>
            </BoxPopup>}
          </RightBody>}

        </Inner>
      </Container>
    </Body>
  </Wrap>
}

export default HomePage;

export type propsTheme = {
  themelight: boolean,
}

const Wrap = styled(Box)((props: propsTheme) => ({
  // background: '#1C1B3E',
  height: '100%',
  // paddingBottom: "80px"
}))
const Body = styled(Box)({
  marginTop: 14,
  // background: 'primary',
  '@media (min-width: 800px)': {
    marginTop: 19,
  }
})
const Inner = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'center',
  '@media (min-width: 800px)': {
    flexDirection: 'row',
    alignItems: 'flex-start',
  }
})
const LeftBody = styled(Box)({
  display: 'flex',
  textAlign: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginBottom: 48,
  '@media (min-width: 800px)': {
    marginBottom: 0,
    width: 'calc(50% - 15px)',
    marginTop: 50,
    minHeight: 584,
  }
})
const RightBody = styled(Box)({
  width: '100%',
  '@media (min-width: 800px)': {
    maxWidth: 449,
    width: 'calc(50% - 15px)',
  }
})
const BoxPopup = styled(Box)((props: propsTheme) => ({
  display: 'flex',
  alignItems: 'center',
  color: props.themelight ? '#181536' : '#FFFFFF',
  // margin: 'auto 0 24px',
  justifyContent: 'center',
  paddingTop: 25,
  '@media (min-width: 800px)': {
    paddingTop: 25,
    // margin: 'auto 0 0',
  }
}))
const ItemPopup = styled(Box)((props: propsTheme) => ({
  ...TEXT_STYLE(13, 500, props.themelight ? '#181536' : '#FFFFFF'),
  margin: '0 16px',
  cursor: 'pointer',
  '@media (min-width: 800px)': {
    ...TEXT_STYLE(14, 500, props.themelight ? '#181536' : '#FFFFFF'),
  }
}))
const TitlePopup = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(24, 500, props.themelight ? '#181536' : '#FFFFFF'),
  marginBottom: 24,
  textAlign: 'center',
}))
const BodyPopup = styled(Box)((props: propsTheme) => ({
  '& h5': {
    ...TEXT_STYLE(18, 500, props.themelight ? '#FC753F' : '#FEF156'),
    marginBottom: 8
  },
  '& p': {
    ...TEXT_STYLE(14, 400, props.themelight ? '#181536' : '#FFFFFF'),
    marginBottom: 24
  },
  '& a': {
    color: props.themelight ? '#FC753F' : '#FEF156',
    textDecoration: 'underline'
  }
}))
const BoxModal = styled(Modal)({
  borderRadius: 8,
  maxWidth: 352,
  '& .ant-modal-body': {
    padding: 24,
    background: '#181536',
    boxShadow: '0px 0px 40px rgba(112, 113, 179, 0.3)',
  }
})


import { Box, Stack, Typography, styled, useMediaQuery } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
// import { Button } from "../components/ui/button"
import { useRouter } from "next/router";
import { ConnectWallet } from "../components/common/ConnectWallet";
import { Popup } from "../components/common/popup";
import { PlayPart } from "../components/templates/home/playPart";
import { TopList } from "../components/templates/home/topList";
import { ButtonMain } from "../components/ui/button";
import { CONTENT } from "../constants/connectWallet";
import { useColorModeContext } from "../contexts/ColorModeContext";
import { useContractContext } from "../contexts/ContractContext";
import { useWalletContext } from "../contexts/WalletContext";
import { Container, TEXT_STYLE } from "../styles/common";

export enum StatusGame {
  flip,
  flipping,
  result,
}

const HomePage: React.FC = () => {
  // const width800 = useMediaQuery(`(min-width: 800px)`)

  const md = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [statusPopup, setStatusPopup] = useState<boolean>(false);
  const [statusPopupType, setStatusPopupType] = useState<'about' | 'faq' | 'howToPlay' | 'flip'>('about');
  const { walletIsConnected } = useWalletContext();

  const { darkMode } = useColorModeContext();
  // const [statusGame, setStatusGame] = useState<StatusGame>(StatusGame.flip)

  const { setIsFinish, audio, gameResult, statusGame, setStatusGame } = useContractContext();

  const router = useRouter()
  useEffect(() => {
    // const checkChain = async () => {
    //   if (!chainIdIsSupported) {
    //     await changeNetwork(provider)
    //   }
    // }
    // checkChain();

    setStatusGame(StatusGame.flip);
  }, [router.asPath])

  const handleShowPopup = (type: 'about' | 'faq' | 'howToPlay' | 'flip') => {
    setStatusPopup(true)
    setStatusPopupType(type)
  }

  return <Box>
    <Container>
      <Stack justifyContent={'space-between'} columnGap={{ xs: 0, sm: 3, md: 4, lg: 15 }} direction={{ xs: 'column', md: 'row' }}>
        <Stack textAlign='center'
          justifyContent='space-between'
          mb={{ xs: 0, md: 6 }}
          mt={{ xs: 3.5, md: 8 }}
          width={"100%"}

        >
          {walletIsConnected ? <PlayPart /> : <ConnectWallet />}

          {statusGame === StatusGame.flip && <Stack direction={'row'} mt={10} display={{ xs: 'none', md: 'flex' }} justifyContent={'center'} >
            <ItemPopup themelight={!darkMode} style={{ marginLeft: 0 }} onClick={() => handleShowPopup('faq')}>FAQ</ItemPopup> |
            <ItemPopup themelight={!darkMode} onClick={() => handleShowPopup('howToPlay')}>How to play</ItemPopup> |
            <ItemPopup themelight={!darkMode} style={{ marginRight: 0 }} onClick={() => handleShowPopup('flip')}>Flip Responsibly</ItemPopup>
          </Stack>}
          <Popup status={statusPopup} handleClose={() => setStatusPopup(false)} body={<Box>
            <Box sx={{ maxWidth: '304px' }}>
              <TitlePopup themelight={!darkMode}>{CONTENT[statusPopupType].title}</TitlePopup>
              <BodyPopup themelight={!darkMode}>{CONTENT[statusPopupType].body}</BodyPopup>
              <ButtonMain active={true} title={'OKAY'} onClick={() => setStatusPopup(false)} customStyle={{ width: '100%' }} />
            </Box>
          </Box>} />
        </Stack>
        {/* {statusGame === StatusGame.flip && <Box mt={{ xs: 6, md: 0 }} width={"100%"}>
            <TopList />
            <Stack direction={'row'} justifyContent={'center'} mt={4} mb={3} display={{ sm: 'flex', md: 'none' }}>
              <ItemPopup themelight={!darkMode} style={{ marginLeft: 0 }} onClick={() => handleShowPopup('faq')}>FAQ</ItemPopup> |
              <ItemPopup themelight={!darkMode} onClick={() => handleShowPopup('howToPlay')}>How to play</ItemPopup> |
              <ItemPopup themelight={!darkMode} style={{ marginRight: 0 }} onClick={() => handleShowPopup('flip')}>Flip Responsibly</ItemPopup>
            </Stack>
          </Box>} */}

      </Stack>
    </Container>
  </Box>
}

export default HomePage;

export type propsTheme = {
  themelight: boolean,
}


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

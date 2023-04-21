import { Avatar, Box, Container, Stack, Typography, styled, useMediaQuery } from "@mui/material";
import Modal from '@mui/material/Modal';
import { EventHandler, useEffect, useRef, useState } from "react";
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
import { TEXT_STYLE } from "../styles/common";
import { Avatar2Image } from "utils/Images";

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
  const refContainer = useRef<HTMLElement>(null);
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

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    refContainer.current?.setAttribute('style', ` left:${event.clientX - 15}px;`);
  }
  const mousePosition = (event: any) => {
    // refContainer.current?.setAttribute('style', `top:${event.clientY + window.pageYOffset - 15}px; left:${event.clientX - 15}px;`);
  };

  const mousePositionWithScroll = (event: any) => {
    const cursorPositionTop = parseInt(refContainer.current?.style.top ?? '0', 10);
    const cursorPositionLeft = parseInt(refContainer.current?.style.left ?? '0', 10);
    const windowY = window.pageYOffset;
    const windowX = window.pageXOffset;
    const scrollCursorPositionTop = cursorPositionTop + windowY;
    const scrollCursorPositionLeft = cursorPositionLeft + windowX;
    refContainer.current?.setAttribute('style', ` left:${scrollCursorPositionLeft - 15}px;`);
  };

  const hideCursor = () => {
  };

  const showCursor = () => {
  };

  return <Container >
    <Stack mt={2} height={{ md: 'calc(100vh - 112px  - 80px)', xs: 'calc(100vh - 72px - 65px  - 16px)' }} maxHeight={{ md: 'calc(100vh - 112px  - 80px)', xs: '100%' }} >
      <Box overflow={'hidden'}>
        <Box display={'flex'} flexDirection={'row'} columnGap={1} ref={refContainer} overflow={'auto'} sx={{
          // overflow: "hidden",
          width: "fit-content",
          position: 'relative',
          // cursor: '',
          '&::hover': {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            background: 'radial-gradient(50% 50% at 50% 50%, #FEF156 0%, rgba(254, 241, 86, 0) 100%)'
          },

          '&::-webkit-scrollbar': {
            width: 0,
            height: 0,
          },
          '&::-webkit-scrollbar-track': {
            background: "#f1f1f1",
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555'
          }
        }}>
          {
            Array.from(Array(100).keys()).map((item, key) =>
              <UserActivity key={key} />
            )
          }

        </Box>

      </Box>
      <Stack textAlign='center'
        justifyContent='space-between'
      >
        {walletIsConnected ? <PlayPart /> : <ConnectWallet />}

      </Stack>

      {/* {statusGame === StatusGame.flip && <Box mt={{ xs: 6, md: 0 }} width={"100%"}>
            <TopList />
            <Stack direction={'row'} justifyContent={'center'} mt={4} mb={3} display={{ sm: 'flex', md: 'none' }}>
              <ItemPopup themelight={!darkMode} style={{ marginLeft: 0 }} onClick={() => handleShowPopup('faq')}>FAQ</ItemPopup> |
              <ItemPopup themelight={!darkMode} onClick={() => handleShowPopup('howToPlay')}>How to play</ItemPopup> |
              <ItemPopup themelight={!darkMode} style={{ marginRight: 0 }} onClick={() => handleShowPopup('flip')}>Flip Responsibly</ItemPopup>
            </Stack>
          </Box>} */}
      {statusGame === StatusGame.flip && <Stack
        sx={{
          transform: 'translateX(-50%)',
          width: '100%'
        }}
        direction={'row'} mt={"auto"} position={'absolute'} left={"50%"} bottom={{ md: 3, xs: 89 }} mb={{ md: 3, xs: 0 }} justifyContent={'center'}
      >
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
  </Container >
}

function UserActivity() {
  return <Box bgcolor={'primary.100'} width={226} border={'1px solid'} borderColor={'secondary.300'} borderRadius={2} pl={2} py={1}>
    <Stack direction={'row'} gap={1}>
      <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" src={Avatar2Image} />
      <Stack alignItems={'baseLine'} columnGap={1}>
        <Typography variant='body2' fontWeight={500} >Nam</Typography>
        <Typography whiteSpace={'normal'} flexGrow={1} variant='body2' fontWeight={500} color="secondary.100">flipped 0.5 and doubles</Typography>
        <Typography variant='caption' fontWeight={400} color="secondary.100">17 sec ago</Typography>
      </Stack>
    </Stack>

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

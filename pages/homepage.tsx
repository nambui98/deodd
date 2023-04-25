import { Avatar, Box, Container, Fade, Grow, List, Stack, Typography, styled, useMediaQuery } from "@mui/material";
import Modal from '@mui/material/Modal';
import { EventHandler, createRef, useEffect, useRef, useState } from "react";
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
import Collapse from '@mui/material/Collapse';
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
  const [dataRecent, setDataRecent] = useState<dataUserRecent[]>(
    Array.from(Array(100).keys()).map((item, index) => {
      return {
        id: index,
        username: 'username' + index,
        amount: index % 2,
        isWin: index % 2 === 0,
        timeAgo: '17 sec ago',
        streak: index % 2 === 1 ? 3 : 0,
        nodeRef: createRef(),
      }
    })
  );
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

  useEffect(() => {
    const interval = setInterval(() => {
      setDataRecent((dataRecent) => [
        { id: dataRecent.length, amount: 2, isWin: dataRecent.length % 2 === 0, timeAgo: '5h ago', username: 'username' + dataRecent.length, streak: dataRecent.length % 2 === 1 ? 4 : 0, nodeRef: createRef() },
        ...dataRecent,

      ])
    }, 3000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return <Container >
    <Stack mt={2} >
      <Box overflow={'hidden'}
        sx={{
          position: 'relative',
          // cursor: '',
          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            zIndex: 1,
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'radial-gradient(50% 50% at 50% 50%, #FEF156 0%, rgba(254, 241, 86, 0) 100%)'
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'radial-gradient(50% 50% at 50% 50%, #FEF156 0%, rgba(254, 241, 86, 0) 100%)'
          },


        }}
      >
        <List component={Stack} flexDirection="row">
          <TransitionGroup component={Stack} flexDirection="row" columnGap={1}>
            {dataRecent.map((item, index) => (
              <Collapse addEndListener={(e) => e.style.opacity = '1'} timeout={1500} in={true} key={item.id} sx={{
                '&.MuiCollapse-horizontal': {
                  opacity: 0,
                  transition: '.5s all',
                  '&.MuiCollapse-entered': {
                    opacity: 1
                  }
                }
              }} easing={{ enter: '200ms', exit: '1000s' }} orientation="horizontal">
                <Box ref={item.nodeRef} className="item">
                  <UserActivity user={item} />
                </Box>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>

      {/* </Box> */}
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
          // transform: 'translateX(-50%)',
          // width: '100%'
          // position:{'absolute'} left:{"50%"} bottom:{ md: 3, xs: 89 } 
          //  mt:{"auto"}
          mt: 3,
          mb: { md: 3, xs: 0 }
        }}
        direction={'row'} justifyContent={'center'}
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
type dataUserRecent = {
  id: number,
  username: string,
  timeAgo: string,
  isWin: boolean,
  amount: number,
  streak: number,
  nodeRef: any
}
function UserActivity({ user }: { user: dataUserRecent }) {
  return <Box className="userRecent" bgcolor={'primary.100'} position={'relative'} width={'226px'} border={'1px solid'} borderColor={'secondary.300'} borderRadius={2} px={2} py={1}>
    <Stack direction={'row'} gap={1}>
      <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" src={Avatar2Image} />
      <Stack alignItems={'baseLine'} columnGap={1}>
        <Typography variant='body2' fontWeight={500} lineHeight={'20px'}>{user.username}</Typography>
        <Typography whiteSpace={'normal'} flexGrow={1} lineHeight={'20px'} variant='body2' sx={{ whiteSpace: 'nowrap' }} fontWeight={400} color="secondary.100">flipped
          <Typography component={'span'} color={'secondary.main'} lineHeight={'20px'} fontWeight={400} variant='body2'>
            {" "}
            {user.amount}
            {" "}
          </Typography>
          and
          {
            user.isWin ?
              <Typography component={'span'} color={'secondary.main'} lineHeight={'20px'} fontWeight={400} variant='body2'>
                {" "}

                doubled
                {" "}
              </Typography>
              : <Typography component={'span'} color={'secondary.400'} lineHeight={'20px'} fontWeight={400} variant='body2'>
                {" "}

                slipped
                {" "}
              </Typography>

          }

        </Typography>
        <Typography variant='caption' fontWeight={400} color="secondary.100" lineHeight={'20px'}>{user.timeAgo}</Typography>
      </Stack>
    </Stack>
    {
      user.streak > 0 &&
      <Box position={'absolute'} top={0} right={0} bgcolor={'secondary.main'} px={0.5} sx={{ borderRadius: '0px 8px' }}>

        <Typography variant='caption' fontSize={10} fontWeight={500} color="primary.200" >{user.streak} streak</Typography>
      </Box>
    }

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

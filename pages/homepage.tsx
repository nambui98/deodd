import { Box, Container, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
// import { Button } from "../components/ui/button"
import FlipRecent from "@/templates/home/flipRecent";
import React from "react";
import { ConnectWallet } from "../components/common/ConnectWallet";
import { Popup } from "../components/common/popup";
import { PlayPart } from "../components/templates/home/playPart";
import { ButtonMain } from "../components/ui/button";
import { CONTENT } from "../constants/connectWallet";
import { useWalletContext } from "../contexts/WalletContext";
import { TEXT_STYLE } from "../styles/common";

export enum StatusGame {
  flip,
  flipping,
  result,
}

// eslint-disable-next-line react/display-name
const HomePage: React.FC = React.memo(() => {

  const [statusPopup, setStatusPopup] = useState<boolean>(false);
  const [statusPopupType, setStatusPopupType] = useState<'about' | 'faq' | 'howToPlay' | 'flip'>('about');
  const { walletIsConnected } = useWalletContext();

  const handleShowPopup = (type: 'about' | 'faq' | 'howToPlay' | 'flip') => {
    setStatusPopup(true)
    setStatusPopupType(type)
  }

  return <Container>
    <Stack mt={2} >
      <FlipRecent />
      <Stack textAlign='center'
        justifyContent='space-between'
      >
        {walletIsConnected ? <PlayPart /> : <ConnectWallet />}
      </Stack>
      <Stack
        sx={{
          mt: 3,
          mb: { md: 3, xs: 0 }
        }}
        direction={'row'} justifyContent={'center'}
      >
        <ItemPopup style={{ marginLeft: 0 }} onClick={() => handleShowPopup('faq')}>FAQ</ItemPopup> |
        <ItemPopup onClick={() => handleShowPopup('howToPlay')}>How to play</ItemPopup> |
        <ItemPopup style={{ marginRight: 0 }} onClick={() => handleShowPopup('flip')}>Flip Responsibly</ItemPopup>
      </Stack>
      <Popup status={statusPopup} handleClose={() => setStatusPopup(false)} body={<Box>
        <Box sx={{ maxWidth: '304px' }}>
          <TitlePopup >{CONTENT[statusPopupType].title}</TitlePopup>
          <BodyPopup >{CONTENT[statusPopupType].body}</BodyPopup>
          <ButtonMain active={true} title={'OKAY'} onClick={() => setStatusPopup(false)} customStyle={{ width: '100%' }} />
        </Box>
      </Box>} />
    </Stack>
  </Container >
})

export default HomePage;




const ItemPopup = styled(Box)(() => ({
  ...TEXT_STYLE(13, 500, '#fff'),
  margin: '0 16px',
  cursor: 'pointer',
  '@media (min-width: 800px)': {
    ...TEXT_STYLE(14, 500, '#fff'),
  }
}))
const TitlePopup = styled(Typography)(() => ({
  ...TEXT_STYLE(24, 500, '#fff'),
  marginBottom: 24,
  textAlign: 'center',
}))
const BodyPopup = styled(Box)(() => ({
  '& h5': {
    ...TEXT_STYLE(18, 500, '#FEF156'),
    marginBottom: 8
  },
  '& p': {
    ...TEXT_STYLE(14, 400, '#181536'),
    marginBottom: 24
  },
  '& a': {
    color: '#FEF156',
    textDecoration: 'underline'
  }
}))

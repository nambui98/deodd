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
import { CloseSquareIcon2 } from "utils/Icons";
import { useAccount } from "wagmi";
import Loader from "components/common/Loader";

// eslint-disable-next-line react/display-name
const HomePage: React.FC = React.memo(() => {

  const [statusPopup, setStatusPopup] = useState<boolean>(false);
  const [statusPopupType, setStatusPopupType] = useState<'about' | 'faq' | 'howToPlay' | 'flip'>('about');
  const { walletIsConnected } = useWalletContext();

  const { isConnected } = useAccount();

  const handleShowPopup = (type: 'about' | 'faq' | 'howToPlay' | 'flip') => {
    setStatusPopup(true)
    setStatusPopupType(type)
  }
  if (walletIsConnected === undefined) {
    return <Loader isLoadingProps></Loader>
  }
  return <Container>

    <Stack mt={2} >
      <FlipRecent />
      <Stack textAlign='center'
        justifyContent='space-between'
      >
        {walletIsConnected ? <PlayPart /> : <ConnectWallet />}
      </Stack>
      <Popup customWidth={"34rem"} status={statusPopup} handleClose={() => setStatusPopup(false)} body={<Box>
        <Box>
          <Box position={"absolute"} top={"1rem"} right={"1rem"} sx={{
            cursor: "pointer",
            transition: "300ms opacity, 300ms transform",
            ":hover": {
              opacity: 0.8,
              transform: "scale(1.1)"
            }
          }}>
            <CloseSquareIcon2 onClick={() => setStatusPopup(false)} />
          </Box>
          <TitlePopup >{CONTENT[statusPopupType].title}</TitlePopup>
          <BodyPopup >{CONTENT[statusPopupType].body}</BodyPopup>
          {/* <ButtonMain active={true} title={'OKAY'} onClick={() => setStatusPopup(false)} customStyle={{ width: '100%' }} /> */}
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
  '& h3': {
    ...TEXT_STYLE(24, 700, '#fff'),
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: "2rem",
  }
}))
const BodyPopup = styled(Box)(() => ({
  '& h5': {
    ...TEXT_STYLE(16, 600, '#FEF156'),
    marginBottom: 8,
    lineHeight: "1.375rem",
  },
  '& p': {
    ...TEXT_STYLE(14, 400, '#fff'),
    marginBottom: 24,
    lineHeight: "1.25rem",
  },
  '& a': {
    color: '#FEF156',
    textDecoration: 'underline'
  }
}))

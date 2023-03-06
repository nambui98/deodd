
import { Box, Typography, styled, useMediaQuery } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Popup } from "../components/popup";
import { CONTENT } from "../const/connectWallet";
import { ConnectWallet } from "../containers/connectWallet";
import { PlayPart } from "../containers/playPart";
import { TopList } from "../containers/topList";
import { useWalletContext } from "../contexts/WalletContext";
import { Container, TEXT_STYLE } from "../styles/common";

export enum StatusGame {
    flip,
    flipping,
    result,
}

const LoyaltyPage: React.FC = () => {
    const width800 = useMediaQuery(`(min-width: 800px)`)

    return <Wrap themeLight={false}>
        <Header />
        <Body sx={{ background: false ? '#FFFFFF' : '#1C1B3E' }}>
            <Container>
                <Inner sx={{
                    '@media (min-width: 800px)': {
                    }
                }}>
                    <LeftBody>
                        {/* {walletAccount ? <PlayPart statusGame={statusGame} setStatusGame={setStatusGame} /> : <ConnectWallet />} */}
                        {/* {width800 && statusGame === StatusGame.flip && <BoxPopup themeLight={theme === 'light'}>
                            <ItemPopup themeLight={theme === 'light'} style={{ marginLeft: 0 }} onClick={() => handleShowPopup('faq')}>FAQ</ItemPopup> |
                            <ItemPopup themeLight={theme === 'light'} onClick={() => handleShowPopup('howToPlay')}>How to play</ItemPopup> |
                            <ItemPopup themeLight={theme === 'light'} style={{ marginRight: 0 }} onClick={() => handleShowPopup('flip')}>Flip Responsibly</ItemPopup>
                        </BoxPopup>} */}
                        {/* <Popup status={statusPopup} handleClose={() => setStatusPopup(false)} body={<Box>
                            <Box sx={{ maxWidth: '304px' }}>
                                <TitlePopup themeLight={theme === 'light'}>{CONTENT[statusPopupType].title}</TitlePopup>
                                <BodyPopup themeLight={theme === 'light'}>{CONTENT[statusPopupType].body}</BodyPopup>
                                <Button active={true} title={'OKAY'} onClick={() => setStatusPopup(false)} customStyle={{ padding: 13.5 }} />
                            </Box>
                        </Box>} /> */}
                    </LeftBody>
                    {/* {statusGame === StatusGame.flip && <RightBody>
                        <TopList />
                        {!width800 && <BoxPopup themeLight={theme === 'light'}>
                            <ItemPopup themeLight={theme === 'light'} style={{ marginLeft: 0 }} onClick={() => handleShowPopup('faq')}>FAQ</ItemPopup> |
                            <ItemPopup themeLight={theme === 'light'} onClick={() => handleShowPopup('howToPlay')}>How to play</ItemPopup> |
                            <ItemPopup themeLight={theme === 'light'} style={{ marginRight: 0 }} onClick={() => handleShowPopup('flip')}>Flip Responsibly</ItemPopup>
                        </BoxPopup>}
                    </RightBody>} */}
                </Inner>
            </Container>
        </Body>
    </Wrap>
}

export default LoyaltyPage;

export type propsTheme = {
    themeLight: boolean
}
const Wrap = styled(Box)((props: propsTheme) => ({
    background: props.themeLight ? '#FFFFFF' : '#1C1B3E',
    height: '100vh'
}))
const Body = styled(Box)({
    marginTop: 14,
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
    color: props.themeLight ? '#181536' : '#FFFFFF',
    margin: 'auto 0 24px',
    justifyContent: 'center',
    paddingTop: 25,
    '@media (min-width: 800px)': {
        paddingTop: 25,
        margin: 'auto 0 0',
    }
}))
const ItemPopup = styled(Box)((props: propsTheme) => ({
    ...TEXT_STYLE(13, 500, props.themeLight ? '#181536' : '#FFFFFF'),
    margin: '0 16px',
    cursor: 'pointer',
    '@media (min-width: 800px)': {
        ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#FFFFFF'),
    }
}))
const TitlePopup = styled(Typography)((props: propsTheme) => ({
    ...TEXT_STYLE(24, 500, props.themeLight ? '#181536' : '#FFFFFF'),
    marginBottom: 24,
    textAlign: 'center',
}))
const BodyPopup = styled(Box)((props: propsTheme) => ({
    '& h5': {
        ...TEXT_STYLE(18, 500, props.themeLight ? '#FC753F' : '#FEF156'),
        marginBottom: 8
    },
    '& p': {
        ...TEXT_STYLE(14, 400, props.themeLight ? '#181536' : '#FFFFFF'),
        marginBottom: 24
    },
    '& a': {
        color: props.themeLight ? '#FC753F' : '#FEF156',
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


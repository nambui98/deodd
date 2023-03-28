
import { Box, Grid, Typography, styled, useMediaQuery } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Button } from "../components/ui/button";
import { Header } from "../components/common/Header";
import { Popup } from "../components/common/popup";
import { CONTENT } from "../constants/connectWallet";
import { ConnectWallet } from "../components/common/ConnectWallet";
import { PlayPart } from "../components/templates/home/playPart";
import { TopList } from "../components/templates/home/topList";
import { useWalletContext } from "../contexts/WalletContext";
import { Container, TEXT_STYLE } from "../styles/common";
import { useColorModeContext } from "../contexts/ColorModeContext";

export enum StatusGame {
    flip,
    flipping,
    result,
}

const LoyaltyPage: React.FC = () => {
    const width800 = useMediaQuery(`(min-width: 800px)`)
    const [statusPopup, setStatusPopup] = useState<boolean>(false);
    const [statusPopupType, setStatusPopupType] = useState<'about' | 'faq' | 'howToPlay' | 'flip'>('about');
    const { chainIdIsSupported, provider, walletAccount } = useWalletContext();
    const { darkMode } = useColorModeContext();
    const [statusGame, setStatusGame] = useState<StatusGame>(StatusGame.flip)

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
        <Body sx={{ background: !darkMode ? '#FFFFFF' : '#1C1B3E' }}>
            <div style={{
                backgroundColor: '#181536',
                padding: "35px 0"
            }}>
                <Container>
                    <Typography variant="h5" color={"#fff"}>LOYALTY</Typography>
                </Container>
            </div>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Item>xs=8</Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>xs=4</Item>
                    </Grid>

                </Grid>
            </Container>
        </Body>
    </Wrap>
}

export default LoyaltyPage;

export type propsTheme = {
    themelight: boolean
}
const Item = styled(Box)(() => ({
}))
const Wrap = styled(Box)((props: propsTheme) => ({
    // background: props.themelight ? '#FFFFFF' : '#1C1B3E',
    background: '#1C1B3E',
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
    color: props.themelight ? '#181536' : '#FFFFFF',
    margin: 'auto 0 24px',
    justifyContent: 'center',
    paddingTop: 25,
    '@media (min-width: 800px)': {
        paddingTop: 25,
        margin: 'auto 0 0',
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


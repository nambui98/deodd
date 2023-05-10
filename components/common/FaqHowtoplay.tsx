import { Box, Button, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import MyModal from './Modal';
import { Colors } from 'constants/index';

type Props = {}
enum Modal_Type {
    FAQ,
    HOW_TO_PLAY,
    FLIP_RESPONSIBLY
}
function FaqHowtoplay({ }: Props) {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<Modal_Type>(Modal_Type.FAQ);

    const handleShowPopup = (type: Modal_Type) => {
        setModalType(type);
        setOpenModal(true);
    }
    const mapContent = {
        [Modal_Type.FAQ]: <FAQContent />,
        [Modal_Type.HOW_TO_PLAY]: <HowToPlay />,
        [Modal_Type.FLIP_RESPONSIBLY]: <FlipResponsibly />
    }

    return (
        <Box position={{ xs: 'relative', md: 'fixed' }} mt={{ xs: '27px', md: 0 }} mb={{ xs: 3, md: 0 }} bottom={{
            xs: 0, md: 24

        }} width={'100%'} left={'50%'} sx={{ transform: 'translateX(-50%)' }}>

            <Stack
                direction={'row'} justifyContent={'center'}
                gap={2}
            >
                <Item variant='body2' onClick={() => handleShowPopup(Modal_Type.FAQ)}>FAQ</Item> |
                <Item variant='body2' onClick={() => handleShowPopup(Modal_Type.HOW_TO_PLAY)}>How to play</Item> |
                <Item variant='body2' onClick={() => handleShowPopup(Modal_Type.FLIP_RESPONSIBLY)}>Flip responsibly</Item>
            </Stack>
            <MyModal open={openModal} sx={{ width: { xs: 400, sm: 544 } }} haveIconClosed setOpen={setOpenModal}>
                {
                    mapContent[modalType]
                }
            </MyModal>

        </Box >
    )
}

export default FaqHowtoplay;
const FAQContent = () => (
    <Stack gap={3}>
        <Typography variant='h5' fontWeight={700} textAlign={'center'}>
            FAQ
        </Typography>
        <Stack gap={1}>
            <Typography variant='body1' color='secondary.main' fontWeight={600}>
                What is deODD?
            </Typography>
            <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
                deODD is a smart contract that allows users to play the coin flip mechanism with their BNB, with odds of 50/50 with a xx fee.
            </Typography>
        </Stack>
        <Stack gap={1}>
            <Typography variant='body1' color='secondary.main' fontWeight={600}>
                How do I know I can Trust deODD?
            </Typography>
            <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
                Since deODD is an on-chain platform on the BSC network, using the ChainLink VRF (Verifiable Random Function) for random mechanism, all transactions can be tracked and audited by anyone.
            </Typography>
        </Stack>
        <Stack gap={1}>
            <Typography variant='body1' color='secondary.main' fontWeight={600}>
                Where can I learn the essentials?
            </Typography>
            <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
                Join us on Discord, and Twitter - Follow our social network to obtain our help in resolving any issues you may have.
            </Typography>
        </Stack>

    </Stack>

)
const HowToPlay = () => (
    <Stack gap={3}>
        <Typography variant='h5' fontWeight={700} textAlign={'center'}>
            How to play
        </Typography>
        <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
            1. Connect your Metamask Wallet.<br />
            2. Pick either heads or tails.<br />
            3. Select your Bet amount.<br />
            4. Click “Double or Nothing”.<br />
            5. Wait a few seconds and get the result.
        </Typography>
        <Stack gap={1}>
            <Typography variant='body1' color='secondary.main' fontWeight={600}>
                What is a Metamask Wallet?
            </Typography>
            <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
                MetaMask provides an essential utility for blockchain players, token traders, crypto gamers, and developers. You are always in control when interacting on the new decentralized web. Visit metamask.io, add the wallet to chrome, and follow the instructions to create a wallet.
            </Typography>
        </Stack>
    </Stack>

)
const FlipResponsibly = () => (
    <Stack gap={3}>
        <Typography variant='h5' fontWeight={700} textAlign={'center'}>
            Flip responsibly
        </Typography>
        <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
            <span style={{ color: Colors.secondaryDark }}>deODD</span> is a form of entertainment on Blockchain, we want our players to feel happy and enjoy participating at deODD, so we encourage responsible gaming.
        </Typography>
        <Stack gap={1}>
            <Typography variant='body1' color='secondary.main' fontWeight={600}>
                Resource
            </Typography>
            <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
                Chat: Our Discord<br />
                Text: Team@deodd.io
            </Typography>
        </Stack>
        <Stack gap={1}>
            <Typography variant='body1' color='secondary.main' fontWeight={600}>
                Do I have a flipping problem?
            </Typography>
            <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
                If you feel you are having trouble with your gambling, ask yourself the following questions:<br />
                Have other people ever criticized your flipping?<br />
                Do you ever lie to cover up the money or time spent on your flipping?<br />
                Do arguments, boredom, or frustration make you want to flip?<br />
                Have you lost interest in family, friends, or entertainment due to flipping?<br />
                When flipping and you run out of money, do you feel frustrated and hopeless and need to take it back ASAP?<br />
                Have you lied, stolen, or borrowed to get money to flipping or to repay the flipping debt?<br />
                The more you answer &quot;yes&quot; to these questions, the more likely you have serious gambling problems. Consider pausing your action of playing if you have the above signs.
            </Typography>
        </Stack >

    </Stack >

)
const Item = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    cursor: 'pointer',
    color: (theme.palette.secondary as any)["500"],
    fontWeight: 500
}))
const TitlePopup = styled(Typography)(() => ({
    '& h3': {
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: "2rem",
    }
}))
const BodyPopup = styled(Box)(() => ({
    '& h5': {
        marginBottom: 8,
        lineHeight: "1.375rem",
    },
    '& p': {
        marginBottom: 24,
        lineHeight: "1.25rem",
    },
    '& a': {
        color: '#FEF156',
        textDecoration: 'underline'
    }
}))

import { Box, Button, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import MyModal from './Modal';
import { Colors } from 'constants/index';

type Props = {}
enum Modal_Type {
    FAQ,
    HOW_TO_PLAY,
    PRIVACY_POLICY
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
        [Modal_Type.PRIVACY_POLICY]: <PrivacyPolicy />
    }

    return (
        <Box mt={'auto'} mb={{ xs: 11.125, md: 3 }} bottom={{
        }} >

            <Stack
                direction={'row'} justifyContent={'center'}
                gap={2}
            >
                <Item variant='body2' onClick={() => handleShowPopup(Modal_Type.FAQ)}>FAQ</Item> |
                <Item variant='body2' onClick={() => handleShowPopup(Modal_Type.HOW_TO_PLAY)}>How to play</Item> |
                <Item variant='body2' onClick={() => handleShowPopup(Modal_Type.PRIVACY_POLICY)}>Privacy Policy</Item> |
                <a href="https://docsend.com/view/nbwq8xa96nckf4zj" target='_blank' rel='noreferrer'>
                    <Item variant='body2'>Whitepaper</Item>
                </a>
            </Stack>
            <MyModal open={openModal} sx={{ width: "min(100vw - 1rem, 34rem)" }} haveIconClosed setOpen={setOpenModal}>
                {
                    mapContent[modalType]
                }
            </MyModal>

        </Box >
    )
}

export default FaqHowtoplay;
const FAQContent = () => (
    <Stack gap={3} maxHeight={"calc(100vh - 15rem)"}>
        <Typography variant='h5' fontWeight={700} textAlign={'center'}>
            FAQ
        </Typography>
        <Stack overflow={"auto"} gap={3}>
            <Stack gap={1}>
                <Typography variant='body1' color='secondary.main' fontWeight={600}>
                    What is deODD?
                </Typography>
                <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
                    DeODD is a smart contract built on the BNB Chain Ecosystem that allows users to play a decentralized coin flip
                    and lottery mechanism by your BNB, with the flipping odds of 50/50 and charge a 3.25% fee, and a portion
                    allocated to the DeODD NFT Holders Pool.
                </Typography>
            </Stack>
            <Stack gap={1}>
                <Typography variant='body1' color='secondary.main' fontWeight={600}>
                    How do I know I can Trust deODD?
                </Typography>
                <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
                    As a decentralized coin flip and lottery product, DeODD uses technology and platforms to guarantee a fair system,
                    especially with the use of Oracle VRF from the Binance Smart Chain ecosystem. This ensures transparency,
                    making these games an innovative and exciting way for users to enjoy blockchain technology.
                </Typography>
            </Stack>
            <Stack gap={1}>
                <Typography variant='body1' color='secondary.main' fontWeight={600}>
                    Where can I learn the essentials?
                </Typography>
                <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
                    Follow our social media channels to stay updated and/or Read our {" "}
                    <a href="https://docsend.com/view/nbwq8xa96nckf4zj" target='_blank' rel='noreferrer'>
                        <Typography display={"inline"} variant='body2' sx={{ textDecoration: "underline" }} >
                            WhitePaper
                        </Typography>
                    </a>.
                </Typography>
            </Stack>
        </Stack>

    </Stack>

)
const HowToPlay = () => (
    <Stack gap={3} maxHeight={"calc(100vh - 15rem)"}>
        <Typography variant='h5' fontWeight={700} textAlign={'center'}>
            How to play
        </Typography>
        <Typography variant='body2' color="white" fontWeight={400} lineHeight={'20px'}>
            Users need to follow these steps: <br />
            Step 1: Visit the official DeODD website <br />
            Step 2: Connect your Metamask Wallet (*). <br />
            Step 3: Set your nickname (or display name) and choose an avatar from available options. <br />
            Step 4: Pick either Heads or Tails <br />
            Step 5: Select your bet amount with your BNB. <br />
            Step 6: Click &ldquo;Double or Nothing&rdquo;. <br />
            Step 7: Wait a few seconds and get the result. <br />
        </Typography>
        <Typography variant='body2' color="white" fontWeight={400} fontSize={"0.75rem"} lineHeight={'1rem'}>
            (*) Metamask Wallet: provides users with a secure and convenient way to manage their digital assets and interact with Dapps without the need for a separate wallet or complicated technical knowledge. Visit https://metamask.io/ and add the wallet to your Chrome, follow the instructions to create a wallet.
        </Typography>
    </Stack>

)
const PrivacyPolicy = () => (
    <Stack gap={3} maxHeight={"min(100vh - 15rem, 30.75rem)"}>
        <Typography variant='h5' fontSize={"1.5rem"} fontWeight={700} lineHeight={"2rem"} textAlign={'center'}>
            Privacy Policy
        </Typography>
        <Stack gap={3} sx={{ maxHeight: "30rem", overflow: "auto" }}>
            <Typography variant='body2' fontSize='0.875rem' lineHeight='1.25rem' color="#fff" fontWeight={400}>
                As a product based on a decentralized coin flip and lottery mechanism, the DeODD team (or &#34;We&#34;, &#34;Us&#34;) takes the privacy and security of our users&apos; information very seriously. This Privacy Policy section outlines the types of information we collect, how we use it, and the measures we take to protect it.
            </Typography>
            <Typography variant='body2' fontSize='0.875rem' lineHeight='1.25rem' color="#fff" fontWeight={400}>
                We may be compelled to acquire your personal information in order to provide our services to you. Therefore, this Privacy Policy is meant to explain how we will collect and secure your personal information.
            </Typography>
            <Typography variant='body2' fontSize='0.875rem' lineHeight='1.25rem' color="#fff" fontWeight={400}>
                This Privacy Policy does not apply to third-party products or services, or the activities of organizations we do not own or control, including other companies you may engage with on or through our services, unless otherwise stated.
            </Typography>
            <Typography variant='body2' fontSize='0.875rem' lineHeight='1.25rem' color="#fff" fontWeight={400}>
                This Privacy Policy was created in the English language. When a translated version clashes with the English version, the English version takes precedence. The last time this Privacy Policy was updated was in May 2023.
            </Typography>
            <Typography variant='body2' fontSize='0.875rem' lineHeight='1.25rem' color="#fff" fontWeight={400}>
                At any moment, we retain the right to make modifications to this Privacy Policy. We recommend that you review this Privacy Policy on a frequent basis to ensure that you are aware of any changes and how your information may be used.
            </Typography>
        </Stack>
    </Stack >

)
const Item = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    cursor: 'pointer',
    color: (theme.palette.secondary as any)["500"],
    fontWeight: 500
}))

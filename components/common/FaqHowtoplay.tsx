import { Box, Button, Container, Divider, Grid, Stack, Typography, TypographyProps, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import MyModal from './Modal';
import { Colors } from 'constants/index';
import MyImage from 'components/ui/image';
import { BnbLogoImage, BzImage, DjImage, LogoImage, MwImage, YahooFImage } from 'utils/Images';
import Link from 'next/link';

type Props = {}
enum Modal_Type {
    FAQ,
    HOW_TO_PLAY,
    PRIVACY_POLICY
}
function FaqHowtoplay({ }: Props) {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<Modal_Type>(Modal_Type.FAQ);
    const theme = useTheme();

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
        <Container sx={{ mt: 'auto', pt: 3, }} >
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 10.125, md: 2 }, mt: 2 }}  >
                <Stack width={1} direction={'row'} alignItems={'center'} justifyContent={'space-between'} columnGap={2}
                    rowGap={3}
                    sx={{
                        [theme.breakpoints.down('md').replace("@media", "@container")]: {
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        },
                    }}
                >
                    <Stack height={1} direction={'row'} alignItems={'center'} columnGap={6} rowGap={3} sx={{
                        [theme.breakpoints.down('md').replace("@media", "@container")]: {
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        },

                    }}>
                        <Box component={Link} href="/">
                            <MyImage src={LogoImage} height={40} width={66.67} alt="logo" />
                        </Box>
                        <Stack
                            divider={
                                <Divider flexItem sx={{ mx: { xs: 1.5, xl: 2 }, display: { xs: 'none', lg: 'block' }, borderWidth: 1, bgcolor: 'white' }} />
                            }
                            direction={{ xs: "column", lg: 'row' }}
                            rowGap={2}
                        >
                            <Stack
                                direction={'row'} justifyContent={{ xs: 'flex-start', lg: 'center' }}
                                rowGap={1}
                                divider={
                                    <Divider flexItem sx={{ mx: { xs: 1.5, xl: 2 }, borderWidth: 1, bgcolor: 'white' }} />
                                }
                            >
                                <Item variant='body2' onClick={() => handleShowPopup(Modal_Type.FAQ)}>FAQ</Item>
                                <Item variant='body2' onClick={() => handleShowPopup(Modal_Type.HOW_TO_PLAY)}>How to play</Item>
                            </Stack>
                            <Stack
                                direction={'row'} justifyContent={{ xs: 'flex-start', lg: 'center' }}
                                rowGap={1}
                                divider={
                                    <Divider flexItem sx={{ mx: { xs: 1.5, xl: 2 }, borderWidth: 1, bgcolor: 'white' }} />
                                }
                            >
                                <Item variant='body2' onClick={() => handleShowPopup(Modal_Type.PRIVACY_POLICY)}>Privacy Policy</Item>
                                <Item variant='body2'>
                                    <a href="https://docsend.com/view/nbwq8xa96nckf4zj" target='_blank' rel='noreferrer'>
                                        Whitepaper
                                    </a>
                                </Item>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} columnGap={5} rowGap={3} justifyContent={'flex-end'} alignItems={'center'} height={1}
                        sx={{
                            [theme.breakpoints.down('md').replace("@media", "@container")]: {
                                flexDirection: 'column-reverse',
                                alignItems: 'flex-start'
                            },
                        }}
                    >
                        <Box>
                            <Typography variant='caption'>As seen on</Typography>
                            <Stack mt={1} direction={'row'} alignItems={'center'} columnGap={3}>
                                <Link href={'https://www.benzinga.com/pressreleases/23/05/ab32606858/deodd-launches-testnet-revolutionizing-game-of-chances-gaming-on-the-bnb-chain-ecosystem'}
                                    target='_blank' rel="noreferrer">
                                    <MyImage src={BzImage} height={40} width={40} alt="logo" />
                                </Link>
                                <Link href={'https://www.digitaljournal.com/pr/news/accesswire/deodd-launches-testnet-revolutionizing-game-of-chances-gaming-on-the-bnb-chain-ecosystem'}
                                    target='_blank' rel="noreferrer">
                                    <MyImage src={DjImage} height={40} width={48} alt="logo" />
                                </Link>
                                <Link href={'https://finance.yahoo.com/news/deodd-launches-testnet-revolutionizing-game-195000055.html'}
                                    target='_blank' rel="noreferrer">
                                    <MyImage src={YahooFImage} height={32} width={87} alt="logo" />
                                </Link>
                                <Link href={'https://www.marketwatch.com/press-release/deodd-launches-testnet-revolutionizing-game-of-chances-gaming-on-the-bnb-chain-ecosystem-2023-05-26'}
                                    target='_blank' rel="noreferrer">
                                    <MyImage src={MwImage} height={32} width={59} alt="logo" />
                                </Link>
                            </Stack>

                        </Box>
                        <Box display={'block'} width={193} height={24} component={Link} href="https://oracle.binance.com/" target='_blank' rel='noreferrer'>
                            <MyImage src={BnbLogoImage} height={'100%'} width={'100%'} alt="logo" />
                        </Box>
                    </Stack>
                </Stack>
                <MyModal open={openModal} sx={{ width: "min(100vw - 1rem, 34rem)" }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={setOpenModal}>
                    {
                        mapContent[modalType]
                    }
                </MyModal>
            </Box >
        </Container >
    )
}

export default FaqHowtoplay;
const FAQContent = () => (
    <Stack gap={3} maxHeight={"calc(100vh - 15rem)"}>
        <Title>
            FAQ
        </Title>
        <Stack overflow={"auto"} gap={3}>
            <Stack gap={1}>
                <Subtitle>
                    What is DeODD?
                </Subtitle>
                <ParagraphRegular>
                    DeODD is a smart contract built on the BNB Chain Ecosystem that allows users to play a decentralized coin flip
                    and lottery mechanism by your BNB, with the flipping odds of 50/50 and charge a 3.25% fee, and a portion
                    allocated to the DeODD NFT Holders Pool.
                </ParagraphRegular>
            </Stack>
            <Stack gap={1}>
                <Subtitle>
                    How much do I have to pay for a flip?
                </Subtitle>
                <ParagraphRegular>
                    In addition to the bet amount, each flip you will have to pay the following fees: <br />
                    1. VRF fee (Verifiable Random Function): 0.003 BNB <br />
                    2. DeODD Services fee: 3.25% of bet amounts <br />
                    3. Blockchain gas fee: Estimated number <br />
                    <br />
                    For example: When you choose 0.01 BNB to flip, you actually spend: <br />
                    0.01 + 0.003 + 0.01*3.25% + 0.0007 = 0.014 BNB <Box component="span" fontStyle={"italic"}>(estimate)</Box>
                </ParagraphRegular>
            </Stack>
            <Stack gap={1}>
                <Subtitle>
                    How do I know I can Trust DeODD?
                </Subtitle>
                <ParagraphRegular>
                    As a decentralized coin flip and lottery product, DeODD uses technology and platforms to guarantee a fair system,
                    especially with the use of Oracle VRF from the Binance Smart Chain ecosystem. This ensures transparency,
                    making these games an innovative and exciting way for users to enjoy blockchain technology.
                </ParagraphRegular>
            </Stack>
            <Stack gap={1}>
                <Subtitle>
                    Where can I learn the essentials?
                </Subtitle>
                <ParagraphRegular>
                    Follow our social media channels to stay updated and/or Read our {" "}
                    <a href="https://docsend.com/view/nbwq8xa96nckf4zj" target='_blank' rel='noreferrer'>
                        <Typography display={"inline"} variant='body2' sx={{ textDecoration: "underline" }} >
                            WhitePaper
                        </Typography>
                    </a>.
                </ParagraphRegular>
            </Stack>
        </Stack>

    </Stack>

)
const HowToPlay = () => (
    <Stack gap={3} maxHeight={"calc(100vh - 15rem)"}>
        <Title>
            How to play
        </Title>
        <ParagraphRegular>
            Users need to follow these steps: <br />
            Step 1: Visit the official DeODD website <br />
            Step 2: Connect your Metamask Wallet (*). <br />
            Step 3: Set your nickname (or display name) and choose an avatar from available options. <br />
            Step 4: Pick either Heads or Tails <br />
            Step 5: Select your bet amount with your BNB. <br />
            Step 6: Click &ldquo;FLIP NOW&rdquo;. <br />
            Step 7: Wait a few seconds and get the result. <br />
        </ParagraphRegular>
        <Typography variant='body2' color="white" fontWeight={400} fontSize={"0.75rem"} lineHeight={'1rem'}>
            (*) Metamask Wallet: provides users with a secure and convenient way to manage their digital assets and interact with Dapps without the need for a separate wallet or complicated technical knowledge. Visit https://metamask.io/ and add the wallet to your Chrome, follow the instructions to create a wallet.
        </Typography>
    </Stack>

)
const PrivacyPolicy = () => (
    <Stack gap={3} maxHeight={"min(100vh - 15rem, 30.75rem)"}>
        <Title>
            Privacy Policy
        </Title>
        <Stack gap={3} sx={{ maxHeight: "30rem", overflow: "auto" }}>
            <ParagraphRegular>
                As a product based on a decentralized coin flip and lottery mechanism, the DeODD team (or &#34;We&#34;, &#34;Us&#34;) takes the privacy and security of our users&apos; information very seriously. This Privacy Policy section outlines the types of information we collect, how we use it, and the measures we take to protect it.
            </ParagraphRegular>
            <ParagraphRegular>
                We may be compelled to acquire your personal information in order to provide our services to you. Therefore, this Privacy Policy is meant to explain how we will collect and secure your personal information.
            </ParagraphRegular>
            <ParagraphRegular>
                This Privacy Policy does not apply to third-party products or services, or the activities of organizations we do not own or control, including other companies you may engage with on or through our services, unless otherwise stated.
            </ParagraphRegular>
            <ParagraphRegular>
                This Privacy Policy was created in the English language. When a translated version clashes with the English version, the English version takes precedence. The last time this Privacy Policy was updated was in May 2023.
            </ParagraphRegular>
            <ParagraphRegular>
                At any moment, we retain the right to make modifications to this Privacy Policy. We recommend that you review this Privacy Policy on a frequent basis to ensure that you are aware of any changes and how your information may be used.
            </ParagraphRegular>
        </Stack>
    </Stack >

)
const Item = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontSize: 14,
    // flex: '1 1 50%',
    // [theme.breakpoints.up('sm').replace("@media", "@container")]: {
    //     fontSize: 12,
    // },
    // [theme.breakpoints.up('md').replace("@media", "@container")]: {
    //     fontSize: 14,
    // },
    cursor: 'pointer',
    color: (theme.palette.secondary as any)["500"],
    fontWeight: 500
}))

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center",
    color: theme.palette.text.primary,
    fontWeight: 700,
}))

const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    lineHeight: "1.375rem",
    color: theme.palette.text.secondary,
    fontWeight: 600,
}))

const ParagraphRegular = styled(Typography)(({ theme }) => ({
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: theme.palette.text.primary,
    fontWeight: 400,
})) 

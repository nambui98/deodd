import { Box, Button, Container, Divider, Grid, Stack, Typography, TypographyProps, styled, useMediaQuery, useTheme, List, ListItem } from '@mui/material'
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

            <Subtitle>
                Information Collection
            </Subtitle>
            <ParagraphRegular>
                We collect personal information from our users in order to provide decentralized coin flip and lottery services. &#34;Personal information&#34; is data that identifies, relates to, describes, can be used to contact, or could reasonably be linked directly or indirectly to you. We may also collect information about users&apos; lottery activity and transaction history.
            </ParagraphRegular>
            <ParagraphRegular>
                Your personal information is protected by our Privacy Policy. All personal information received in the course of doing business with us is held in strict confidence.
            </ParagraphRegular>
            <ParagraphRegular>
                <Box fontWeight={500} color={"text.secondary"}>
                    Use of Information
                </Box>
                <List>
                    This may include:
                    <ListItem>
                        1. Providing our services;
                    </ListItem>
                    <ListItem>
                        2. Analyzing the usage of, and improving our products and services;
                    </ListItem>
                    <ListItem>
                        3. Using for marketing purposes, such as to inform users of special promotions or offers;
                    </ListItem>
                    <ListItem>
                        4. Communicating with you, including to inform you of our Terms of Use and/or this Privacy Policy;
                    </ListItem>
                    <ListItem>
                        5. Authenticating your financial account information or processing the transfer of digital assets;
                    </ListItem>
                    <ListItem>
                        6. Notifying you about any changes to our products, website and/or other software, brand or services offered;
                    </ListItem>
                    <ListItem>
                        7. Seeking your opinion and feedback on any of our services, including for the purposes of product improvement and customization, website/software improvement and personalization and other general services;
                    </ListItem>
                    <ListItem>
                        8. Operating the DeODD Shop
                    </ListItem>
                    <ListItem>
                        9. Investigating disputes between players;
                    </ListItem>
                    <ListItem>
                        10. And for other general services such as website/software security, maintenance, identification of fraud or errors, internal accounting and administration, and for any other purpose that we are required or permitted to do by law.
                    </ListItem>
                </List>
            </ParagraphRegular>
            <ParagraphRegular>
                We will not share users&apos; personal information with third parties unless required by law or necessary for the provision of our services.
            </ParagraphRegular>

            <Subtitle>
                Security Measures
            </Subtitle>
            <ParagraphRegular>
                Our commitment is to retain your personal information solely for the purposes for which it was initially collected. Moreover, we implement technical security measures to safeguard your information from being lost, misused, accessed, disclosed, altered, or destroyed without authorization.
            </ParagraphRegular>
            <ParagraphRegular>
                After we receive your information, we store it in encrypted format on secure servers that are protected by firewalls and other industry-standard security measures. We conduct regular security audits to ensure that our systems remain secure and up to date.
            </ParagraphRegular>
            <ParagraphRegular>
                To protect users&apos; personal information, we use a combination of physical, technical, and administrative safeguards. For example, our servers are kept in a secure data center with 24/7 monitoring, and we use multi-factor authentication to control access to our systems.
            </ParagraphRegular>
            <ParagraphRegular>
                We also have strict access controls in place to ensure that only authorized personnel can access users&apos; information, and require all employees to undergo background checks and sign non-disclosure agreements.
            </ParagraphRegular>

            <Subtitle>
                Age Requirements
            </Subtitle>
            <ParagraphRegular>
                Our decentralized coin flip and lottery services are only available to individuals who are 18 years of age or older. However, the age requirements may vary depending on the user&apos;s location and the applicable laws and regulations.
            </ParagraphRegular>
            <ParagraphRegular>
                It is important for users to comply with the age requirements when playing DeODD, as failure to do so may result in account suspension or termination. Additionally, users are responsible for ensuring that they comply with any other applicable laws and regulations related to the use of DeODD and blockchain-based services.
            </ParagraphRegular>
            <ParagraphRegular>
                We take the protection of minors&apos; privacy seriously and do not knowingly collect personal information from individuals under the age of 18. If we become aware that we have collected personal information from a minor, we will take steps  to remove that information from our servers. However, we cannot be held responsible for users who provide false information about their age, and we strongly encourage all users to be truthful about their age when using our services. By using our services, users agree to be bound by our age requirements and acknowledge that any false information provided may result in their account being terminated.
            </ParagraphRegular>

            <Subtitle>
                Regulation and legal considerations
            </Subtitle>
            <ParagraphRegular>
                As the popularity of blockchain technology and decentralized applications continue to grow, there are increasing regulatory and legal considerations that need to be taken into account for decentralized coin flip and lottery products like DeODD.
            </ParagraphRegular>
            <ParagraphRegular>
                As a decentralized coin flip and lottery product, DeODD recognizes the importance of complying with regulations and legal considerations to ensure the safety and security of its users. Therefore, the project will strive to understand and adhere to relevant laws and regulations, and implement necessary measures to mitigate risks and protect users&apos; information.
            </ParagraphRegular>
            <ParagraphRegular>
                This may include:
            </ParagraphRegular>
            <ParagraphRegular>
                <Box color={"text.secondary"}>
                    Anti-money laundering (AML) and know-your-customer (KYC)
                </Box>
                One of the main regulatory considerations is related to anti-money laundering (AML) and know-your-customer (KYC) requirements. As a decentralized platform, DeODD may face challenges in meeting these requirements, as it is not always possible to identify the true identity of users. However, DeODD is committed to making efforts to take measures to prevent illegal activities, such as using the platform for money laundering.
            </ParagraphRegular>
            <ParagraphRegular>
                The DeODD project is committed to complying with all anti-money laundering laws and regulations. However, in the event that a user intentionally violates these laws, the project will not be held responsible. It is the responsibility of each user to comply with applicable laws and regulations regarding the use of decentralized coin flip and lottery products. The project reserves the right to terminate any user&apos;s access to the platform in the event of suspected illegal activity. We may also proactively notify the competent authorities and provide relevant information to them.
            </ParagraphRegular>
            <ParagraphRegular>
                <Box color={"text.secondary"}>
                    The definition of lottery in different jurisdictions
                </Box>
                We take legal compliance very seriously and strive to ensure that our decentralized coin flip and lottery product is fully compliant with all applicable laws and regulations. However, it is ultimately the responsibility of the user to ensure that their participation in our games is legal in their jurisdiction and/or their country.
            </ParagraphRegular>
            <ParagraphRegular>
                We make every effort to clearly communicate the rules and requirements of our games to our users. However, if a user from a jurisdiction where the lottery is prohibited chooses to participate in our games, they do so at their own risk and we cannot be held responsible for any legal consequences that may arise. It is the responsibility of the user to understand and comply with the laws of their jurisdiction.
            </ParagraphRegular>
            <ParagraphRegular>
                In addition, we will make every effort to limit access to our website by users from countries where lottery is prohibited, by restricting their IP addresses. The list of these countries will be updated as required by the regulatory authorities. However, we cannot guarantee that our measures will be 100% effective in preventing access by users from these jurisdictions. Therefore, it is the responsibility of each user to ensure that they are complying with the laws and regulations of their country with respect to online lottery activities.
            </ParagraphRegular>

            <ParagraphRegular>
                <Box color={"text.secondary"}>
                    The potential risks associated with the use of smart contracts
                </Box>
                DeODD, as a software developer on the Blockchain platform, recognizes the potential risks involved in using smart contracts. Although smart contracts offer high automation and security, they are also susceptible to coding errors and attacks, which can lead to the loss of funds. Therefore, DeODD will implement regular security checks and necessary measures to ensure the security and reliability of the platform.
            </ParagraphRegular>
            <ParagraphRegular>
                In certain circumstances, DeODD may be subject to external factors that are beyond its control. In such cases, the project reserves the right to invoke force majeure clauses to exempt itself from any legal responsibility or obligation. Nonetheless, DeODD is committed to minimizing the impact of such events on its users and will take all necessary steps to ensure the continuity of its services.
            </ParagraphRegular>
            <ParagraphRegular>
                Overall, DeODD is committed to promoting a safe and secure gaming environment for its users while complying with applicable regulations and legal considerations.
            </ParagraphRegular>

            <Subtitle>
                Changes to Privacy Policy
            </Subtitle>
            <ParagraphRegular>
                We may update this Privacy Policy section from time to time. Users will be notified of any changes to the policy through our website or other means of communication.
            </ParagraphRegular>

            <Subtitle>
                Contact Information
            </Subtitle>
            <ParagraphRegular>
                If you have any questions or concerns about our Privacy Policy section or the use of your personal information, please contact us at
                <Box component={"span"} color={"text.secondary"}>
                    {" "}<a href='mailto:flip@deodd.io'>flip@deodd.io</a>.
                </Box>
            </ParagraphRegular>

            <Subtitle>
                Effective Date
            </Subtitle>
            <ParagraphRegular>
                This Privacy Policy section is effective as of May 10, 2023.
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

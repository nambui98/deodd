import Confetti from "@/public/assets/animations/animation_lkkmw52n.json"
import { Box, Button, Skeleton, Stack, StackProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Countdown from 'components/common/CountDown'
import { ButtonLoading } from 'components/ui/button'
import MyImage from 'components/ui/image'
import { Colors } from 'constants/index'
import { useLotteryContext } from 'contexts/LotteryContext'
import { useWalletContext } from 'contexts/WalletContext'
import Lottie from 'lottie-react'
import { USDTIcon } from 'utils/Icons'
import { BannerLotteryImage, BannerLotteryMobileImage, CoinEmptyImage } from 'utils/Images'
import CountDownNumber from './CountDownNumber'
import GenerateText from './GenerateText'
import Ticket from './components/Ticket'
import ModalBuyConfirm from "./components/ModalBuyConfirm"

type Props = {}

const Roll = (props: Props) => {
    const { isRollComing, isRollEnd, dateSpin, isRolling, isWinPrize, setOpenModalBuyTicket } = useLotteryContext();
    const { walletIsConnected, walletAddress, handleConnectWallet } = useWalletContext();

    return (
        <>
            <Box sx={{
                position: 'relative',
                backgroundImage: { xs: `url(${BannerLotteryMobileImage})`, md: `url(${BannerLotteryImage})` },
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                borderRadius: 4,
                backgroundRepeat: 'no-repeat',
                // height: '20.9375rem',
                overflow: 'hidden',
                ':after': {
                    content: '""',
                    background: { xs: 'none', md: 'radial-gradient(50% 50.00% at 50% 50.00%, #FEF156 0%, rgba(254, 241, 86, 0.00) 100%)' },
                    filter: 'blur(20px)',
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: '-1.5rem',
                    height: '2.5rem'
                }
            }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} px={2.26} mt={{ xs: 2, md: 3 }}>
                    <Typography
                        fontSize={16}
                        component={'span'}
                        fontWeight={600}>
                        Lottery{" "}
                        <Typography component={'span'} fontWeight={600} color='secondary.main'>#20231212</Typography> </Typography>
                    <RuleAndProvablyFair />
                </Stack>
                {
                    isRollEnd ?
                        <Stack alignItems={'center'} mt={2}>
                            <Typography variant='h5' fontWeight={700}>
                                Thank you for joining the draw of Lottery{" "}
                                <Typography component={'span'} color={'secondary.main'} fontSize={'inherit'} fontWeight={'inherit'}>#202312312</Typography>
                            </Typography>
                            <Typography fontSize={16} fontWeight={600} mt={2}>
                                The system is getting to buy the tickets for Lottery{" "}
                                <Typography component={'span'} color={'secondary.main'} fontSize={'inherit'} fontWeight={'inherit'}>#202312312</Typography>
                            </Typography>
                            <Typography fontSize={16} fontWeight={600} mt={5}>
                                Get ready for the upcoming exciting draw !
                            </Typography>
                            <Stack mt={3} direction={'row'} gap={1}>
                                <Typography fontSize={16} fontWeight={600} >
                                    Next Lottery in{" "}
                                </Typography>

                                <Typography fontSize={16} fontWeight={600} color={'secondary.main'} width={60}><CountDownNumber number={60} /></Typography>
                            </Stack>
                        </Stack>
                        :
                        <Stack
                            mt={isRolling ? 4 : isRollComing ? -3 : 3}
                            direction={'row'}
                            flexDirection={{ xs: 'column', md: 'row' }}
                        >
                            <Stack alignItems={'center'} flex={1}>
                                <Typography variant='h5' fontSize={24} fontWeight={700}>Total Jackpot</Typography>
                                <Stack direction={'row'} alignItems={'center'} gap={1} mt={{ xs: 2, md: 0 }}>
                                    <Typography fontSize={40} color="secondary.main" fontWeight={700}>14.042</Typography>
                                    <Box width={{ xs: 40, md: 30 }} height={{ xs: 40, md: 30 }}>

                                        <USDTIcon fill={Colors.secondaryDark} height={"100%"} width={"100%"} />
                                    </Box>
                                </Stack>
                                <Typography display={{ xs: 'none', md: 'block' }} mt={1} fontSize={14} component={'span'} fontWeight={500}>
                                    <Typography fontSize={'inherit'} component={'span'} fontWeight={500} color='secondary.main'>
                                        7,000 USDT
                                    </Typography>
                                    (fixed) +
                                    <Typography fontSize={'inherit'} component={'span'} fontWeight={500} color='secondary.main'>
                                        xxxx USDT
                                    </Typography>
                                    (bonus, estimated)
                                </Typography>
                                {
                                    !isRolling &&
                                    <>
                                        <Typography mt={1.5} fontWeight={700} fontSize={16}>Next draw in:</Typography>
                                        <Box mt={1} mb={{ xs: 0, md: 5 }} >
                                            {
                                                dateSpin !== null ?
                                                    (
                                                        <Countdown endDate={dateSpin?.toISOString()} sxNumber={{ color: 'white', fontSize: 24 }} sxTitle={{ mt: 1, color: 'white', fontSize: 14 }} />
                                                    )
                                                    :
                                                    <Skeleton variant="rounded" width={210} height={68} />
                                            }
                                        </Box>
                                    </>
                                }
                                {
                                    isRollComing && <Box mb={4} height={20}>
                                        <GenerateText />
                                    </Box>
                                }
                            </Stack>
                            {
                                isRolling &&
                                <Stack width={1} flex={1} alignItems={'flex-start'} >
                                    <Stack gap={2} maxWidth={376} width={1} alignItems={'center'}>
                                        <Typography variant='h5' textTransform={'uppercase'} fontWeight={700}>Winning numbers</Typography>
                                        <Box width={1}>
                                            <Ticket numbers={[22, 33, 11, 11, 22, 33]} mx="auto" py={1} px={2} />
                                        </Box>
                                    </Stack>
                                </Stack>
                            }

                            {
                                !isRollComing && !isRolling &&
                                <Stack flex={1} alignItems={'center'} gap={{ xs: 2, md: 3 }}>
                                    <Box mt={3} >
                                        {
                                            walletAddress !== undefined ? (
                                                !walletIsConnected ?
                                                    <ButtonLoading
                                                        onClick={handleConnectWallet}
                                                        fullWidth={false}
                                                        sx={{
                                                            width: 'auto',
                                                            px: 5,
                                                            py: 2,
                                                            textTransform: 'none',
                                                            backgroundColor: 'background.default'
                                                        }}>
                                                        Connect Wallet to Buy Ticket
                                                    </ButtonLoading>
                                                    :
                                                    <ButtonLoading
                                                        onClick={() => setOpenModalBuyTicket(true)}
                                                        fullWidth={false}
                                                        sx={{
                                                            width: 'auto',
                                                            px: 5,
                                                            py: 2,
                                                            textTransform: { xs: 'uppercase', md: 'none' },
                                                            backgroundColor: 'background.default'
                                                        }}>
                                                        Buy Ticket
                                                    </ButtonLoading>

                                            ) :
                                                <Skeleton variant="rounded" width={160} height={60} />
                                        }
                                    </Box>
                                    <Typography fontSize={14} fontWeight={400} >Time left to buy: 03:24:52</Typography>
                                    <Typography display={{ xs: 'none', md: 'inline' }} textAlign={'center'} component={'span'} fontSize={14} fontWeight={400} >

                                        <Typography component={'span'} fontSize={'inherit'} fontWeight={'inherit'} color="secondary.main">xxxx </Typography>
                                        tickets have been sold. Don&apos;t miss your chance!
                                    </Typography>

                                </Stack>
                            }

                            <RuleAndProvablyFair display={{ xs: 'flex', md: 'none' }} mt={3} mb={2} mx="auto" />
                        </Stack>


                }


            </Box >
            {
                isRolling &&
                <>
                    <Typography variant='h5' fontWeight={700}>Your numbers</Typography>
                    <Stack
                        sx={{ inset: 0 }}
                        gap={5}
                        height={1}
                        width={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                        textAlign={"center"}
                    >
                        <MyImage
                            sx={{
                                width: { xs: 80, md: 144 },
                                height: { xs: 80, md: 144 },
                            }}
                            src={CoinEmptyImage}
                            alt="Empty Coin Image"
                        />
                        <Typography
                            variant='body1'
                            fontWeight={600}
                            color={"secondary.100"}
                        >
                            You do not own any lottery tickets. Get one for the upcoming draw <br /> and who knows, luck might be on your side.
                        </Typography>
                    </Stack>
                    <Box mt={3} px={20}>
                        <TableContainer sx={{ backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                                        <TableCell >Numbers</TableCell>
                                        <TableCell >Ticket</TableCell>
                                        <TableCell >Matches</TableCell>
                                        <TableCell >Prize</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{
                                            'td, th': { border: 0, py: 1 }, 'th': {
                                                display: 'block'
                                            }
                                        }}
                                    >
                                        <TableCell
                                            align="right"
                                        // width={'100%'}
                                        >

                                            <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                                        </TableCell>
                                        <TableCell>
                                            4
                                        </TableCell>

                                        <TableCell >
                                            --
                                        </TableCell>

                                        <TableCell align="right" >
                                            <Stack direction={'row'} gap={1} >
                                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                            </Stack>
                                        </TableCell>

                                    </TableRow>
                                    <TableRow
                                        sx={{
                                            'td, th': { border: 0, py: 1 }, 'th': {
                                                display: 'block'
                                            }
                                        }}
                                    >
                                        <TableCell
                                            align="right"
                                        >
                                            <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                                        </TableCell>
                                        <TableCell>
                                            4
                                        </TableCell>
                                        <TableCell >
                                            --
                                        </TableCell>
                                        <TableCell align="right" >
                                            <Stack direction={'row'} >
                                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                            </Stack>
                                        </TableCell>

                                    </TableRow><TableRow
                                        sx={{
                                            'td, th': { border: 0, py: 1 }, 'th': {
                                                display: 'block'
                                            }
                                        }}
                                    >

                                        <TableCell
                                            align="right"
                                        >
                                            <Ticket numbers={[99, 44, 55, 66, 77, 11]} />
                                        </TableCell>
                                        <TableCell>
                                            4
                                        </TableCell>

                                        <TableCell >
                                            --
                                        </TableCell>

                                        <TableCell align="right" >
                                            <Stack direction={'row'} >
                                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                            </Stack>
                                        </TableCell>

                                    </TableRow><TableRow
                                        sx={{
                                            'td, th': { border: 0, py: 1 }, 'th': {
                                                display: 'block'
                                            }
                                        }}
                                    >
                                        <TableCell
                                            align="right"
                                        // width={'100%'}
                                        >
                                            <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                                        </TableCell>
                                        <TableCell>
                                            4
                                        </TableCell>

                                        <TableCell >
                                            --
                                        </TableCell>

                                        <TableCell align="right" >
                                            <Stack direction={'row'} >
                                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                            </Stack>
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Box>
                </>


            }
            {
                isRollEnd && !isWinPrize &&
                <>
                    <Typography variant='h5' fontWeight={700}>Your numbers</Typography>
                    <Stack
                        sx={{ inset: 0 }}
                        mb={6}
                        justifyContent={"center"}
                        alignItems={"center"}
                        textAlign={"center"}
                    >
                        <Typography
                            variant='body1'
                            fontWeight={600}
                            color={"secondary.100"}
                        >
                            Give it a shot and try your luck with Lottery
                            <Typography component={'span'} fontSize={"inherit"} fontWeight={'inherit'}>
                                #123123213
                            </Typography>
                        </Typography>
                        <Box mt={3} >
                            {
                                walletAddress !== undefined ? (
                                    !walletIsConnected ?
                                        <ButtonLoading fullWidth={false}
                                            onClick={handleConnectWallet}
                                            sx={{
                                                width: 'auto',
                                                px: 5,
                                                py: 2,
                                                textTransform: 'none',
                                                backgroundColor: 'background.default'
                                            }}>Connect Wallet to Buy Ticket</ButtonLoading>
                                        :
                                        <ButtonLoading
                                            onClick={() => setOpenModalBuyTicket(true)}
                                            fullWidth={false}
                                            sx={{
                                                width: 'auto',
                                                px: 5,
                                                py: 2,
                                                textTransform: 'none',
                                                backgroundColor: 'background.default'
                                            }}>Buy Ticket</ButtonLoading>

                                ) :
                                    <Skeleton variant="rounded" width={160} height={60} />
                            }
                        </Box>

                    </Stack>
                </>


            }
            {
                isWinPrize &&
                <Stack>
                    <Typography variant='h5' fontWeight={700}>Your numbers</Typography>
                    <Stack position={'relative'} height={270} justifyContent={'center'} alignItems={'center'}>
                        <Box position={'absolute'} sx={{ inset: 0 }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Lottie animationData={Confetti} loop={true} style={{ height: 900 }} />
                        </Box>
                        <Stack
                            sx={{ inset: 0 }}
                            justifyContent={"center"}
                            alignItems={"center"}
                            textAlign={"center"}
                        >
                            <Typography
                                variant='h5'
                                fontWeight={700}
                            >
                                Congrats! You won the Prize(s) on Lottery {' '}
                                <Typography component={'span'} color="secondary.main" fontSize={"inherit"} fontWeight={'inherit'}>
                                    #123123213
                                </Typography>
                            </Typography>
                            <Typography mt={2} variant='body2' fontWeight={400} >The system is calculating the prize value. It will be ready for you to claim in the next 30 minutes</Typography>
                            <Stack direction={'row'} mt={3} gap={2} >
                                <ButtonLoading fullWidth={false} sx={{
                                    width: 'auto',
                                    px: 5,
                                    py: 2,
                                    textTransform: 'none',
                                    backgroundColor: 'background.default'
                                }}>
                                    Go to Claim
                                </ButtonLoading>

                                <ButtonLoading fullWidth={false} sx={{
                                    width: 'auto',
                                    px: 5,
                                    py: 2,
                                    textTransform: 'none',
                                    backgroundColor: 'background.default'
                                }}>
                                    Buy ticket for next drawn
                                </ButtonLoading>
                            </Stack>

                        </Stack>

                    </Stack>
                </Stack>


            }
        </>
    )
}

export default Roll;
const RuleAndProvablyFair = (props: StackProps) => {
    return (
        <Stack display={{ xs: 'none', md: 'flex' }} direction={'row'} gap={2}{...props}>
            <Button variant='text' sx={{
                p: 1,
                px: 1.5,
                fontSize: 14,
                fontWeight: 400,
                textTransform: 'none',
                backgroundColor: 'secondary.900',
                color: 'white',
                border: '1px solid',
                borderColor: 'transparent',
                lineHeight: '20px',
                '&:hover': {
                    border: '1px solid',
                    borderColor: 'secondary.900'
                }
            }}>
                Rule
            </Button>
            <Button variant='text' sx={{
                p: 1,
                px: 1.5,
                lineHeight: '20px',
                fontWeight: 400,
                textTransform: 'none',
                backgroundColor: 'secondary.900',
                color: 'white',
                border: '1px solid',
                borderColor: 'transparent',
                '&:hover': {
                    border: '1px solid',
                    borderColor: 'secondary.900'
                }
            }}>
                Provably Fair
            </Button>
        </Stack>
    )
}
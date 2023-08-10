import Confetti from "@/public/assets/animations/animation_lkkmw52n.json"
import { Box, Button, Skeleton, Stack, StackProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Countdown from 'components/common/CountDown'
import { ButtonLoading } from 'components/ui/button'
import MyImage from 'components/ui/image'
import { Colors, MinusBeforeSpin } from 'constants/index'
import { useLotteryContext } from 'contexts/LotteryContext'
import { useWalletContext } from 'contexts/WalletContext'
import Lottie from 'lottie-react'
import { USDTIcon } from 'utils/Icons'
import { BannerLotteryImage, BannerLotteryMobileImage, CoinEmptyImage } from 'utils/Images'
import CountDownNumber from './CountDownNumber'
import GenerateText from './GenerateText'
import Ticket from './components/Ticket'
import ModalBuyConfirm from "./components/ModalBuyConfirm"
import { Format } from "utils/format"
import { useSiteContext } from "contexts/SiteContext"
import { BigNumber, ethers, utils } from "ethers"
import TicketAnimationOdometer from "./components/TicketAnimationOdometer"
import EndRoll from "./components/EndRoll"
import { useRouter } from "next/router"
import Link from "next/link"

type Props = {}

const Roll = (props: Props) => {
    const { isRollComing, isRollEnd, timeRemaining, isRolling, resultRoll, timeRemainingEndRoll, setOpenModalBuyTicket, myTicketsCurrentLottery } = useLotteryContext();
    const { currentLottery, prevLottery } = useSiteContext();
    const { walletIsConnected, walletAddress, handleConnectWallet } = useWalletContext();

    let timeLeftToBuy: { hours: string | number, minutes: string | number, seconds: string | number } = {
        hours: '0',
        minutes: '0',
        seconds: '0'
    };

    let formattedTimeRemaining: { hours: string | number, minutes: string | number, seconds: string | number } = {
        hours: '0',
        minutes: '0',
        seconds: '0'
    };

    if (timeRemaining !== null) {
        timeLeftToBuy = Format.formatTimeCountDown(timeRemaining - MinusBeforeSpin * 1000 * 60);
        formattedTimeRemaining = Format.formatTimeCountDown(timeRemaining);

    }

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
                        <Typography component={'span'} fontWeight={600} color='secondary.main'>#{currentLottery?.lottery_id}</Typography> </Typography>
                    <RuleAndProvablyFair />
                </Stack>
                {
                    isRollEnd ?
                        <Stack alignItems={'center'} mt={2} mb={10}>
                            <Typography variant='h5' fontWeight={700}>
                                Thank you for joining the draw of Lottery{" "}
                                <Typography component={'span'} color={'secondary.main'} fontSize={'inherit'} fontWeight={'inherit'}>#{prevLottery?.lottery_id}</Typography>
                            </Typography>
                            <Typography fontSize={16} fontWeight={600} mt={2}>
                                The system is getting to buy the tickets for Lottery{" "}
                                <Typography component={'span'} color={'secondary.main'} fontSize={'inherit'} fontWeight={'inherit'}>#{currentLottery?.lottery_id}</Typography>
                            </Typography>
                            <Typography fontSize={16} fontWeight={600} mt={5}>
                                Get ready for the upcoming exciting draw !
                            </Typography>
                            <Stack mt={3} direction={'row'} gap={1}>
                                <Typography fontSize={16} fontWeight={600} >
                                    Next Lottery in{" "}
                                </Typography>

                                <Typography fontSize={16} fontWeight={600} color={'secondary.main'} width={60}>{Math.floor(((timeRemainingEndRoll ?? 0) % (1000 * 60)) / 1000)}</Typography>
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
                                    {
                                        currentLottery ?
                                            <Typography fontSize={40} color="secondary.main" fontWeight={700}>{Format.formatMoney(utils.formatEther(BigNumber.from((currentLottery?.initial_jackpot ?? 0).toString())))}</Typography>
                                            :
                                            <Skeleton variant="rounded" width={50} height={30} />
                                    }
                                    <Box width={{ xs: 40, md: 30 }} height={{ xs: 40, md: 30 }}>

                                        <USDTIcon fill="#50ae94" height={"100%"} width={"100%"} />
                                    </Box>
                                </Stack>
                                <Typography display={{ xs: 'none', md: 'block' }} mt={1} fontSize={14} component={'span'} fontWeight={500}>
                                    <Typography fontSize={'inherit'} component={'span'} fontWeight={500} color='secondary.main'>
                                        {/* 7,000 USDT */}
                                        {Format.formatMoney(utils.formatEther(currentLottery?.initial_jackpot ?? 0))} USDT
                                    </Typography>
                                    (fixed) + {" "}
                                    <Typography fontSize={'inherit'} component={'span'} fontWeight={500} color='secondary.main'>
                                        {/* {currentLottery?.bonus} USDT */}
                                        {Format.formatMoney(utils.formatEther(currentLottery?.bonus ?? 0))} USDT

                                    </Typography>
                                    (bonus, estimated)
                                </Typography>
                                {
                                    !isRolling &&
                                    <>
                                        <Typography mt={1.5} fontWeight={700} fontSize={16}>Next draw in:</Typography>
                                        <Box mt={1} mb={{ xs: 0, md: 5 }} >
                                            {
                                                timeRemaining !== null ?
                                                    (
                                                        <Stack direction={'row'}>

                                                            {/* <Countdown endDate={dateSpin?.toISOString()} sxNumber={{ color: 'white', fontSize: 24 }} sxTitle={{ mt: 1, color: 'white', fontSize: 14 }} /> */}
                                                            <Stack width={70} alignItems={'center'}>
                                                                <Typography fontSize={24} fontWeight={700} color={'white'}>
                                                                    {formattedTimeRemaining.hours}
                                                                </Typography>
                                                                <Typography color={'white'} mt={1} fontSize={14}>
                                                                    hours
                                                                </Typography>
                                                            </Stack>
                                                            <Stack width={70} alignItems={'center'}>
                                                                <Typography fontSize={24} fontWeight={700} color={'white'}>
                                                                    {formattedTimeRemaining.minutes}
                                                                </Typography>
                                                                <Typography color={'white'} mt={1} fontSize={14}>
                                                                    min
                                                                </Typography>
                                                            </Stack>
                                                            <Stack width={70} alignItems={'center'}>
                                                                <Typography fontSize={24} fontWeight={700} color={'white'}>
                                                                    {formattedTimeRemaining.seconds}
                                                                </Typography>
                                                                <Typography color={'white'} mt={1} fontSize={14}>
                                                                    sec
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    )
                                                    :
                                                    <Skeleton variant="rounded" width={210} height={68} />
                                            }
                                        </Box>
                                    </>
                                }
                                {
                                    isRollComing && <Box mb={4} height={20}>
                                        {/* <GenerateText /> */}

                                        <Typography variant='body2' color={"secondary.main"} fontWeight={500}>The suspense is unbearable as we eagerly await the DeODD 625&apos;s lucky user.</Typography>
                                    </Box>
                                }
                            </Stack>
                            {
                                isRolling &&
                                <Stack width={1} flex={1} alignItems={'flex-start'} mb={10} >
                                    <Stack gap={2} maxWidth={376} width={1} alignItems={'center'}>
                                        <Typography variant='h5' textTransform={'uppercase'} fontWeight={700}>Winning numbers</Typography>
                                        <Box width={1}>
                                            <TicketAnimationOdometer numbersInit={resultRoll?.res} mx="auto" py={1} px={2} />
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
                                    <Typography fontSize={14} fontWeight={400} >Time left to buy: {" "}
                                        {timeLeftToBuy.hours + ":" + timeLeftToBuy.minutes + ":" + timeLeftToBuy.seconds}
                                    </Typography>
                                    <Typography display={{ xs: 'none', md: 'inline' }} textAlign={'center'} component={'span'} fontSize={14} fontWeight={400} >

                                        <Typography component={'span'} fontSize={'inherit'} fontWeight={'inherit'} color="secondary.main">{currentLottery?.total_tickets} </Typography>
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
                    {
                        myTicketsCurrentLottery && myTicketsCurrentLottery?.length > 0 ?
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
                                            {
                                                myTicketsCurrentLottery.map(row =>
                                                    <TableRow
                                                        key={row.draw_id}
                                                        sx={{
                                                            'td, th': { border: 0, py: 1 }, 'th': {
                                                                display: 'block'
                                                            }
                                                        }}
                                                    >
                                                        <TableCell
                                                            align="right"
                                                        >

                                                            <Ticket numbers={row.series} />
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.quantity}
                                                        </TableCell>

                                                        <TableCell >
                                                            {row.matches}
                                                        </TableCell>

                                                        <TableCell align="right" >
                                                            <Stack direction={'row'} gap={1} >
                                                                <Box>{Format.formatMoney(ethers.utils.formatEther(BigNumber.from(row.prize.toString())))}</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Box>

                            :
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

                    }
                </>


            }
            <EndRoll />
        </>
    )
}

export default Roll;
const RuleAndProvablyFair = (props: StackProps) => {
    const router = useRouter();
    const handleScrollToElement = (id: string) => {
        const element = document.getElementById(id);
        router.push('#' + id, undefined, { scroll: false })
        element!.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <Stack display={{ xs: 'none', md: 'flex' }} direction={'row'} gap={2}{...props}>
            <Button
                onClick={() => handleScrollToElement('rule')}
                variant='text' sx={{
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
            <Button variant='text'
                onClick={() => handleScrollToElement('provablyfair')}
                sx={{
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
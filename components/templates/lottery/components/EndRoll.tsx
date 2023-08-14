import Confetti from "@/public/assets/animations/animation_lkkmw52n.json"
import { Typography, Stack, Box, Skeleton, } from '@mui/material';
import { ButtonLoading } from 'components/ui/button';
import { useLotteryContext } from 'contexts/LotteryContext'
import { useSiteContext } from 'contexts/SiteContext';
import { useWalletContext } from 'contexts/WalletContext';
import Lottie from 'lottie-react';
import React from 'react'

type Props = {}

const EndRoll = (props: Props) => {
    const { currentLottery, prevLottery, isRollEnd, isWinPrize, setOpenModalBuyTicket, setOpenModalProvablyFair, myTicketsCurrentLottery } = useLotteryContext();
    const { walletAddress, walletIsConnected, handleConnectWallet } = useWalletContext();
    if (
        isRollEnd && !isWinPrize
    ) {
        return (
            <>
                <Typography variant='h5' fontWeight={700}>Your numbers</Typography>
                <Stack
                    sx={{ inset: 0 }}
                    mb={6}
                    justifyContent={"center"}
                    alignItems={"center"}
                    textAlign={"center"}
                >

                    {
                        myTicketsCurrentLottery && myTicketsCurrentLottery?.tickets!.length > 0 ?
                            <Typography
                                fontSize={16}
                                fontWeight={600}
                                color={"white"}
                            >
                                You haven&apos;t won any prizes in this draw. Try your luck again next time.
                            </Typography>
                            :

                            <Typography
                                variant='body1'
                                fontWeight={600}
                                color={"white"}
                            >
                                Give it a shot and try your luck with Lottery 625
                                {/* <Typography component={'span'} fontSize={"inherit"} fontWeight={'inherit'}>
                                    #{currentLottery?.lottery_id}
                                </Typography> */}
                            </Typography>
                    }

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


        )
    }
    if (isWinPrize) {
        return <Stack>
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
                            #{currentLottery?.lottery_id}
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
    return null
}

export default EndRoll
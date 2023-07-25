import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Typography } from '@mui/material'
import Countdown from 'components/common/CountDown'
import { ButtonLoading, ButtonTertiary } from 'components/ui/button'
import MyImage from 'components/ui/image'
import { Colors } from 'constants/index'
import React from 'react'
import { USDTIcon } from 'utils/Icons'
import { BannerLotteryImage } from 'utils/Images'

type Props = {}

const Banner = (props: Props) => {
    return (
        <Box sx={{
            position: 'relative',
            backgroundImage: `url(${BannerLotteryImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            borderRadius: 4,
            backgroundRepeat: 'no-repeat',
            height: '25.9375rem',
            overflow: 'hidden',
            ':after': {
                content: '""',
                background: 'radial-gradient(50% 50.00% at 50% 50.00%, #FEF156 0%, rgba(254, 241, 86, 0.00) 100%)',
                filter: 'blur(20px)',
                position: 'absolute',
                right: 0,
                left: 0,
                bottom: '-1.5rem',
                height: '2.5rem'
            }
        }}>
            <Box sx={{
            }}>

            </Box>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'} px={2.26} mt={3}>
                <Typography fontSize={16} component={'span'} fontWeight={600}>Lottery <Typography component={'span'} fontWeight={600} color='secondary.main'>#20231212</Typography> </Typography>
                <Stack direction={'row'} gap={2}>
                    <Button variant='text' sx={{
                        p: 0.75,
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
                        Rule
                    </Button>
                    <Button variant='text' sx={{
                        p: 0.75,
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
            </Stack>
            <Stack mt={-5} alignItems={'center'}>
                <Typography variant='h5' fontWeight={700}>Total Jackpot</Typography>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Typography fontSize={32} color="secondary.main" fontWeight={700}>14.042</Typography>
                    <USDTIcon fill={Colors.secondaryDark} height={30} width={30} />
                </Stack>
                <Typography mt={1} fontSize={14} component={'span'} fontWeight={500}>
                    <Typography fontSize={'inherit'} component={'span'} fontWeight={500} color='secondary.main'>
                        7,000 USDT
                    </Typography>
                    (fixed) +
                    <Typography fontSize={'inherit'} component={'span'} fontWeight={500} color='secondary.main'>
                        xxxx USDT
                    </Typography>
                    (bonus, estimated)
                </Typography>
                <Typography mt={1.5} fontWeight={700}>Next draw in:</Typography>
                <Box mt={1}>
                    <Countdown endDate={'2023-07-25T13:00:00Z'} sxNumber={{ color: 'white' }} sxTitle={{ mt: 1, color: 'white' }} />
                </Box>
                <ButtonLoading fullWidth={false} sx={{
                    width: 'auto',
                    mt: 3,
                    px: 5,
                    py: 2,
                    backgroundColor: 'background.default'
                }}>Buy ticket</ButtonLoading>
                <Typography fontSize={14} fontWeight={400} mt={2}>Time left to buy: 03:24:52</Typography>
                <Typography component={'span'} fontSize={14} fontWeight={400} mt={3}>

                    <Typography component={'span'} fontSize={'inherit'} fontWeight={'inherit'} color="secondary.main">xxxx</Typography>
                    tickets have been sold. Don&apos;t miss your chance!
                </Typography>
            </Stack>

        </Box >
    )
}

export default Banner
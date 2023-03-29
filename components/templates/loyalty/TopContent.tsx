import { Box, Stack, Typography } from '@mui/material';
import React from 'react'
import { NotiIcon } from 'utils/Icons';
import { BnbImage, LoyaltyImage } from 'utils/Images';

type Props = {}

function TopContent({ }: Props) {
    return (
        <Stack direction="row" mt={3} columnGap={4}>
            <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
                <Typography variant='h2' textTransform={'uppercase'}>
                    Jackpot pool
                </Typography>

                <Stack position={"relative"} padding={"24px 0px"} height={"413px"} bgcolor={"secondary.300"} borderRadius={"12px"} overflow={'hidden'} mt={3} >
                    <Box position={'absolute'} right={0} top={0} left={0}>
                        <img width={"100%"} height={"100%"} src={LoyaltyImage} alt="" />
                    </Box>
                    <Box textAlign={'center'} position={"absolute"} top="50%" left={0} right={0} sx={{ transform: 'translateY(-50%)' }} >
                        <Typography variant="body2" textTransform={"uppercase"}>season <Typography component={'span'} variant="body2" color="secondary.main">#2</Typography> started</Typography>
                        <Typography mt={1} variant="body2" textTransform={"uppercase"}>jackpot reward</Typography>
                        <Stack mt={1} direction={'row'} columnGap={1} alignItems={'center'} justifyContent={"center"}>
                            <Typography variant='h3' fontSize={"48px"}>0,534</Typography>
                            <img src={BnbImage} width={40} alt="" />
                        </Stack>
                    </Box>
                    <Stack mt={"auto"} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <NotiIcon />
                        <Typography ml={1} variant='body2' textAlign={'center'} color="secondary.100" textTransform={'uppercase'}>
                            HOW it work
                        </Typography>
                    </Stack>

                </Stack>

            </Box>
            <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
                <Typography variant='h2' textTransform={'uppercase'}>
                    NFT Holder pool
                </Typography>

                <Stack position={"relative"} padding={"24px 0px"} height={"413px"} bgcolor={"secondary.300"} borderRadius={"12px"} overflow={'hidden'} mt={3} >
                    <Box position={'absolute'} right={0} top={0} left={0}>
                        <img width={"100%"} height={"100%"} src={LoyaltyImage} alt="" />
                    </Box>
                    <Box textAlign={'center'} position={"absolute"} top="50%" left="0" right={0} sx={{ transform: 'translateY(-50%)' }} >

                        <Typography variant="body2" textTransform={"uppercase"}>period <Typography component={'span'} variant="body2" color="secondary.main">#2</Typography> STARTED AT 12/12/2022</Typography>
                        <Typography mt={1} variant="body2" textTransform={"uppercase"}>Total NFT holder reward</Typography>
                        <Stack mt={1} direction={'row'} columnGap={1} alignItems={'center'} justifyContent={"center"}>
                            <Typography variant='h3' fontSize={"48px"}>0,534</Typography>
                            <img src={BnbImage} width={40} alt="" />
                        </Stack>
                        <Typography mt={1} variant="body2" textTransform={"uppercase"}>Your current reward in this period is <Typography variant="body2" component={'span'} color="secondary.main"> 1,5 BNB</Typography></Typography>
                        <Typography mt={1} variant="body2" textTransform={"uppercase"}>Claimable in: 24:39:12</Typography>

                    </Box>
                    <Stack mt={"auto"} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <NotiIcon />
                        <Typography ml={1} variant='body2' textAlign={'center'} color="secondary.100" textTransform={'uppercase'}>
                            HOW it work
                        </Typography>

                    </Stack>
                </Stack>

            </Box>
        </Stack>
    );
}

export default TopContent
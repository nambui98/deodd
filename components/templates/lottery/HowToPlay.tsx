import { Box, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material'
import { MyTabs2, TypeTab } from 'components/common/Tabs'
import MyImage from 'components/ui/image'
import React, { useEffect, useState } from 'react'
import { BingoImage, LuckyImage, TicketImage } from 'utils/Images'
import { Format } from 'utils/format'
import Ticket from './components/Ticket'
import { DotIcon } from 'utils/Icons'
import { Colors } from 'constants/index'
import { useRouter } from 'next/router'

type Props = {}
enum TabEnum {
    RULES,
    PRIZE,
    PROVABLY_FAIR
}
const HowToPlay = (props: Props) => {
    const router = useRouter();
    const [valueTab, setValueTab] = useState<TabEnum>(TabEnum.RULES);
    const listTabs: TypeTab[] = [
        {
            id: TabEnum.RULES,
            title: "Rules",
        },
        {
            id: TabEnum.PROVABLY_FAIR,
            title: "Provably Fair",
        },

    ];
    useEffect(() => {
        if (router.asPath) {
            let valueFromParam = router.asPath.split("#")?.[1];
            if (valueFromParam === "rule") {
                setValueTab(TabEnum.RULES);
            } else if (valueFromParam === "provablyfair") {
                setValueTab(TabEnum.PROVABLY_FAIR)
            }
        }
        console.log(router);

    }, [router.asPath])

    return (
        <Box>
            <Divider />
            <Typography variant='h5' fontWeight={700} mt={3}>How to play</Typography>
            <Grid container pt={3} columnSpacing={4} rowSpacing={5} direction={'row'}>
                <Grid item xs={12} md={4}>
                    <Item image={TicketImage} title={'1. Buy a ticket'} description={`Buy ticket and pick <br /> 5 Numbers out of 25 <br />1 Jackpot number out of 10`} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item image={BingoImage} title={'2. Wait for the Draw'} description={'Wait for the draw at 15:00 UTC +0 every Monday, Wednesday, and Friday'} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item image={LuckyImage} title={'3. Check the results'} description={'Compare results and claim rewards'} />
                </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Box id="rule" component={'div'}></Box>
            <Box id="provablyfair" component={'div'}></Box>
            <MyTabs2 listTabs={listTabs} value={valueTab} setValue={setValueTab} />
            {
                valueTab === TabEnum.RULES && <Rules />
            }
            {
                valueTab === TabEnum.PROVABLY_FAIR && <ProvablyFair />
            }
        </Box>
    )
}
const Item = ({ image, title, description }: { image: string, title: string, description: string }) => {
    return (
        <Stack direction={'row'} gap={2}>
            <MyImage src={image} width={80} minWidth={80} minHeight={80} height={80} alt="" />
            <Box>
                <Typography fontSize={{ xs: 16, md: 24 }} fontWeight={700}>{title}</Typography>
                <Typography
                    mt={1} variant='body2' color="secondary.100"
                    fontWeight={400}
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                ></Typography>
            </Box>
        </Stack>
    )
}

export default HowToPlay
const Rules = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: (theme.palette.secondary as any)[800],
            color: theme.palette.common.white,

            fontSize: 14,
            border: '1px solid #48505F'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            fontWeight: 400,
            border: '1px solid #2a2d3e',
            verticalAlign: 'top'
        },
    }));




    return (

        <Box mt={8} >
            <Typography variant='body2' color={'white'} fontWeight={500} lineHeight={'20px'}>How to Play</Typography>
            <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                Players buy tickets in which select five white balls, numbered from 1 to 25, and one gold Jpotball, numbered from 1 to 10. You can choose numbers manually or automatically. To win the prizes, players must match numbers in their tickets comparing to Lucky Numbers which were picked randomly based on VRF mechanism.
            </Typography>
            <Typography mt={3} variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                The Lucky Number is divided into two parts: the first part contains five unique lucky numbers, and the second part is the lucky Jackpot number. The Jackpot number can coincide with any of the five basic numbers.
            </Typography>
            <Typography mt={3} variant='body2' color={'white'} fontWeight={500} lineHeight={'20px'}>
                Buy tickets
            </Typography>
            <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                You can buy a ticket for $0.5. The sale of tickets stops at 10 minutes before starting every draw.
            </Typography>
            <Typography mt={3} variant='body2' color={'white'} fontWeight={500} lineHeight={'20px'}>
                Prize Rules
            </Typography>
            <Typography mb={3} variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                Here are the rules for winning prizes in Lottery DeODD 625:
            </Typography>

            <TableContainer>
                <Table sx={{ maxWidth: 832 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell component="th" scope="row" width={"150px"}>Name of prize</StyledTableCell>
                            <StyledTableCell>Matches</StyledTableCell>
                            <StyledTableCell>Prize (in USDT)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell component="th" scope="row">
                                <Box>
                                    Jackpot
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Stack>
                                    Must match all five white balls (in any order) and the gold Jpot Ball.
                                    <Box mt={1}>
                                        <Ticket numbers={[3, 20, 13, 17, 24, 8]} />
                                    </Box>
                                </Stack>
                            </StyledTableCell>
                            <StyledTableCell>At least {Format.formatMoney(7000)} USDT + Bonus</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell component="th" scope="row">
                                First prize
                            </StyledTableCell>
                            <StyledTableCell>
                                Must match all five white balls (in any order) without the Jpot Ball.
                            </StyledTableCell>
                            <StyledTableCell>
                                200 USDT + Quantity of winning tickets
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell component="th" scope="row">
                                Second prize
                            </StyledTableCell>
                            <StyledTableCell>
                                Must match all four white balls (in any order) without the Jpot Ball.
                            </StyledTableCell>
                            <StyledTableCell>
                                2 USDT + Quantity of winning tickets
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell component="th" scope="row">
                                Third prize
                            </StyledTableCell>
                            <StyledTableCell>
                                Must match all three white balls (in any order) without the Jpot Ball.
                            </StyledTableCell>
                            <StyledTableCell>
                                1 USDT + Quantity of winning tickets
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell component="th" scope="row">
                                Fourth prize
                            </StyledTableCell>
                            <StyledTableCell>
                                Must match zero white balls in total.
                            </StyledTableCell>
                            <StyledTableCell>
                                0.5 USDT + Quantity of winning tickets
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography mt={3} variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                The jackpot starts at a minimum of 7,000 USDT (called “initial fund”) and increases with each drawing if there is no winner.
            </Typography>


            <Typography mt={3} variant='body2' color={'white'} fontWeight={500} lineHeight={'20px'}>
                Calculating Formula:
            </Typography>
            <Stack direction={'row'} alignItems={'center'} gap={1} px={1}>
                <svg width="6" height="6" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="4" fill={'#96A5C0'} />
                </svg>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    The Jackpot pool of the 1st draw = the initial fund (7000 USDT, sponsored by DeODD) + Bonus amount.
                </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'flex-start'} gap={1} px={1}>
                <Box mt={-0.5}>
                    <svg width="6" height="6" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="4" fill={'#96A5C0'} />
                    </svg>

                </Box>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    The Bonus amount = 35%* ticket sales (if satisfied condition 1) + 55% ticket sales (if satisfied condition 2) - The previous Winner Pool (the prize pool for the first, second, third, and fourth prize)
                </Typography>
            </Stack>

            <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                {
                    "(*) Condition 1: 20% * ticket sales < Initial Fund"
                }
            </Typography>
            <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                {
                    "(**) Condition 2: 20% * ticket sales >= Initial Fund"
                }
            </Typography>
            <Stack mt={3} direction={'row'} alignItems={'flex-start'} gap={1} px={1}>
                <Box mt={-0.5}>
                    <svg width="6" height="6" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="4" fill={'#96A5C0'} />
                    </svg>

                </Box>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    If there is no Jackpot winner, the Jackpot pool of the 2nd draw = The Jackpot pool of the 1st draw + Bonus Pool of the 2nd draw. This pool will continue to raise following this rule for the next periods.
                </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'flex-start'} gap={1} px={1}>
                <Box mt={-0.5}>
                    <svg width="6" height="6" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="4" fill={'#96A5C0'} />
                    </svg>
                </Box>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    The Bonus amount can be negative; however, it will not diminish the value of the Jackpot pool. If the Bonus amount is positive, it will be added to the total Jackpot pool. In the event of a negative Bonus amount, the Jackpot pool will remain the same value of previous draw and not be deducted.
                </Typography>
            </Stack>

            <Typography mt={3} variant='body2' color={'white'} fontWeight={500} lineHeight={'20px'}>
                Drawings
            </Typography>
            <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                Lottery DeODD 625 drawings are held three times/week on Monday, Wednesdays and Friday, at 15:00 UTC.
            </Typography>
            <Typography mt={3} variant='body2' color={'white'} fontWeight={500} lineHeight={'20px'}>
                Claiming Prizes
            </Typography>
            <Typography mb={3} variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                After each draw, players can claim their prizes directly on the website. However, it is important to note that there is a mandatory waiting period of 30 minutes after the drawing before they can proceed with claiming their rewards to their designated wallet.
            </Typography>







        </Box>

    )
}
const ProvablyFair = () => {
    return (
        <Box mt={3} >
            <Typography mb={3} variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                Lottery DeODD 625 is provably fair which means you can examine the results using and following data generated from VRF. Each drawn will be in 5+1 balls rule, with five unique regular balls taken from 25 numbers and a jackpot ball taken from 10 numbers.
            </Typography>
            <Typography variant='body2' color={'white'} fontWeight={500} lineHeight={'20px'}>
                Overall Rule:
            </Typography>
            <Stack direction={'row'} pl={1} gap={1}>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    1.
                </Typography>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    When the prize start drawing, a request will be sent to Binance Oracle Verifiable Random Function (VRF) to call a sequence of random numbers (called RNs). If duplicates need to be avoided, the request can call more numbers.
                </Typography>
            </Stack>
            <Stack direction={'row'} pl={1} gap={1}>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    2.
                </Typography>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    The VRF will then generate a random number in hexadecimal format, which will then be converted to decimal and use modulus operator for determining the lucky number outcomes.
                </Typography>
            </Stack>
            <Typography pl={3.5} variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                Note: To check your hexadecimal number, visit the transaction link in BSC. From the first log, take a look at the second line in the Data section. You can use any online converter to convert a hexadecimal number to a decimal number.
            </Typography>
            <Stack direction={'row'} pl={1} gap={1}>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    3.
                </Typography>
                <Typography variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    The DeODD Management System receives the result from modulus operator and determines whether the result and the user&apos;s ticket numbers are matched or not.
                </Typography>
            </Stack>
            <Stack direction={'row'} pl={1} gap={1}>
                <Typography mb={3} variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    4.
                </Typography>
                <Typography mb={3} variant='body2' color={'secondary.100'} fontWeight={400} lineHeight={'20px'}>
                    The DeODD management system will send rewards to the user based on their draw result.
                </Typography>
            </Stack>




        </Box>
    )
}
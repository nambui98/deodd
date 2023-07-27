import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import MyModal from 'components/common/Modal';
import { ButtonLoading } from 'components/ui/button';
import { Colors } from 'constants/index';
import { useLotteryContext } from 'contexts/LotteryContext';
import React, { useState } from 'react'
import TicketNumber from './TicketNumber';
import Ticket from './Ticket';
import { DeleteIcon, MinusIcon, PlusIcon } from 'utils/Icons';
import { Utils } from '@/utils/index';

type Props = {}

const ModalBuyTicket = (props: Props) => {
    const { openModalBuyTicket, setOpenModalBuyTicket } = useLotteryContext();
    const initTicketNumber = [null, null, null, null, null, null];
    const initTicketObject = {
        ticket: initTicketNumber, amount: 1
    }
    const [listTicketNumber, setListTicketNumber] = useState<{ ticket: (number | null)[], amount: number }[]>([initTicketObject]);
    const [ticketNumberTemp, setTicketNumberTemp] = useState<(number | null)[]>(initTicketNumber);
    const [indexCurrentTicketInList, setIndexCurrentTicketInList] = useState<number>(0);

    const [indexNumberSelected, setIndexNumberSelected] = useState<{
        indexNumber: number,
        indexTicket: number
    }>();
    const handleClickBasicNumber = (number: number) => {
        setTicketNumberTemp(prev => {
            const basicNumbers = [...prev.slice(0, 5)];
            const basicNumbersNotNull = basicNumbers.filter((nb) => nb !== null);
            const isExits = basicNumbers.some((value) => value === number);
            let newTicketNumberTempBasic = [...basicNumbers];

            debugger
            if (isExits) {
                newTicketNumberTempBasic = basicNumbers.map((ticketNumber) => ticketNumber === number ? null : ticketNumber);
            } else if (basicNumbersNotNull.length < 5) {
                let newBasicNumberNotNull = [...basicNumbersNotNull, number];
                newTicketNumberTempBasic = basicNumbers.map((_, index) => {
                    return newBasicNumberNotNull[index] ?? null
                })
            } else {
                newTicketNumberTempBasic = [...basicNumbers.slice(0, 4), number];
            }
            return [...newTicketNumberTempBasic, prev[5]];
        })
    }
    const handleClickJackpotNumber = (number: number) => {
        setTicketNumberTemp(prev => {
            return [...prev.slice(0, 5), number]
        })
    }
    const handleClickMyNumber = (indexNumber: number, indexTicket: number) => {
        setIndexNumberSelected({
            indexNumber,
            indexTicket
        });
    }
    const handleSubmitTicketTemp = () => {
        const ticketAdd: {
            ticket: (number | null)[],
            amount: number,
        } = {
            ticket: ticketNumberTemp,
            amount: 1
        }
        setListTicketNumber(prevList => {
            prevList[indexCurrentTicketInList] = ticketAdd;
            prevList[indexCurrentTicketInList] = ticketAdd;
            return [...prevList, initTicketObject];
        })
        setIndexCurrentTicketInList(prev => prev + 1);
        setTicketNumberTemp(initTicketNumber)
    }

    const handleMinusAmountTicket = (indexTicket: number) => {
        setListTicketNumber((prevList) => {
            let ticketChange = prevList[indexTicket];
            ticketChange.amount = ticketChange.amount - 1 > 0 ? ticketChange.amount - 1 : 0;
            prevList[indexTicket] = ticketChange;
            return [...prevList];
        })
    }
    const handlePlusAmountTicket = (indexTicket: number) => {
        setListTicketNumber((prevList) => {
            let ticketChange = prevList[indexTicket];
            ticketChange.amount = ticketChange.amount + 1;
            prevList[indexTicket] = ticketChange;
            return [...prevList];
        })
    }
    const handleRemoveTicket = (indexTicket: number) => {
        setListTicketNumber((prevList) => {
            const tickets = [...prevList];
            tickets.splice(indexTicket, 1);
            return [...tickets];
        })
        setIndexCurrentTicketInList((prev) => prev - 1 > 0 ? prev - 1 : 0)
    }
    const handleRandomTicket = () => {
        const ticketRandom = initTicketNumber.map((_, index) => Utils.getRandomNumberInRange(1, index === 5 ? 10 : 25))
        setTicketNumberTemp(ticketRandom)
    }
    return (
        <MyModal open={openModalBuyTicket} sx={{ width: "min(100vw - 16px, 928px)", maxHeight: "min(100vh - 140px, 1010px)" }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={setOpenModalBuyTicket}>
            <Typography textAlign={'center'} mb={2} variant='h5' fontWeight={700}>Buy Lottery Ticket</Typography>
            <Stack direction={'row'} mt={3} divider={<Divider flexItem orientation='vertical' sx={{ mx: 1 }} />}>
                <Stack flexBasis={"60%"} maxHeight={"min(100vh - 16px, 700px)"} >
                    <Stack overflow={'auto'} pb={3} pr={3}>

                        <Stack maxWidth={336} >
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <Typography fontSize={16} fontWeight={600}>Select 5 basic numbers</Typography>

                                <Typography sx={{ cursor: 'pointer' }} onClick={handleRandomTicket} fontSize={16} fontWeight={600} color={'secondary.main'}>Random</Typography>
                            </Stack>
                            <Stack
                                mt={2}
                                direction={'row'}
                                flexWrap={'wrap'}
                                columnGap={3}
                                rowGap={2}
                                sx={styleTicket}
                            >

                                {
                                    [...Array(25)].map((_, index) => {
                                        const number = index + 1;
                                        const checkNumberActive = ticketNumberTemp.slice(0, 5).some(numberTicket => numberTicket === number)
                                        return (
                                            <Box
                                                onClick={() => handleClickBasicNumber(number)}
                                                flexShrink={0}
                                                key={number}
                                                className={checkNumberActive ? "" : "inActive"}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TicketNumber size={48} number={index < 9 ? '0' + number : number} />
                                            </Box>

                                        )
                                    }
                                    )
                                }
                            </Stack>
                            <Typography mt={3} fontSize={16} fontWeight={600}>Select 1 Jackpot number</Typography>
                            <Stack
                                mt={2}
                                direction={'row'}
                                flexWrap={'wrap'}
                                columnGap={3}
                                rowGap={2}
                                sx={styleTicket}>
                                {
                                    [...Array(10)].map((_, index) => {
                                        let number = index + 1;
                                        let checkNumberActive = ticketNumberTemp[5] === number;
                                        return (
                                            <Box
                                                key={number + 'jackpot'}
                                                flexShrink={0}
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => handleClickJackpotNumber(number)}
                                                className={checkNumberActive ? "activeJackpot" : "inActive"}

                                            >
                                                <TicketNumber size={48} number={index < 9 ? '0' + number : number} />
                                            </Box>

                                        )
                                    }
                                    )
                                }

                            </Stack>
                            <ButtonLoading
                                disabled={ticketNumberTemp.some(number => number === null)}
                                onClick={handleSubmitTicketTemp}
                                sx={{
                                    mt: 3,
                                    width: 'auto',
                                    mx: 'auto',
                                    textTransform: 'none',
                                    py: 1,
                                    lineHeight: '20px',
                                    px: 1.5,
                                    borderRadius: 2,
                                    bgcolor: 'white',
                                    borderColor: 'white',
                                    color: 'primary.300',
                                    '&:disabled': {
                                        backgroundColor: 'secondary.900',
                                        color: 'primary.300',
                                    }
                                }}>
                                Submit numbers
                            </ButtonLoading>
                        </Stack>
                        <Stack direction={'row'} gap={2}>
                            <Stack maxWidth={336} width={1}>

                                <Typography mt={3} fontSize={16} fontWeight={600}>Your selected Numbers</Typography>
                            </Stack>

                            <Typography mt={3} fontSize={16} fontWeight={600}>Ticket(s)</Typography>
                        </Stack>
                        <Stack mt={2} direction={'row'} flexWrap={'wrap'} columnGap={3} rowGap={2}>
                            {
                                listTicketNumber.map((row, indexTicket) => {
                                    return (
                                        <Stack
                                            key={indexTicket}
                                            direction={'row'}
                                            alignItems={'center'}
                                            gap={3}
                                        >
                                            <Stack
                                                maxWidth={336}
                                                direction={'row'}
                                                gap={2}
                                                className='activeLastNumber'
                                                sx={styleTicket}
                                            >
                                                {
                                                    row.ticket.map((number, indexNumber) => {
                                                        return (
                                                            <Box
                                                                sx={{ cursor: 'pointer' }}
                                                                key={indexNumber}
                                                                onClick={() => handleClickMyNumber(indexNumber, indexTicket)}
                                                                className={number !== null ? "" : "inActive"}>
                                                                <TicketNumber size={40} number={number ? number < 10 ? '0' + number : number : ''} />
                                                            </Box>
                                                        )
                                                    })}
                                            </Stack>
                                            <Stack flex={1} gap={2} direction={'row'} alignItems={'center'}>
                                                <Stack bgcolor={'primary.300'} p={2} direction={'row'} alignItems={'center'}>
                                                    <Box onClick={() => handleMinusAmountTicket(indexTicket)} width={24} height={24} sx={{ cursor: 'pointer' }}>
                                                        <MinusIcon />
                                                    </Box>
                                                    <Typography width={70} textAlign={"center"} flex={1} fontSize={16} fontWeight={600} color="secondary.700" lineHeight={1}>
                                                        {row.amount}
                                                    </Typography>
                                                    <Box onClick={() => handlePlusAmountTicket(indexTicket)} width={24} height={24} sx={{ cursor: 'pointer' }}>
                                                        <PlusIcon />
                                                    </Box>
                                                </Stack>
                                                <Box sx={{ cursor: 'pointer' }} onClick={() => handleRemoveTicket(indexTicket)} width={24} height={24}>
                                                    <DeleteIcon />
                                                </Box>
                                            </Stack>

                                        </Stack>
                                    )
                                })
                            }
                        </Stack>
                    </Stack>
                </Stack>

                <Stack flexBasis={'40%'} pl={3}>
                    <Stack direction={'row'}>
                        <Typography fontSize={16} variant='body1' fontWeight={600}>0 ticket</Typography>
                        <Typography fontSize={16} variant='body1' fontWeight={600} color="secondary.100" flex={1} textAlign={'right'}>0.5 USDT/ticket</Typography>
                    </Stack>
                    <Stack mt={3} direction={'row'}>
                        <Typography fontSize={16} fontWeight={600}>Total cost</Typography>
                        <Typography fontSize={16} fontWeight={600} flex={1} textAlign={'right'}>0.5 USDT</Typography>
                    </Stack>
                    <ButtonLoading sx={{
                        mt: 3,
                        textTransform: 'none',
                        py: 2,
                        '&:disabled': {
                            backgroundColor: 'secondary.900',
                            color: 'primary.300',
                        }
                    }}>Check out</ButtonLoading>
                </Stack>
            </Stack>
        </MyModal >

    )
}

export default ModalBuyTicket

const styleTicket = {

    '& .inActive': {
        '> div': {
            '& .MuiTypography-root': {
                color: 'secondary.100',
                fontSize: 16
            },
            '> div': {
                ':nth-child(1)': {
                    backgroundColor: 'primary.100'
                },
                ':nth-child(2)': {
                    backgroundColor: 'primary.300',
                    opacity: .5
                },
                ':nth-child(3)': {
                    backgroundColor: 'primary.300',
                    opacity: .3
                },
            }
        }
    },
    '& .activeJackpot': {

        '> div': {
            '> div': {
                ':nth-child(1)': {
                    backgroundColor: 'secondary.main'
                },
                ':nth-child(2)': {
                    backgroundColor: '#FFFCDD'
                },
                ':nth-child(3)': {
                    backgroundColor: '#FFFCDD',
                    opacity: .8
                },
            }
        }

    },
    '&.activeLastNumber': {

        '> div:last-child': {
            div: {
                marginLeft: 'auto',
                '> div': {
                    ':nth-child(1)': {
                        backgroundColor: 'secondary.main'
                    },
                    ':nth-child(2)': {
                        backgroundColor: '#FFFCDD'
                    },
                    ':nth-child(3)': {
                        backgroundColor: '#FFFCDD',
                        opacity: .8

                    },
                }
            }
        },

    }
}
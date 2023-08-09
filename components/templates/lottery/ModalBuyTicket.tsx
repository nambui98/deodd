import { Utils } from '@/utils/index';
import { Box, Divider, Stack, Typography } from '@mui/material';
import MyModal from 'components/common/Modal';
import { ButtonLoading } from 'components/ui/button';
import { Colors, DefaultPriceTicket } from 'constants/index';
import { useLotteryContext } from 'contexts/LotteryContext';
import { useEffect, useState } from 'react';
import { DeleteIcon, MinusIcon, PlusIcon, USDTIcon } from 'utils/Icons';
import { SubtractImage } from 'utils/Images';
import { Format } from 'utils/format';
import TicketNumber from './TicketNumber';
import ModalBuyConfirm from './components/ModalBuyConfirm';
import ModalApprove from './components/ModalApprove';

type Props = {}

const ModalBuyTicket = (props: Props) => {
    const { openModalBuyTicket, setOpenModalBuyTicket, openModalApprove, setOpenModalApprove, openModalBuySuccess, setOpenModalBuySuccess } = useLotteryContext();

    const initTicketNumber = [null, null, null, null, null, null];
    const initTicketObject = {
        ticket: initTicketNumber, amount: 0
    }
    const [listTicketNumber, setListTicketNumber] = useState<{ ticket: (number | null)[], amount: number }[]>([initTicketObject]);
    const [ticketNumberTemp, setTicketNumberTemp] = useState<(number | null)[]>(initTicketNumber);
    const [indexCurrentTicketInList, setIndexCurrentTicketInList] = useState<number>(0);
    const [indexTicketEdit, setIndexTicketEdit] = useState<number>();

    useEffect(() => {
        if (openModalBuyTicket) {
            setTicketNumberTemp(initTicketNumber);
            setIndexCurrentTicketInList(0);
            setListTicketNumber([initTicketObject]);
            setIndexTicketEdit(undefined);


        }


    }, [openModalBuyTicket])


    const handleClickBasicNumber = (number: number) => {
        setTicketNumberTemp(prev => {
            const basicNumbers = [...prev.slice(0, 5)];
            const basicNumbersNotNull = basicNumbers.filter((nb) => nb !== null);
            const isExits = basicNumbers.some((value) => value === number);
            let newTicketNumberTempBasic = [...basicNumbers];

            // debugger
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
        const prevList = [...listTicketNumber];
        let ticketChange = prevList[indexTicket];
        ticketChange.amount = ticketChange.amount - 1 > 0 ? ticketChange.amount - 1 : 0;
        prevList[indexTicket] = ticketChange;

        setListTicketNumber(prevList)
    }
    const handlePlusAmountTicket = (indexTicket: number) => {
        const prevList = [...listTicketNumber];
        let ticketChange = prevList[indexTicket];
        ticketChange.amount += 1;
        prevList[indexTicket] = ticketChange;
        setListTicketNumber(prevList)
    }
    const handleRemoveTicket = (indexTicket: number) => {
        setListTicketNumber((prevList) => {
            const tickets = [...prevList];
            tickets.splice(indexTicket, 1);
            return [...tickets];
        })
        if (indexTicket === indexTicketEdit) {

            setIndexTicketEdit(undefined);
            setTicketNumberTemp(initTicketNumber);
        }
        setIndexCurrentTicketInList((prev) => prev - 1 > 0 ? prev - 1 : 0)
    }


    const handleRandomTicket = () => {
        let list: (number | null)[] = [];
        while (list.length < 5) {
            list = [...Array.from(new Set([...list, Utils.getRandomNumberInRange(1, 25)]))];
        }
        // list.push(Utils.getRandomNumberInRange(1, 10));
        list.push(null);
        setTicketNumberTemp(list)
    }

    const handleStartEdit = (indexTicket: number) => {
        if (indexTicket === indexTicketEdit) {
            setIndexTicketEdit(undefined);
            setTicketNumberTemp(initTicketNumber)
        } else {
            setIndexTicketEdit(indexTicket);
            setTicketNumberTemp(listTicketNumber[indexTicket].ticket);
        }
    }

    const handleSaveTicketEdit = () => {
        setListTicketNumber(prev => {
            prev[indexTicketEdit!].ticket = ticketNumberTemp;
            return [...prev]
        })
    }

    const handleClearTemp = () => {
        setTicketNumberTemp(initTicketNumber);
    }

    const totalAmountTicket = listTicketNumber.reduce((total, ticket) => total + ticket.amount, 0);
    return (
        <>
            <MyModal open={openModalBuyTicket} sx={{ width: "min(100vw - 16px, 928px)", px: 0 }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={setOpenModalBuyTicket}>
                <Typography textAlign={'center'} mb={2} variant='h5' fontWeight={700}>Buy Lottery Ticket</Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} px={2} maxHeight={{ xs: "min(100vh - 16px, 100vh - 260px)", md: "auto" }} overflow={{ xs: "auto", md: 'hidden' }} mt={3} divider={<Divider flexItem orientation='vertical' sx={{ mx: 1 }} />}>
                    <Stack flexBasis={{ xs: 1, md: "60%" }} maxHeight={{ xs: "auto", md: "min(100vh - 16px, 700px)" }} >
                        <Stack overflow={'auto'} pb={3} pr={{ xs: 0, md: 3 }}>
                            <Stack direction={'row'} >
                                <Typography fontSize={16} fontWeight={600}>Select 5 basic numbers</Typography>
                                <Typography ml="auto" sx={{ cursor: 'pointer', px: 2 }} onClick={handleRandomTicket} fontSize={16} fontWeight={600} color={'secondary.main'}>Random</Typography>
                                <Typography sx={{ cursor: 'pointer', px: 2 }} onClick={handleClearTemp} fontSize={16} fontWeight={600} color={ticketNumberTemp.some(number => number === null) ? 'secondary.100' : 'secondary.main'}>Clear</Typography>
                            </Stack>
                            <Stack maxWidth={336} >

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
                                    onClick={indexTicketEdit !== undefined ? handleSaveTicketEdit : handleSubmitTicketTemp}
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
                                    {
                                        indexTicketEdit !== undefined ? 'Save change' : 'Submit numbers'
                                    }

                                </ButtonLoading>
                            </Stack>
                            <Stack direction={'row'} mt={3} gap={0}>
                                <Stack maxWidth={376} width={1}>

                                    <Typography fontSize={16} fontWeight={600}>Your selected Numbers</Typography>
                                </Stack>

                                <Typography display={{ xs: 'none', md: 'block' }} fontSize={16} fontWeight={600}>Ticket(s)</Typography>

                            </Stack>
                            <Stack mt={2} direction={'row'}

                                // mx={-2}
                                flexWrap={'wrap'} columnGap={3} rowGap={1}>
                                {
                                    listTicketNumber.map((row, indexTicket) => {
                                        return (
                                            <Stack
                                                key={indexTicket}
                                                direction={{ xs: "column", md: 'row' }}
                                                alignItems={'center'}
                                                columnGap={3}
                                                rowGap={0}

                                            // flexWrap={'wrap'}
                                            >
                                                <Stack
                                                    maxWidth={376}
                                                    direction={'row'}
                                                    onClick={() => row.ticket.every((number) => number !== null) ? handleStartEdit(indexTicket) : {}}
                                                    gap={2}

                                                    className='activeLastNumber'
                                                    sx={{
                                                        ...styleTicket,
                                                        px: 2,
                                                        py: 1,
                                                        cursor: indexTicket === indexTicketEdit ? 'pointer' : 'inherit',
                                                        backgroundImage: indexTicket === indexTicketEdit ? `url(${SubtractImage})` : 'none',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'center',
                                                        backgroundSize: '100%',

                                                    }}
                                                >
                                                    {
                                                        row.ticket.map((number, indexNumber) => {
                                                            return (
                                                                <Box
                                                                    // sx={{ cursor: 'pointer' }}
                                                                    key={indexNumber}
                                                                    className={number !== null ? "" : "inActive"}>
                                                                    <TicketNumber size={40} number={number ? number < 10 ? '0' + number : number : ''} />
                                                                </Box>
                                                            )
                                                        })}
                                                </Stack>

                                                <Stack flex={1} gap={2} pr={{ xs: 0, md: 0 }} alignSelf={{ xs: 'flex-end', md: 'auto' }} direction={'row'} alignItems={'center'}>
                                                    <Typography display={{ xs: 'block', md: 'none' }} fontSize={16}>Ticket (s)</Typography>
                                                    <Stack
                                                        bgcolor={'primary.300'}
                                                        p={{ xs: 1, md: 2 }}
                                                        direction={'row'}
                                                        alignItems={'center'}
                                                        borderRadius={2}
                                                        sx={{
                                                            color: "secondary.700",
                                                            transition: '.3s all',
                                                            svg: {
                                                                stroke: '#677286',
                                                                transition: '.3s all',
                                                            },
                                                            '&:hover': {
                                                                backgroundColor: 'primary.100',
                                                                color: 'white',
                                                                svg: {
                                                                    stroke: 'white'
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <Box onClick={() => handleMinusAmountTicket(indexTicket)} width={24} height={24} sx={{ cursor: 'pointer' }}>
                                                            <MinusIcon />
                                                        </Box>
                                                        <Typography width={50} textAlign={"center"} flex={1} fontSize={16} fontWeight={600} lineHeight={1}>
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

                    <Stack flexBasis={'40%'} pl={2} pr={{ xs: 2, md: 0 }}>
                        <Stack direction={'row'}>
                            <Typography fontSize={16} variant='body1' fontWeight={600}>{totalAmountTicket} ticket</Typography>
                            <Typography fontSize={16} variant='body1' fontWeight={600} color="secondary.100" flex={1} textAlign={'right'}>{DefaultPriceTicket} USDT/ticket</Typography>
                        </Stack>
                        <Stack mt={3} direction={'row'}>
                            <Typography fontSize={16} fontWeight={600}>Total cost</Typography>
                            <Typography fontSize={16} fontWeight={600} flex={1} textAlign={'right'}>{Format.formatMoney(totalAmountTicket * DefaultPriceTicket)} USDT</Typography>
                        </Stack>
                        <ButtonLoading
                            disabled={totalAmountTicket <= 0}
                            onClick={() => {
                                // setOpenModalBuyTicket(false);
                                setOpenModalApprove(true);
                            }}
                            sx={{
                                mt: 3,
                                textTransform: 'none',
                                py: 2,
                                '&:disabled': {
                                    backgroundColor: 'secondary.900',
                                    color: 'primary.300',
                                }
                            }}>
                            Check out
                        </ButtonLoading>
                    </Stack>
                </Stack>
            </MyModal >
            <MyModal open={openModalBuySuccess} sx={{
                maxWidth: 352,
                width: 1,
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
            }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={setOpenModalBuySuccess}>
                <Typography textAlign={'center'} mb={3} variant='h5' fontWeight={700}>Buy Lottery Ticket</Typography>
                <Typography fontSize={14} fontWeight={400} textAlign={'center'} mb={5.5}>You have success buy x{totalAmountTicket} {totalAmountTicket > 1 ? 'Tickets' : 'Ticket'}</Typography>
                <ButtonLoading onClick={() => { setOpenModalBuySuccess(false) }}>
                    Confirm
                </ButtonLoading>
            </MyModal>
            <ModalApprove totalAmountTicket={totalAmountTicket} listTicket={listTicketNumber} refresh={() => {
                // setTicketNumberTemp(initTicketNumber);
                // setIndexCurrentTicketInList(0);
                // setListTicketNumber([initTicketObject]);
                // setIndexTicketEdit(undefined);

            }} />

        </>
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
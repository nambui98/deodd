import { Box, MenuItem, Select, SelectChangeEvent, Skeleton, Stack, Typography } from '@mui/material'
import { MyTabs2, TypeTab } from 'components/common/Tabs';
import { ButtonLoading } from 'components/ui/button';
import { Colors } from 'constants/index';
import { useWalletContext } from 'contexts/WalletContext';

import React, { Suspense, lazy, useEffect, useState } from 'react'
import JackpotWinner from './JackpotWinner';
import Claim from './Claim';
import CoinAnimation from 'components/common/CoinAnimation';

// const MyTicket = lazy(() => import("./MyTicket"));

import dynamic from 'next/dynamic'
import { DeoddService } from 'libs/apis';
import { useQuery } from '@tanstack/react-query';
import { JackpotType } from 'libs/types';
import { useSiteContext } from 'contexts/SiteContext';
import { useInView } from 'react-intersection-observer';
import { useLotteryContext } from 'contexts/LotteryContext';

const MyTicket = dynamic(() =>
    import('./MyTicket')
)
const Result = lazy(() =>
    import('./Result')
)
type Props = {}
enum TabEnum {
    MY_TICKET,
    RESULT,
    JACKPOT,
    CLAIM
}
const BuyTickets = (props: Props) => {
    const { drawIdValue, setDrawIdValue } = useLotteryContext();
    const [valueTab, setValueTab] = useState<TabEnum>(TabEnum.MY_TICKET);

    const { currentLottery } = useSiteContext();
    const [page, setPage] = useState<number>(1)
    const [listJackpot, setListJackpot] = useState<JackpotType[]>([])
    useEffect(() => {
        if (currentLottery) {
            setDrawIdValue(currentLottery.draw_id.toString())
        }
    }, [currentLottery])

    const listTabs: TypeTab[] = [
        {
            id: TabEnum.MY_TICKET,
            title: "My ticket",
        },
        {
            id: TabEnum.RESULT,
            title: "Result",
        },
        {
            id: TabEnum.JACKPOT,
            title: "Jackpot Winners",
        },
        {
            id: TabEnum.CLAIM,
            title: "Claim",
        },
    ];
    const { data: resListJackPot } = useQuery({
        queryKey: ["getListJackpot", page],
        // refetchOnWindowFocus: false,
        queryFn: () => DeoddService.getListJackpot({ page: page, size: 10 }),
        select: (data) => {
            let result: JackpotType[] = [];
            if (data.status === 200) {
                result = data.data.data;
            } else {
                result = [];
            }
            return result;
        },
        onSuccess(data) {
            if (data && data.length > 0) {
                if (listJackpot.length > 0 && listJackpot[listJackpot.length - 1].draw_id !== data[data.length - 1].draw_id) {
                    setListJackpot((prev) => [...prev, ...data]);
                } else {
                    setListJackpot(data);
                }
            }
        },

    });
    // useEffect(() => {
    //     if (resListJackPot && resListJackPot.length > 0) {
    //         setListJackpot([...listJackpot, ...resListJackPot]);
    //     }
    // }, [listJackpot, resListJackPot])

    const [bottomRef, inView] = useInView();
    useEffect(() => {
        if (inView) {
            if (listJackpot.length > 0) {
                setPage((prev) => prev + 1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView])
    const mapComponentTab: Record<TabEnum, React.ReactNode> = {
        [TabEnum.MY_TICKET]: <MyTicket drawId={drawIdValue} />,
        [TabEnum.RESULT]: <Result drawId={drawIdValue} />,
        [TabEnum.JACKPOT]: <JackpotWinner drawId={drawIdValue} />,
        [TabEnum.CLAIM]: <Claim />,
    }


    return (
        <Box>
            <Box overflow={'auto'}>
                <MyTabs2 listTabs={listTabs} value={valueTab} setValue={setValueTab} />
            </Box>
            <Stack direction={'row'} display={valueTab === TabEnum.JACKPOT ? 'none' : 'flex'} flexWrap={'wrap'} alignItems={'center'} gap={2} mt={3}>
                <Typography fontSize={14} fontWeight={500}>Lottery ID</Typography>
                <Box>
                    <Select
                        value={drawIdValue ?? ''}
                        placeholder='Select-'
                        onChange={(event: SelectChangeEvent) => { setDrawIdValue(event.target.value) }}
                        displayEmpty
                        sx={styleInput}
                        inputProps={{ 'aria-label': 'Select campaign' }}
                        MenuProps={{ slotProps: { paper: { sx: { maxHeight: 250 } } } }}
                    >
                        <MenuItem value={"all"}>
                            <Typography color={"secondary.100"}>All</Typography>
                        </MenuItem>
                        {
                            listJackpot.map((jackpot, index) =>
                                <MenuItem value={jackpot.draw_id.toString()} key={index}>
                                    <Typography color={'white'} fontWeight={500} component={'span'} fontSize={14}>Lottery{" "}
                                        <Typography color={"secondary.main"} fontWeight={500} component={'span'} fontSize={'inherit'}>
                                            #{jackpot.lottery_id}
                                        </Typography>
                                    </Typography>
                                </MenuItem>

                            )
                        }
                        <Box ref={bottomRef} />
                    </Select>
                </Box>

                {/* <Typography flex={{ xs: 1, md: 1 }} color='secondary.100' textAlign={{ xs: 'center', sm: 'left' }} fontSize={14} fontWeight={500}>12/12/2022, 16:20:00</Typography> */}
            </Stack>

            <Suspense fallback={<CoinAnimation mx="auto" width={50} height={50} />}>

                {mapComponentTab[valueTab]}
            </Suspense>
        </Box>
    )
}

export default BuyTickets
const styleInput = {
    border: '0px solid',
    borderColor: 'background.paper',
    borderRadius: 2,
    '.MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    width: "100%",
    fontSize: 14,
    backgroundColor: "background.paper",

    '& .MuiInputBase-root': {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: "1.25rem",
        cursor: "pointer",
    },
    // bgcolor: 'background.default',
    'div': {
        py: 1,
        pl: 2,
        fontSize: 16,
    },
    '& .MuiSvgIcon-root ': {
        fill: Colors.secondary,
    },
    '& .MuiPaper-root ': {

        backgroundColor: "background.paper",
    }

}
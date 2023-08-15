import { Box, MenuItem, Select, SelectChangeEvent, Skeleton, Stack, Typography } from '@mui/material'
import { MyTabs2, TypeTab } from 'components/common/Tabs';
import { ButtonLoading } from 'components/ui/button';
import { Colors } from 'constants/index';
import { useWalletContext } from 'contexts/WalletContext';

import React, { Suspense, lazy, useEffect, useState } from 'react'
import JackpotWinner from './JackpotWinner';
// import Claim from './Claim';
import CoinAnimation from 'components/common/CoinAnimation';

// const MyTicket = lazy(() => import("./MyTicket"));

import dynamic from 'next/dynamic'
import { DeoddService } from 'libs/apis';
import { useQuery } from '@tanstack/react-query';
import { JackpotType } from 'libs/types';
import { useSiteContext } from 'contexts/SiteContext';
import { useInView } from 'react-intersection-observer';
import { useLotteryContext } from 'contexts/LotteryContext';
import EndRoll from './components/EndRoll';

const MyTicket = dynamic(() =>
    import('./MyTicket')
)
const Result = lazy(() =>
    import('./Result')
)
const Claim = lazy(() =>
    import('./Claim')
)
type Props = {}

enum TabEnum {
    MY_TICKET,
    RESULT,
    JACKPOT,
    CLAIM
}
const BuyTickets = (props: Props) => {
    const [valueTab, setValueTab] = useState<TabEnum>(TabEnum.MY_TICKET);
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

    // useEffect(() => {
    //     if (resListJackPot && resListJackPot.length > 0) {
    //         setListJackpot([...listJackpot, ...resListJackPot]);
    //     }
    // }, [listJackpot, resListJackPot])


    const mapComponentTab: Record<TabEnum, React.ReactNode> = {
        [TabEnum.MY_TICKET]: <MyTicket setValueTab={setValueTab} />,
        [TabEnum.RESULT]: <Result />,
        [TabEnum.JACKPOT]: <JackpotWinner />,
        [TabEnum.CLAIM]: <Claim />,
    }

    const redirectToTabClaim = () => {
        setValueTab(TabEnum.CLAIM)
    }

    return (
        <Box>

            <EndRoll redirectToTabClaim={redirectToTabClaim} />
            <Box overflow={'auto'}>
                <MyTabs2 listTabs={listTabs} value={valueTab} setValue={setValueTab} />
            </Box>
            <Suspense fallback={<CoinAnimation mx="auto" width={50} height={50} />}>
                {mapComponentTab[valueTab]}
            </Suspense>
        </Box>
    )
}

export default BuyTickets

import { Box } from '@mui/material'
import { MyTabs2, TypeTab } from 'components/common/Tabs';
import React, { useState } from 'react'

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
    return (
        <Box>

            <MyTabs2 listTabs={listTabs} value={valueTab} setValue={setValueTab} />
            BuyTickets
        </Box>
    )
}

export default BuyTickets
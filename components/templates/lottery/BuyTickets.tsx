import { Box, MenuItem, Select, SelectChangeEvent, Skeleton, Stack, Typography } from '@mui/material'
import { MyTabs2, TypeTab } from 'components/common/Tabs';
import { ButtonLoading } from 'components/ui/button';
import { Colors } from 'constants/index';
import { useWalletContext } from 'contexts/WalletContext';

import React, { useState } from 'react'
import MyTicket from './MyTicket';
import Result from './Result';
import JackpotWinner from './JackpotWinner';
import Claim from './Claim';

type Props = {}
enum TabEnum {
    MY_TICKET,
    RESULT,
    JACKPOT,
    CLAIM
}
const BuyTickets = (props: Props) => {
    const [valueTab, setValueTab] = useState<TabEnum>(TabEnum.MY_TICKET);
    const [lotteryId, setLotteryId] = useState<string>('123')
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
    const mapComponentTab: Record<TabEnum, React.ReactNode> = {
        [TabEnum.MY_TICKET]: <MyTicket />,
        [TabEnum.RESULT]: <Result />,
        [TabEnum.JACKPOT]: <JackpotWinner />,
        [TabEnum.CLAIM]: <Claim />,
    }

    return (
        <Box>

            <Box overflow={'auto'}>

                <MyTabs2 listTabs={listTabs} value={valueTab} setValue={setValueTab} />
            </Box>
            <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} gap={2} mt={3}>
                <Typography fontSize={14} fontWeight={500}>Lottery ID</Typography>
                <Box>
                    <Select
                        value={lotteryId}
                        // variant='outlined'
                        placeholder='Select-'
                        onChange={(event: SelectChangeEvent) => { setLotteryId(event.target.value) }}
                        displayEmpty
                        sx={styleInput}
                        inputProps={{ 'aria-label': 'Select campaign' }}
                    >
                        <MenuItem value={"all"}>
                            <Typography color={"secondary.100"}>All</Typography>
                        </MenuItem>
                        <MenuItem value={"123"}>
                            <Typography color={'white'} fontWeight={500} component={'span'} fontSize={14}>Lottery{" "}
                                <Typography color={"secondary.main"} fontWeight={500} component={'span'} fontSize={'inherit'}>
                                    #20231212
                                </Typography>
                            </Typography>
                        </MenuItem>
                        <MenuItem value={"1234"}>
                            <Typography color={'white'} fontWeight={500} component={'span'} fontSize={14}>Lottery{" "}
                                <Typography color={"secondary.main"} fontWeight={500} component={'span'} fontSize={'inherit'}>
                                    #202312124
                                </Typography>
                            </Typography>
                        </MenuItem>
                    </Select>
                </Box>

                <Typography flex={{ xs: 1, md: 0 }} color='secondary.100' textAlign={{ xs: 'center', sm: 'left' }} fontSize={14} fontWeight={500}>12/12/2022, 16:20:00</Typography>
            </Stack>
            {mapComponentTab[valueTab]}
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
import { Box, Stack, Tab, Tabs, Typography, styled } from '@mui/material';
import React, { useState } from 'react'
import { CampaignImage } from '../../utils/Images';
import { DotIcon } from '../../utils/Icons';

export type TypeTab = {
    id: number,
    title: string,
    value?: string,
    isNoti?: boolean,
    icon?: JSX.Element
};
type Props = {
    listTabs: TypeTab[],
    value: number,
    setValue: Function
}

function MyTabs({ value, setValue, listTabs }: Props) {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'secondary.100' }}>
            <Tabs sx={style} value={value} onChange={handleChange} aria-label="basic tabs example">
                {
                    listTabs.map((tab, i) =>
                        <TabCustomize key={tab.id} value={tab.id} label={<Stack direction={'row'} alignItems={'center'}> {tab.icon} {tab.value ? tab.title + " " + tab.value : tab.title} {tab.isNoti && <Dot />}</Stack>} />
                    )
                }
            </Tabs >
        </Box >
    )

}
const TabCustomize = styled(Tab)(({ theme }) => ({
    // '&.Mui-selected': {

    //     backgroundColor: (theme.palette.secondary as any)['300']
    // }
}))
const Dot = () => {
    return <Box position={"absolute"} right={8} top={4}>
        <DotIcon />
    </Box>
}
const style = {
    ' .MuiTab-root ': {
        ':first-child': {
            pl: 0
        },
        px: 1.5,
        fontSize: '14px',
        fontWeight: 500,
        color: 'text.primary',
        'svg': {
            fill: "#fff"
        },
        '&.Mui-selected': {
            color: 'text.secondary',
            'svg': {
                fill: "#FEF156"
            }
        }

    },
    '.MuiTabs-indicator': {
        backgroundColor: 'text.secondary',
    },


}
export default MyTabs;
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react'
import { CampaignImage } from '../../utils/Images';
import { DotIcon } from '../../utils/Icons';

export type TypeTab = {
    id: number,
    title: string,
    value?: string,
    isNoti?: boolean
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
                        <Tab key={tab.id} value={tab.id} label={<> {tab.value ? tab.title + " " + tab.value : tab.title} {tab.isNoti && <Dot />}</>} />
                    )
                }
            </Tabs >
        </Box >
    )

}
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
        '&.Mui-selected': {
            color: 'text.secondary',
        }

    },
    '.MuiTabs-indicator': {
        backgroundColor: 'text.secondary',
    }

}
export default MyTabs;
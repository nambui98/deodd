import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { MyTabs2, TypeTab } from 'components/common/Tabs'
import MyImage from 'components/ui/image'
import React, { useState } from 'react'
import { BingoImage, LuckyImage, TicketImage } from 'utils/Images'

type Props = {}
enum TabEnum {
    RULES,
    PRIZE,
    PROVABLY_FAIR
}
const HowToPlay = (props: Props) => {
    const [valueTab, setValueTab] = useState<TabEnum>(TabEnum.RULES);
    const listTabs: TypeTab[] = [
        {
            id: TabEnum.RULES,
            title: "Rules",
        },
        {
            id: TabEnum.PRIZE,
            title: "Prize",
        },
        {
            id: TabEnum.PROVABLY_FAIR,
            title: "Provably Fair",
        },

    ];

    return (
        <Box>
            <Divider />
            <Typography variant='h5' fontWeight={700} mt={3}>How to play</Typography>
            <Grid container pt={3} columnSpacing={4} direction={'row'}>
                <Grid item xs={4}>
                    <Item image={TicketImage} title={'1. Buy a ticket'} description={'Buy ticket and pick 5 Numbers out of 25 1 Jackpot number out of 10'} />
                </Grid>
                <Grid item xs={4}>
                    <Item image={BingoImage} title={'2. Wait for the Draw'} description={'Wait for the draw at 15:00 UTC +0 every Money, Wednesday, and Friday'} />
                </Grid>
                <Grid item xs={4}>
                    <Item image={LuckyImage} title={'3. Check the results'} description={'Compare results and claim rewards'} />
                </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />

            <MyTabs2 listTabs={listTabs} value={valueTab} setValue={setValueTab} />

        </Box>
    )
}
const Item = ({ image, title, description }: { image: string, title: string, description: string }) => {
    return (
        <Stack direction={'row'} gap={2}>
            <MyImage src={image} width={80} minWidth={80} minHeight={80} height={80} alt="" />
            <Box>
                <Typography variant='h5' fontWeight={700}>{title}</Typography>
                <Typography mt={1} variant='body2' fontWeight={400}>{description}</Typography>
            </Box>
        </Stack>
    )
}

export default HowToPlay
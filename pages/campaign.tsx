import CampaignItem from '@/templates/campaign/CampaignItem'
import ClaimReward from '@/templates/campaign/ClaimReward'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import MyModal from '../components/common/Modal'
import MyTabs, { TypeTab } from '../components/common/Tabs'
import { CampaignImage, CampaignImage2, CampaignImage3 } from '../utils/Images'

type Props = {}

function Campaign({ }: Props) {
    // return (
    //     <Typography variant='h2' mx="auto" mt={4} textAlign={'center'}>
    //         Coming soon
    //     </Typography>
    // );

    const [openModal, setOpenModal] = useState(false);
    const [valueTab, setValueTab] = useState(1);
    const listTabs: TypeTab[] = [
        {
            id: 1,
            title: 'Ongoing',
            value: "(1)"
        },
        {
            id: 2,
            title: 'Ended',
            value: "(0)",
        },
        {
            id: 3,
            title: 'Claim reward',
            value: undefined,
            // isNoti: true
        },
    ]

    const MapTap: { [key: number]: JSX.Element } = {
        1: <>
            {/* <CampaignItem title='volume of bets campaign' time='24/12/2022' image={CampaignImage} /> */}
            {/* <CampaignItem title='win/lose streak campaign' time='24/12/2022' image={CampaignImage2} /> */}
            <CampaignItem title='Referral Campaign' time='24/12/2022' image={CampaignImage3} />

        </>,
        2: <Box>
            {/* <CampaignItem title='volume of bets campaign' time='24/12/2022' image={CampaignImage} />
            <CampaignItem title='win/lose streak campaign' time='24/12/2022' image={CampaignImage2} />
            <CampaignItem title='referral campaign' time='24/12/2022' image={CampaignImage3} /> */}
        </Box>,
        3: <Box width={1}>

            {/* <ClaimReward /> */}
        </Box>
    }

    return (
        <Box >

            <Box mx={2}>
                <Stack display={"grid"} mt={3} alignItems={"center"} justifyContent={"flex-start"} sx={{
                    width: { xs: 1, sm: 360, md: 544 },
                    mx: 'auto'
                }} columnGap={4}>
                    <MyTabs listTabs={listTabs} value={valueTab} setValue={setValueTab} />
                    {
                        MapTap[valueTab]
                    }
                </Stack >

            </Box>
            <MyModal open={openModal} title='Balance History' setOpen={setOpenModal} >
            </MyModal>
        </Box >
    );
}



export default Campaign
import CampaignItem from '@/templates/campaign/CampaignItem'
import ClaimReward from '@/templates/campaign/ClaimReward'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import MyModal from '../components/common/Modal'
import MyTabs, { TypeTab } from '../components/common/Tabs'
import { CampaignImage, CampaignImage2, CampaignImage3 } from '../utils/Images'

type Props = {}

function Campaign({ }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const [valueTab, setValueTab] = useState(1);
    const listTabs: TypeTab[] = [
        {
            id: 1,
            title: 'Ongoing',
            value: "(12)"
        },
        {
            id: 2,
            title: 'Ended',
            value: "(6)",
        },
        {
            id: 3,
            title: 'Claim reward',
            value: undefined,
            isNoti: true
        },
    ]
 
    const MapTap: { [key: number]: JSX.Element } = {
        1: <>
            <CampaignItem title='volume of bets campaign' time='24/12/2022' image={CampaignImage} />
            <CampaignItem title='win/lose streak campaign' time='24/12/2022' image={CampaignImage2} />
            <CampaignItem title='referral 0campaign' time='24/12/2022' image={CampaignImage3} />

        </>,
        2: <>
            <CampaignItem title='volume of bets campaign' time='24/12/2022' image={CampaignImage} />
            <CampaignItem title='win/lose streak campaign' time='24/12/2022' image={CampaignImage2} />
            <CampaignItem title='referral campaign' time='24/12/2022' image={CampaignImage3} />
        </>,
        3: <ClaimReward />
    }

    return (
        <Box>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>
                    <Typography variant='h2' textTransform={'uppercase'}>
                        CAMPAIGN
                    </Typography>
                </Container>
            </Box>
            <Stack display={"grid"} mt={3} alignItems={"center"} justifyContent={"center"} sx={{
            }} columnGap={4}>
                <MyTabs listTabs={listTabs} value={valueTab} setValue={setValueTab} />
                {
                    MapTap[valueTab]
                }
            </Stack >
            <MyModal open={openModal} title='Balance History' setOpen={setOpenModal} >
            </MyModal>
        </Box >
    );
}



export default Campaign
import CampaignItem from '@/templates/campaign/CampaignItem'
import ClaimReward from '@/templates/campaign/ClaimReward'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import MyModal from '../components/common/Modal'
import MyTabs, { TypeTab } from '../components/common/Tabs'
import { CampaignImage, CampaignImage2, CampaignImage3, CampaignImage4, ReferralImage, VolumeBannerImage, VolumeImage, WinLoseStreakBannerImage, WinLoseStreakImage } from '../utils/Images'
import ComingSoon from 'components/common/ComingSoon'

type Props = {}
export type Campaign = {
    id: number | string,
    href: string,
    label: string,
    isOpen: boolean,
    image: string,
    imageDetail: string
}

export const CAMPAIGNS: Campaign[] = [
    {
        id: 4,
        href: 'volume-campaign',
        label: 'Volume of Bets',
        isOpen: true,
        image: VolumeImage,
        imageDetail: VolumeBannerImage
    },
    {

        id: 3,
        href: 'testnet-campaign',
        label: 'Testnet Campaign',
        isOpen: false,
        image: CampaignImage4,
        imageDetail: CampaignImage4
    },
    {
        id: 1,
        href: 'winlose-streak-campaign',
        label: 'Win/Lose Streak Campaign',
        isOpen: true,
        image: WinLoseStreakImage,
        imageDetail: WinLoseStreakBannerImage
    },
    {
        id: 2,
        href: 'referral-campaign',
        label: 'Referral Campaign',
        isOpen: false,
        image: CampaignImage3,
        imageDetail: ReferralImage
    },
]

function Campaign({ }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const [valueTab, setValueTab] = useState(1);
    const campaigns_open = CAMPAIGNS.filter(campaign => campaign.isOpen)
    const campaigns_ended = CAMPAIGNS.filter(campaign => !campaign.isOpen)
    const listTabs: TypeTab[] = [
        {
            id: 1,
            title: 'Ongoing',
            value: `(${campaigns_open.length})`
        },
        {
            id: 2,
            title: 'Ended',
            value: `(${campaigns_ended.length})`
        },
        {
            id: 3,
            title: 'Claim reward',
            value: undefined,
            // isNoti: true
        },
    ]

    const MapTap: { [key: number]: JSX.Element } = {
        1: <Stack mt={3} divider={<Divider sx={{ my: 3, borderColor: '#2A2D3E', mx: 5 }} />}>
            {
                campaigns_open.map((campaign) =>
                    <CampaignItem key={campaign.id} title={campaign.label} time='24/12/2022' href={campaign.href} image={campaign.image} />
                )
            }
        </Stack>,
        2: <Stack mt={3} divider={<Divider sx={{ my: 3, borderColor: '#2A2D3E', mx: 5 }} />}>
            {
                campaigns_ended.map((campaign) =>
                    <CampaignItem key={campaign.id} title={campaign.label} time='24/12/2022' href={campaign.href} image={campaign.image} />
                )
            }
        </Stack>,
        3: <Box width={1}>

            {/* <ClaimReward /> */}
        </Box>
    }
    // return <ComingSoon hasCountDown={false} title={"Leaderboard </br> of Testnet's campaign"} subTitle='will be announced at 8 UTC June 30, 2023' />

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
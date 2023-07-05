import { Box, ButtonBase, MenuItem, Paper, Select, SelectChangeEvent, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { ButtonLoading, ButtonTertiary } from "../../ui/button";
import { ArrowLeftIcon, BnbIcon } from "utils/Icons";
import { BnbImage, CoinEmptyImage, MapIcon } from "utils/Images";
import MyImage from "components/ui/image";
import Campaign, { CAMPAIGNS } from "pages/campaign";
import { DeoddService } from "libs/apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useWalletContext } from "contexts/WalletContext";
import { Format } from "utils/format";
import { AxiosResponse } from "axios";
import { useSiteContext } from "contexts/SiteContext";
type rewardItem = {
    value: number,
    type: string,
}
export const CAMPAIGNS_FETCH: {
    id: string,
    label: string,
    fetch: (wallet: string) => Promise<AxiosResponse<any, any>>
}[] = [
        {
            id: 'FLIP_VOLUME',
            label: 'Volume of Bets',
            fetch: DeoddService.getTotalVolume
        },
        // {
        //     id: 'TESTNET',
        //     label: 'Testnet Campaign',
        //     fetch: DeoddService.getLeaderboardTestail
        // },
        {
            id: 'WIN_STREAK',
            label: 'Win Streak Campaign',
            fetch: DeoddService.getWinDashboard
        },
        {
            id: 'LOSE_STREAK',
            label: 'Lose Streak Campaign',
            fetch: DeoddService.getLoseDashboard
        },
        {
            id: 'TOP_REF',
            label: 'Referral Campaign',
            fetch: DeoddService.getLeaderboardReferral
        },
    ]
function createData(
    name: string,
    rewards: rewardItem[] | undefined,
    claimTime: string | undefined,
) {
    return { name, rewards, claimTime };
}
const ClaimReward: React.FC<any> = () => {
    const [valueSelect, setValueSelect] = useState<string>('');
    const [isShowHistory, setIsShowHistory] = useState<boolean>(false)
    const { walletAddress } = useWalletContext();
    const { setIsError, setIsSuccess, setTitleSuccess, setTitleError } = useSiteContext();

    const { data: dataReward, isFetching } = useQuery({
        queryKey: ["getCampaignDashboard", valueSelect],
        enabled: !!valueSelect,
        queryFn: () => CAMPAIGNS_FETCH.find(c => c.id === valueSelect)?.fetch(walletAddress),
        onSuccess(data) {
            if (data && data.data) {
            }
        },
        select: (data: any) => {
            if (data.status === 200) {
                return data.data.data.connectWallet;
            } else {
                return undefined
            }
        },
    });
    const { mutateAsync: claim, isLoading: claimLoading } = useMutation({
        mutationFn: () => {
            return DeoddService.claimCampaign(valueSelect)
        },
        onError(error: any) {
            setIsError(true)
            setTitleError(error.response?.data?.meta.error_message)
        },
        onSuccess() {
            setIsSuccess(true)
            setTitleSuccess("Claim successful");
        },
    });



    let rows = [
        createData('Win/Lose Streak Campaign', [
            {
                type: 'BNB',
                value: 2.523
            },
            {
                type: 'Bronze',
                value: 2
            },
            {
                type: 'Gold',
                value: 2
            },
            {
                type: 'Diamond',
                value: 3
            },
        ], '12/12/2022'),
        createData('Referral Campaign', [], undefined),
        createData('Volume of Bets Campaign', [{
            type: 'BNB',
            value: 2.523
        },], '12/12/2022'),
        createData('Win/Lose Streak Campaign', [], '12/12/2022'),
        createData('Win/Lose Streak Campaign', [], undefined),
    ];
    const handleClaim = () => {

    }
    return <Box mt={3} p={3} width={544} borderRadius={3} bgcolor={"secondary.300"}>
        {
            isShowHistory ? <Box>
                <ButtonBase onClick={() => setIsShowHistory(false)}>
                    <ArrowLeftIcon style={{ stroke: "#Fff" }} />
                    <Typography variant="body2" ml={1}>Claim history</Typography>
                </ButtonBase>
                <TableContainer sx={{ mt: 2, backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>campaign</TableCell>
                                <TableCell sx={{ textTransform: "uppercase" }} align="right">Reward</TableCell>
                                <TableCell sx={{ textTransform: "uppercase" }} align="right">Claim time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 && rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        'td, th': { border: 0, py: 1 }, 'th': {
                                            display: 'block'
                                        }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.rewards?.map((reward) =>
                                        <Stack key={reward.type} mt={1} direction={'row'} justifyContent={"flex-end"}>
                                            <Typography mr={.5}>{reward.value}</Typography>
                                            <img width={16} src={MapIcon[reward.type]} alt="" />
                                        </Stack>
                                    )}</TableCell>
                                    <TableCell sx={{ display: "block" }} align="right">{row.claimTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {
                        rows.length <= 0 &&
                        <Box mt={6} mb={12} display={'block'} textAlign={'center'}>
                            <img width={144} src={CoinEmptyImage} alt="" />
                            <Typography fontSize={16} color={"secondary.100"} mt={2}>Nothing here</Typography>
                        </Box>
                    }

                </TableContainer>
            </Box> :
                <>
                    <Stack direction={'row'} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant='body2' >
                            DeODD Campaign Claim Portal
                        </Typography>
                        <ButtonBase onClick={() => setIsShowHistory(true)}>
                            <Typography variant='body2' color="secondary.main">
                                History
                            </Typography>
                        </ButtonBase>
                    </Stack>
                    <Box mt={5}>
                        <Select
                            value={valueSelect}
                            placeholder='Select-'
                            onChange={(event: SelectChangeEvent) => { setValueSelect(event.target.value) }}
                            displayEmpty
                            sx={styleInput}
                            inputProps={{ 'aria-label': 'Select campaign' }}
                        >
                            <MenuItem disabled value={""}>
                                <Typography color={"secondary.100"}>Select-</Typography>
                            </MenuItem>
                            {
                                CAMPAIGNS_FETCH.map((c) => <MenuItem key={c.id} value={c.id}>{c.label}</MenuItem>)
                            }
                        </Select>
                        <Box py={3}>
                            {
                                valueSelect ?
                                    <Stack justifyContent={'center'} alignItems={'center'}>
                                        <Stack direction={'row'} gap={1} >
                                            {
                                                isFetching ?
                                                    <Skeleton variant="rounded" width={50} height={56} />
                                                    :
                                                    <Typography variant="h3" fontSize={"48px"}>{Format.formatMoney(dataReward?.reward ?? 0)}</Typography>
                                            }
                                            <MyImage width={40} src={BnbImage} alt="" />
                                        </Stack>
                                    </Stack>
                                    :
                                    <Typography variant='body2' textAlign={'center'} color={"secondary.200"}> Select campaign to show your reward</Typography>
                            }
                        </Box>
                        <ButtonLoading
                            loading={claimLoading}
                            disabled={isFetching || !valueSelect || !dataReward?.reward}
                            sx={{ textTransform: 'none', py: 2 }}
                            onClick={() => claim()}
                        >
                            Claim reward
                        </ButtonLoading>
                    </Box >
                </>
        }

    </Box >
}
const styleInput = {
    backgroundColor: "background.paper",
    border: '0px solid',
    borderColor: 'background.paper',
    borderRadius: 2,
    '.MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    width: "100%",
    fontSize: 16,

    bgcolor: 'background.default',
    'div': {
        py: "12px",
        fontSize: 16,
    }

}
export default ClaimReward;
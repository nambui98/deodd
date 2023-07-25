import { Box, ButtonBase, MenuItem, Paper, Select, SelectChangeEvent, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { ButtonLoading, ButtonTertiary } from "../../ui/button";
import { ArrowLeftIcon, BnbIcon } from "utils/Icons";
import { BnbImage, Bronze2Image, BronzeImage, CoinEmptyImage, MapIcon } from "utils/Images";
import MyImage from "components/ui/image";
import Campaign, { CAMPAIGNS } from "pages/campaign";
import { DeoddService } from "libs/apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useWalletContext } from "contexts/WalletContext";
import { Format } from "utils/format";
import { AxiosResponse } from "axios";
import { useSiteContext } from "contexts/SiteContext";
import { useContractRead, useContractWrite } from "wagmi";
import { claimAllStarContract, claimNFT, claimRefContract } from "libs/contract";
import { BigNumber, ethers } from "ethers";
import { DateClaimCampaign } from "constants/index";
import { isAfter, isBefore } from "date-fns";
type rewardItem = {
    value: number,
    type: string,
}
export const CAMPAIGNS_FETCH: {
    id: string,
    label: string,
    fetch: (wallet: string, type?: string) => Promise<AxiosResponse<any, any>>
}[] = [
        {
            id: 'FLIP_VOLUME',
            label: 'Volume of Bets',
            fetch: DeoddService.getTotalVolume
        },
        {
            id: 'TESTNET',
            label: 'DeODD Testnet All-Stars',
            fetch: DeoddService.getInfoClaimCampaign
        },
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
            label: 'DeODD Testnet Referral',
            fetch: DeoddService.getInfoClaimCampaign
        },
        {
            id: 'NFT_AIRDROP',
            label: 'DeODD Airdrop NFT',
            fetch: DeoddService.getInfoClaimCampaign
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
    const [isLoadingClaim, setIsLoadingClaim] = useState<boolean>(false)
    const { handleConnectWallet, isConnectingWallet, walletIsConnected } = useWalletContext();
    const { walletAddress } = useWalletContext();
    const { setIsError, setIsSuccess, setTitleSuccess, setTitleError } = useSiteContext();
    const { data: histories, isFetching: isFetchingHistory } = useQuery({
        queryKey: ["getClaimHistory", isShowHistory],
        enabled: isShowHistory,
        queryFn: () => DeoddService.getClaimHistory(),
        select: (data: any) => {
            if (data.status === 200) {
                return data.data.data;
            } else {
                return undefined
            }
        },
    });

    const isClosed = isAfter(new Date(), new Date(DateClaimCampaign.end));
    const isUnOpened = isBefore(new Date(), new Date(DateClaimCampaign.start));

    console.log(isAfter(new Date(), new Date(DateClaimCampaign.start)));

    const { data: dataReward, isFetching, refetch: refetchMyInfoCampaign } = useQuery({
        queryKey: ["getCampaignDashboard", valueSelect],
        enabled: !!valueSelect,
        queryFn: () => CAMPAIGNS_FETCH.find(c => c.id === valueSelect)?.fetch(walletAddress, valueSelect),
        refetchOnWindowFocus: false,
        select: (data: any) => {
            if (data.status === 200) {
                debugger
                const connectWallet = data.data?.data?.connectWallet;
                const result = {
                    ...connectWallet,
                    reward: connectWallet?.reward || connectWallet?.winStreakReward || connectWallet?.winStreakReward || data.data.amount,
                    isConnectWalletClaimed: data.data?.data?.isConnectWalletClaimed ?? false,
                    proof: data.data?.proof
                }
                return result;
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
            refetchMyInfoCampaign();
            setIsSuccess(true)
            setTitleSuccess("Claim successful");
        },
    });
    console.log(ethers.utils.parseUnits('0.1'));
    const handleClaim = () => {
        setIsLoadingClaim(true)
        if (valueSelect === 'TESTNET') {
            claimAllStar?.()
                .then(resWrite => {
                    return resWrite.wait();
                })
                .then((res) => {
                    refetchClaimAble();
                })
                .catch(error => {
                    setIsLoadingClaim(false);
                    setIsError(true);
                    setTitleError(error.reason || 'Something went wrong');
                }).finally(() => {
                    setIsLoadingClaim(false);
                })

        }
        else if (valueSelect === "TOP_REF") {
            claimRef?.()
                .then(resWrite => {
                    return resWrite.wait();
                })
                .then((res) => {

                    refetchClaimAble();
                })
                .catch(error => {
                    setIsLoadingClaim(false);
                    setIsError(true);
                    setTitleError(error.reason || 'Something went wrong');
                }).finally(() => {
                    setIsLoadingClaim(false);
                })
        } else if (valueSelect === "NFT_AIRDROP") {
            claimNFTDROP?.()
                .then(resWrite => {
                    return resWrite.wait();
                })
                .then((res) => {
                    refetchClaimAble();
                })
                .catch(error => {
                    setIsLoadingClaim(false);
                    setIsError(true);
                    setTitleError(error.reason || 'Something went wrong');
                }).finally(() => {
                    setIsLoadingClaim(false);
                })
        } else {
            claim()
        }
    }
    const { writeAsync: claimNFTDROP, isLoading: isLoadingNFTDROP } = useContractWrite({
        address: claimNFT.address,
        mode: 'recklesslyUnprepared',
        abi: claimNFT.abi,
        functionName: 'claim',
        onError(error: any, variables, context) {
            debugger
            setIsError(true)
            setTitleError(error.reason || 'Something wend wrong.');
        },
        args: [walletAddress, valueSelect === "NFT_AIRDROP" ? BigNumber.from(dataReward?.reward ?? '0') : 0, dataReward?.proof ?? '']
    })
    const { writeAsync: claimAllStar, isLoading: isLoadingStar } = useContractWrite({
        address: claimAllStarContract.address,
        mode: 'recklesslyUnprepared',
        abi: claimAllStarContract.abi,
        functionName: 'claim',
        onError(error: any, variables, context) {
            setIsError(true)
            debugger
            setTitleError(error.reason || 'Something wend wrong.');
        },
        args: [walletAddress, ethers.utils.parseUnits(dataReward?.reward ?? '0'), dataReward?.proof ?? '']
    })
    const { writeAsync: claimRef, isLoading: isLoadingRef } = useContractWrite({
        address: claimRefContract.address,
        mode: 'recklesslyUnprepared',
        abi: claimRefContract.abi,
        functionName: 'claim',

        args: [walletAddress, ethers.utils.parseUnits(dataReward?.reward ?? '0'), dataReward?.proof ?? '']
    })

    const { refetch: refetchClaimAble, data: dataClaimable } = useContractRead({
        address: valueSelect === "TESTNET" ? claimAllStarContract.address : valueSelect === "TOP_REF" ? claimRefContract.address : valueSelect === "NFT_AIRDROP" ? claimNFT.address : undefined,
        abi: claimRefContract.abi,
        functionName: 'claimable',
        args: [walletAddress],
        enabled: !!walletAddress && (valueSelect === "TOP_REF" || valueSelect === "TESTNET" || valueSelect === "NFT_AIRDROP"),
    })

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
    if (!walletIsConnected) {
        return <Box p={3} mt={3} mx="auto" sx={{ display: 'flex', justifyContent: 'center' }} width={{ md: 544 }} borderRadius={3} bgcolor={"secondary.300"}>
            <ButtonLoading
                onClick={handleConnectWallet}
                sx={{
                    px: 5, py: 2,
                    mx: 'auto',
                    borderRadius: 2,
                    width: 'auto',
                    textTransform: 'none',
                }}
                loading={isConnectingWallet}>
                <Typography variant='body2' fontSize={16} fontWeight={600} >Connect wallet</Typography>
            </ButtonLoading>
        </Box>

    }
    return <Box mt={3} p={3} mx="auto" width={{ md: 544 }} borderRadius={3} bgcolor={"secondary.300"}>
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
                            {histories?.length > 0 && histories.map((row: any) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        'td, th': { border: 0, py: 1 }, 'th': {
                                            display: 'block'
                                        }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {CAMPAIGNS_FETCH.find((cp) => cp.id === row.historyInfo.campaignType)?.label}
                                    </TableCell>
                                    <TableCell align="right">{
                                        Format.formatMoneyFromBigNumberEther(row.changedBalance)
                                        // row.rewards?.map((reward) =>
                                        //     <Stack key={reward.type} mt={1} direction={'row'} justifyContent={"flex-end"}>
                                        //         <Typography mr={.5}>{reward.value}</Typography>
                                        //         <img width={16} src={MapIcon[reward.type]} alt="" />
                                        //     </Stack>
                                        // )
                                    } BNB</TableCell>
                                    <TableCell sx={{ display: "block" }} align="right">{Format.formatDateTimeAlt(row.createdAt, 'UTC', 'dd/MM/yyyy')}</TableCell>
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
                                            {
                                                valueSelect !== "NFT_AIRDROP" ?

                                                    <MyImage width={40} src={BnbImage} alt="" />
                                                    :
                                                    <MyImage width={40} src={BronzeImage} alt="" />
                                            }
                                        </Stack>
                                    </Stack>
                                    :
                                    <Typography variant='body2' textAlign={'center'} color={"secondary.200"}> Select campaign to show your reward</Typography>
                            }
                        </Box>
                        {
                            isUnOpened &&
                            <ButtonLoading
                                disabled
                                sx={{ textTransform: 'none', py: 2 }}
                            >
                                Unopened
                            </ButtonLoading>
                        }
                        {
                            isClosed && <Stack gap={2}>
                                <ButtonLoading
                                    disabled
                                    sx={{ textTransform: 'none', py: 2 }}
                                >
                                    Expired
                                </ButtonLoading>
                                <Typography variant="caption" textAlign={'center'} color="error.300">You are no longer able to receive this reward since the claim time has expired</Typography>
                            </Stack>
                        }
                        {
                            isClosed === false && isUnOpened === false &&
                            <ButtonLoading
                                loading={claimLoading || isLoadingClaim}
                                disabled={isFetching || !valueSelect || dataClaimable === false || !dataReward?.reward || dataReward?.isConnectWalletClaimed || parseFloat(dataReward?.reward ?? 0) <= 0}
                                sx={{ textTransform: 'none', py: 2 }}
                                onClick={() => handleClaim()}
                            >
                                {
                                    (dataReward?.isConnectWalletClaimed
                                        ||
                                        (dataClaimable === false && parseFloat(dataReward?.reward) > 0)
                                    ) ? 'Claimed' : "Claim reward"
                                }
                            </ButtonLoading>
                        }

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
import vhIdRequest from "@/utils/vhIdRequest"
import { ReferralApis } from "./referral"
import { AuthApis } from "./auth"
import { ChatApis } from "./chat"
import { getCurrentIp } from "./ip"
import { ShopApis } from "./shop"
import { EnumNFT } from "libs/types"
import axios from "axios"

const baseURL =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
        ? '/deodd'
        : process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION'
            ? '/deodd' : ''
const saveInfoUser = async (body: object) => {
    return vhIdRequest({
        url: baseURL + `/users/information`,
        method: 'put',
        data: body
    })
}

const getUserByPublicAddress = async (wallet: string) => {
    return vhIdRequest({
        url: baseURL + `/users/fetch?address=${wallet}`,
        method: 'get',
    })
}

const getRecentFlipping = async () => {
    return vhIdRequest({
        url: baseURL + `/recent`,
        method: 'get',
    })
}
const getAssetsBalance = async (address: string) => {
    return vhIdRequest({
        url: baseURL + `/assets/balance?wallet=${address}`,
        method: 'get',
    })
}
const getBalanceHistories = async (address: string) => {
    return vhIdRequest({
        url: baseURL + `/spending?wallet=${address}`,
        method: 'get',
    })
}
const claimTokenSpending = async () => {
    return vhIdRequest({
        url: baseURL + `/jackpot/claim`,
        method: 'post',
        data: {}
    })
}
const getResultByFlipId = async (flipId: string | number) => {
    return vhIdRequest({
        url: baseURL + `/users/flip?flipId=${flipId}`,
        method: 'get',
    })
}
const getUserTestail = async () => {
    return vhIdRequest({
        url: baseURL + `/users/testail`,
        method: 'get',
    })
}
const getWinLoseStreak = async (wallet: string) => {
    return vhIdRequest({
        url: baseURL + `/dashboard/streak?wallet=${wallet}`,
        method: 'get',
    })
}
const getTotalVolume = async (wallet: string) => {
    return vhIdRequest({
        url: baseURL + `/dashboard/volume?wallet=${wallet}`,
        method: 'get',
    })
}
const getNFTDetailById = async (id: string | number) => {
    return vhIdRequest({
        url: baseURL + `/nft-item/${id}`,
        method: 'get',
    })
}
const caculateEstProfit = async ({ typeNft, duration }: { typeNft: EnumNFT, duration: number }) => {
    return await vhIdRequest({
        url: baseURL + `/nft-item/staking/calculate`,
        method: 'POST',
        data: {
            duration,
            itemType: typeNft
        }
    })
}
const stakeNft = async (tokenId: string | number) => {
    return await vhIdRequest({
        url: baseURL + `/users/nft/stake`,
        method: 'POST',
        data: {
            tokenId: tokenId
        }
    })
}
const getCurrentPool = () => {
    return vhIdRequest({
        url: baseURL + `/nft/staking/current-pool`,
        method: 'GET',

    })
}
const getPoolsAndRewardsByUser = () => {
    return vhIdRequest({
        url: baseURL + `/nft/staking/pools`,
        method: 'GET',

    })
}
const getNFTStaked = async (poolId: string | number) => {
    return await vhIdRequest({
        url: baseURL + `/nft/staking/nft-staked?poolId=${poolId}`,
        method: 'GET',

    })
}
const getReferralDashboard = async () => {
    return await vhIdRequest({
        url: baseURL + `/dashboard/referral`,
        method: 'GET',
    })
}
const getTestnetDashboard = async () => {
    return await vhIdRequest({
        url: baseURL + `/dashboard/testail-point`,
        method: 'GET',
    })
}
const getFlipVolumeDashboard = async () => {
    return await vhIdRequest({
        url: baseURL + `/dashboard/volume`,
        method: 'GET',
    })
}
const getWinDashboard = async (wallet: string) => {
    return await vhIdRequest({
        url: baseURL + `/dashboard/streak/win?wallet=${wallet}`,
        method: 'GET',
    })
}
const getLoseDashboard = async (wallet: string) => {
    return await vhIdRequest({
        url: baseURL + `/dashboard/streak/lose?wallet=${wallet}`,
        method: 'GET',
    })
}
const claimCampaign = async (campaignType: string) => {
    return await vhIdRequest({
        url: baseURL + `/campaign/claim`,
        method: 'POST',
        data: {
            campaignType
        }
    })
}
const checkIsWalletJoinStaking = async () => {
    return await vhIdRequest({
        url: baseURL + `/nft/staking/is-joined`,
        method: 'GET',
    })
}

const getClaimHistory = async () => {
    return await vhIdRequest({
        url: baseURL + `/campaign/history`,
        method: 'GET',
    })
}
const getInfoClaimCampaign = async (walletAddress: string, type?: string) => {
    return axios.get(
        `/api/campaign/claim/${walletAddress}/${type}`)
}
const claimStaking = async (data: { poolId: string }) => {
    return await vhIdRequest({
        url: baseURL + `/staking/claim`,
        method: 'POST',
        data: JSON.stringify(
            data
        )
    })
}

const getMyTicket = async ({ limit, offset, drawId }: { limit: number, offset: number, drawId: string | null }) => {
    return await vhIdRequest({
        url: baseURL + `/lottery/tickets`,
        method: 'POST',
        data: drawId !== 'all' ? {
            limit,
            offset,
            drawId
        } : {
            limit,
            offset,
        }
    })
}
const getClaimableTickets = async () => {
    return await vhIdRequest({
        url: baseURL + `/lottery/ticket/claim`,
        method: 'GET',
    })
}
const claimLotteryPrize = async (sIds: (number | string)[]) => {
    return await vhIdRequest({
        url: baseURL + `/lottery/ticket/claim`,
        method: 'POST',
        data: { sIds }
    })
}
const claimAllLotteryPrize = async () => {
    return await vhIdRequest({
        url: baseURL + `/lottery/ticket/claim/all`,
        method: 'POST',
        data: {}
    })
}
const getCurrentLottery = async () => {
    return await vhIdRequest({
        url: baseURL + `/lottery/current`,
        method: 'GET',
    })
}

const getWinnerList = async ({ page, size, drawId }: { page: number, size: number, drawId: string | null }) => {
    return await vhIdRequest({
        url: baseURL + `/lottery/results`,
        method: 'GET',
        params: drawId !== "all" ? {
            page, size, drawId
        } : { page, size }

    })
}
const getJackpotWinner = async ({ page, size }: { page: number, size: number }) => {
    return await vhIdRequest({
        url: baseURL + `/lottery/jackpot/winners`,
        method: 'GET',
        params: { page, size }
    })
}
const getListJackpot = async ({ page, size }: { page: number, size: number }) => {
    return await vhIdRequest({
        url: baseURL + `/lotteries`,
        method: 'GET',
        params: {
            page, size
        }

    })
}

const getLotteryResultByDrawId = async ({ drawId }: { drawId: string | null }) => {
    return await vhIdRequest({
        url: baseURL + `/lottery/result`,
        method: 'GET',
        params: {
            drawId
        }

    })
}
export const DeoddService = {
    ...ReferralApis,
    ...AuthApis,
    ...ChatApis,
    ...ShopApis,
    claimAllLotteryPrize,
    getClaimableTickets,
    claimLotteryPrize,
    getLotteryResultByDrawId,
    getJackpotWinner,
    getListJackpot,
    getWinnerList,
    claimStaking,
    getInfoClaimCampaign,
    getNFTDetailById,
    getUserTestail,
    saveInfoUser,
    getRecentFlipping,
    getAssetsBalance,
    getBalanceHistories,
    getUserByPublicAddress,
    claimTokenSpending,
    getResultByFlipId,
    getCurrentIp,
    getWinLoseStreak,
    getTotalVolume,
    caculateEstProfit,
    stakeNft,
    getNFTStaked,
    getCurrentPool,
    getPoolsAndRewardsByUser,
    getReferralDashboard,
    getTestnetDashboard,
    getFlipVolumeDashboard,
    getWinDashboard,
    getLoseDashboard,
    claimCampaign,
    checkIsWalletJoinStaking,
    getClaimHistory,
    getMyTicket,
    getCurrentLottery
}
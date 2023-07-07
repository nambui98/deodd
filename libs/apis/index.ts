import vhIdRequest from "@/utils/vhIdRequest"
import { ReferralApis } from "./referral"
import { AuthApis } from "./auth"
import { ChatApis } from "./chat"
import { getCurrentIp } from "./ip"
import { ShopApis } from "./shop"
import { EnumNFT } from "libs/types"

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
export const DeoddService = {
    ...ReferralApis,
    ...AuthApis,
    ...ChatApis,
    ...ShopApis,
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
    checkIsWalletJoinStaking
}
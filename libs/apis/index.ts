import vhIdRequest from "@/utils/vhIdRequest"
import { ReferralApis } from "./referral"
import { AuthApis } from "./auth"
import { ChatApis } from "./chat"
import { getCurrentIp } from "./ip"
import { ShopApis } from "./shop"

const baseURL =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
        ? '/deodd'
        : process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION'
            ? '/deodd-pretest' : ''
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
    getTotalVolume
}
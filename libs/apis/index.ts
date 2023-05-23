import vhIdRequest from "@/utils/vhIdRequest"
import { ReferralApis } from "./referral"
import { AuthApis } from "./auth"
import { ChatApis } from "./chat"
import { getCurrentIp } from "./ip"

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
const getLeaderboardReferral = async (walletAddress: string | number) => {
    debugger
    return vhIdRequest({
        url: baseURL + `/dashboard/referral?wallet=${walletAddress}`,
        method: 'GET',
    })
}
export const DeoddService = {
    ...ReferralApis,
    ...AuthApis,
    ...ChatApis,
    saveInfoUser,
    getRecentFlipping,
    getAssetsBalance,
    getBalanceHistories,
    getUserByPublicAddress,
    claimTokenSpending,
    getResultByFlipId,
    getCurrentIp,
    getLeaderboardReferral
}
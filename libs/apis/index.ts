import vhIdRequest from "@/utils/vhIdRequest"
import { ReferralApis } from "./referral"
import { AuthApis } from "./auth"

const saveInfoUser = async (body: object) => {
    return vhIdRequest({
        url: `/users/information`,
        method: 'put',
        data: body
    })
}

const getUserByPublicAddress = async (wallet: string) => {
    return vhIdRequest({
        url: `/users/fetch?address=${wallet}`,
        method: 'get',
    })
}

const getRecentFlipping = async () => {
    return vhIdRequest({
        url: `/recent`,
        method: 'get',
    })
}
const getAssetsBalance = async (address: string) => {
    return vhIdRequest({
        url: `/assets/balance?wallet=${address}`,
        method: 'get',
    })
}
const getBalanceHistories = async (address: string) => {
    return vhIdRequest({
        url: `/spending?wallet=${address}`,
        method: 'get',
    })
}
const claimTokenSpending = async () => {
    return vhIdRequest({
        url: `/jackpot/claim`,
        method: 'post',
        data: {}
    })
}
export const DeoddService = {
    ...ReferralApis,
    ...AuthApis,
    saveInfoUser,
    getRecentFlipping,
    getAssetsBalance,
    getBalanceHistories,
    getUserByPublicAddress,
    claimTokenSpending
}
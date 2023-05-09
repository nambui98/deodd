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
export const DeoddService = {
    ...ReferralApis,
    ...AuthApis,
    saveInfoUser,
    getRecentFlipping,
    getAssetsBalance,
    getBalanceHistories
}
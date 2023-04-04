import vhIdRequest from "@/utils/vhIdRequest"

const saveInfoUser = async (body: object) => {
    return vhIdRequest({
        url: `/users/information`,
        method: 'put',
        data: body
    })
}
const checkUserReferral = async (address: string) => {
    return vhIdRequest({
        url: `/users/ref/checkref?address=${address}`,
        method: 'get'
    })
}
const getReferralRewardAvailable = async (address: string) => {
    return vhIdRequest({
        url: `/users/ref/available?wallet=${address}`,
        method: 'get'
    })
}
const getReferralRewardExpired = async (address: string) => {
    return vhIdRequest({
        url: `/users/ref/expired?wallet=${address}`,
        method: 'get'
    })
}
const checkUserIsValidForReferral = async (body: any) => {
    return vhIdRequest({
        url: `/users/ref/check`,
        method: 'post',
        data: body
    })
}
const findGenerateReferralLinkByWallet = async (address: string, body: any) => {
    return vhIdRequest({
        url: `/users/ref/findLink?address=${address}`,
        method: 'post',
        data: body
    })
}
const generateReferralLink = async () => {
    return vhIdRequest({
        url: `/users/ref/generate`,
        method: 'post'
    })
}
export const DeoddService = {
    generateReferralLink,
    checkUserIsValidForReferral,
    getReferralRewardExpired,
    findGenerateReferralLinkByWallet,
    getReferralRewardAvailable,
    saveInfoUser,
    checkUserReferral
}
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
const checkUserIsValidForReferral = async (address: string) => {
    return vhIdRequest({
        url: `/users/ref/check?address=${address}`,
        method: 'get',
    })
}
const findGenerateReferralLinkByWallet = async (address: string) => {
    return vhIdRequest({
        url: `/users/ref/findLink?address=${address}`,
        method: 'get',
    })
}
const generateReferralLink = async (address: string) => {
    return vhIdRequest({
        url: `/users/ref/generate`,
        method: 'put',
        data: JSON.stringify({ wallet: address })
    })
}
const confirmReferralForUser = async (body: any) => {
    return vhIdRequest({
        url: `/users/ref/confirm`,
        method: 'post',
        data: JSON.stringify(body)
    })
}
const ClaimReferral = async (address: string) => {
    return await vhIdRequest({
        url: `/users/ref/claim`,
        method: 'post',
        data: JSON.stringify({
            wallet: address
        })
    })
}
 const getRecentFlipping = async () => {
  return vhIdRequest({
    url: `/recent`,
    method: 'get',
  })
}
export const DeoddService = {
    generateReferralLink,
    checkUserIsValidForReferral,
    getReferralRewardExpired,
    findGenerateReferralLinkByWallet,
    getReferralRewardAvailable,
    saveInfoUser,
    checkUserReferral,
    confirmReferralForUser,
    ClaimReferral,
    getRecentFlipping
}
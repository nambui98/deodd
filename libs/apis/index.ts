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

export const DeoddService = {
    ...ReferralApis,
    ...AuthApis,
    saveInfoUser,
    getRecentFlipping
}
import vhIdRequest from "@/utils/vhIdRequest"

export const saveInfoUser = async (body: object) => {
    return vhIdRequest({
        url: `/users/information`,
        method: 'put',
        data: body
    })
}
export const DeoddService = {
    saveInfoUser
}
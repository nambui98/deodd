import vhIdRequest from "@/utils/vhIdRequest"

const getUserNonce = async (address: string) => {
    return await vhIdRequest({
        url: `/deodd/users/nonce/fetch?wallet=${address}`,
        method: 'GET',
    })
}
const loginWithWallet = async ({ wallet, signature }: { wallet: string, signature: string }) => {
    return await vhIdRequest({
        url: `/deodd/users/auth?grant_type=wallet_address`,
        method: 'POST',
        data: JSON.stringify({
            wallet,
            signature
        })
    })
}
const signUp = async ({ wallet }: { wallet: string }) => {
    return await vhIdRequest({
        url: `/deodd/users/signup?wallet=${wallet}`,
        method: 'POST',
        data: {}
    })
}
const refreshToken = async () => {
    return await vhIdRequest({
        url: `/deodd/users/auth?grant_type=refresh`,
        method: 'POST',
        data: JSON.stringify({
            refreshToken: localStorage.getItem('refresh_token'),
        })
    })
}
export const AuthApis = {
    getUserNonce,
    loginWithWallet,
    refreshToken,
    signUp
}
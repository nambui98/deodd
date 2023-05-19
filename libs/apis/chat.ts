import vhIdRequest from "@/utils/vhIdRequest"

const baseURLChat = '/dejaw'
const sendMessage = async ({ from, content }: { from: string, content: string }) => {
    return await vhIdRequest({
        url: baseURLChat + `/message`,
        method: 'POST',
        data: JSON.stringify({
            from: from,
            content: content
        })
    })
}
const getMessagesWithAuth = async ({ limit, lastCreatedAt }: { limit: number, lastCreatedAt: null | string }) => {
    return await vhIdRequest({
        url: baseURLChat + `/messages`,
        method: 'POST',
        data: JSON.stringify({
            limit,
            lastCreatedAt
        })
    })
}
const getMessagesWithoutAuth = async () => {
    return await vhIdRequest({
        url: baseURLChat + `/message`,
        method: 'GET',
    })
}
const reportMessage = async () => {
    return await vhIdRequest({
        url: baseURLChat + `/pinned-message`,
        method: 'GET',
    })
}
const getPinnedMessages = async () => {
    return await vhIdRequest({
        url: baseURLChat + `/pinned-message`,
        method: 'GET',
    })
}
export const ChatApis = {
    getMessagesWithAuth,
    getMessagesWithoutAuth,
    sendMessage,
    reportMessage,
    getPinnedMessages
}
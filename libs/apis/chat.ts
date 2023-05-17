import vhIdRequest from "@/utils/vhIdRequest"

const baseURLChat = '/dejaw'
const sendMessage = async ({ from, content }: { from: string, content: string }) => {
    debugger
    return await vhIdRequest({
        url: baseURLChat + `/message`,
        method: 'POST',
        data: JSON.stringify({
            from: from,
            content: content
        })
    })
}
const getMessages = async ({ limit }: { limit: number }) => {
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
    getMessages,
    sendMessage,
    reportMessage,
    getPinnedMessages
}
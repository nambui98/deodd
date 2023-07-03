import vhIdRequest from "@/utils/vhIdRequest"

const baseURLChat = '/dejaw'
const sendMessage = async ({ from, to, repliedTo, content }: { from: string, to: string | undefined, repliedTo: string | undefined, content: string }) => {
    return await vhIdRequest({
        url: baseURLChat + `/message`,
        method: 'POST',
        data: JSON.stringify({
            from: from,
            content: content,
            to,
            repliedTo
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
const getMessagesWithoutAuth = async (isLoadMore: boolean) => {
    return await vhIdRequest({
        url: baseURLChat + `/message` + (isLoadMore ? '?limit=10' : ''),
        method: 'GET',
    })
}
const reportMessage = async (data: { messageId: string, type: string }) => {
    return await vhIdRequest({
        url: baseURLChat + `/message/report`,
        method: 'POST',
        data: JSON.stringify(
            data
        )
    })
}
const undoReportMessage = async (data: { messageId: string }) => {
    return await vhIdRequest({
        url: baseURLChat + `/message/report/undo`,
        method: 'POST',
        data: JSON.stringify(
            data
        )
    })
}
const getPinnedMessages = async () => {
    return await vhIdRequest({
        url: baseURLChat + `/pinned-message`,
        method: 'GET',
    })
}
const blockUser = async (data: { wallet: string }) => {
    return await vhIdRequest({
        url: baseURLChat + `/block`,
        method: 'POST',
        data: JSON.stringify(
            data
        )
    })
}
const unBlockUser = async (data: { wallet: string }) => {
    return await vhIdRequest({
        url: baseURLChat + `/unblock`,
        method: 'POST',
        data: JSON.stringify(
            data
        )
    })
}
const getBlockList = async ({ page = 1, size = 15 }: { page: number, size: number }) => {
    return await vhIdRequest({
        url: baseURLChat + `/block-list?page=${page}&size=${size}`,
        method: 'GET',

    })
}
export const ChatApis = {
    getMessagesWithAuth,
    getMessagesWithoutAuth,
    sendMessage,
    reportMessage,
    getPinnedMessages,
    undoReportMessage,
    getBlockList,
    blockUser,
    unBlockUser
}
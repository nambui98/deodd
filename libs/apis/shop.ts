import vhIdRequest from "@/utils/vhIdRequest"
const baseURL =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
        ? '/deodd'
        : process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION'
            ? '/deodd-pretest' : ''
const getShopList = async ({
    limit,
    offset,
    sortType,
    sortOrder,
    minPrice,
    maxPrice,
    itemType
}: {
    limit: number,
    offset: number,
    sortType: string,
    sortOrder: string,
    minPrice: number,
    maxPrice: number,
    itemType: any
}) => {
    return vhIdRequest({
        url: baseURL + `/shop?limit=${limit}&offset=${offset}&sortType=${sortType}&sortOrder=${sortOrder}&minPrice=${minPrice}&maxPrice=${maxPrice}
        &itemType=${itemType?.ALL === true ? 'BRONZE,GOLD,DIAMOND' :
                Object.keys(itemType).join(',')}`,
        method: 'GET',
    })
}
const getShopDetailItem = async (id: string | number) => {
    return vhIdRequest({
        url: baseURL + `/shop/item/${id}`,
        method: 'GET',
    })
}
const getSuggestion = async (limit: number) => {
    return vhIdRequest({
        url: baseURL + `/shop/suggestion?limit=${limit}`,
        method: 'GET',
    })
}
export const ShopApis = {
    getShopList,
    getShopDetailItem,
    getSuggestion
}
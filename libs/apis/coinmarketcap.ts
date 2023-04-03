import vhIdRequest from "@/utils/vhIdRequest"
import axios from "axios";
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
export const getPriceToken = async () => {
    console.log(serverRuntimeConfig.COIN_MARKETCAP_API_KEY)
    return axios.get(
        `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=BNB&convert=BUSD`, {
        headers: {
            'X-CMC_PRO_API_KEY': '0dd01359-af6f-47f4-9857-f4a5d1592ee7'
        }
    })
}
import axios from "axios";
export const getPriceToken = async () => {
    return axios.get(
        `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=BNB&convert=BUSD`, {
        headers: {
            'X-CMC_PRO_API_KEY': '0dd01359-af6f-47f4-9857-f4a5d1592ee7'
        }
    })
}
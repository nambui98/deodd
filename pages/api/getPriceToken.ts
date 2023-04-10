// import cache from '../../libs/cache.js'
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

var cache = require('memory-cache');
type Data = {
    data: any
}
export default async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    const key = 'priceToken';
    let data = await cache.get(key);
    if (!data) {
        data = await axios.get(
            `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=BNB&convert=BUSD`, {
            headers: {
                'X-CMC_PRO_API_KEY': '0dd01359-af6f-47f4-9857-f4a5d1592ee7'
            }
        })
        data = await data.data;
        // Set cache refresh after 30 minutes
        await cache.put(key, data, 1800000);
    }

    res.status(200).json(data);
};
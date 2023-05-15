import axios from "axios";
export const getPriceToken = async () => {
    return axios.get(
        `/api/getPriceToken`)
}
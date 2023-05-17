import axios from "axios";
export const getCurrentIp = async () => {
    return axios.get(
        `http://ip-api.com/json/?fields=status,message,country,countryCode,query`)
}
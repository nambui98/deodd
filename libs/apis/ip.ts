import axios from "axios";
export const getCurrentIp = async () => {
    return axios.get(
        `https://api.country.is/`)
}
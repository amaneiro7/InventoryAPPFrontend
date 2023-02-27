import axios from "axios";
import { getApiUrl } from "./config";

axios.defaults.baseURL = getApiUrl

export const createItems = async (path, data) => {
    const response = await axios.post(path, data);
    return response
}
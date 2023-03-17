import axios from "axios";
import { getApiUrl } from "./config";

export const createItems = async ({path, data}) => await axios.post(path, data)

export const getAllItems = ({endPoint}) => axios.get(`${getApiUrl}/${endPoint}`).then(res => res.data);

export const getOneItem = async ({path}) => await axios.get(path)

export const updateItem = async ({path, data}) => await axios.patch(path, data)

export const deleteItem = async ({path}) => await axios.delete(path)
import axios from "axios";
import { getApiUrl } from "./config";

export const createItems = async ({path, data}) => await axios.post(path, data)

export const getAllItems = ({endPoint}) => axios.get(`${getApiUrl}/${endPoint}`).then(res => res.data);

export const getOneItem = async ({endPoint, id}) => await axios.get(`${getApiUrl}/${endPoint}/${id}`).then(res => res.data)

export const updateItem = async ({path, data}) => await axios.patch(path, data)

export const deleteItem = async ({path}) => await axios.delete(path)
import axios from "axios";

export const createItems = async ({path, data}) => await axios.post(path, data)

export const getAllItems = async ({path}) =>  await axios.get(path);

export const getOneItem = async ({path}) => await axios.get(path)

export const updateItem = async ({path, data}) => await axios.patch(path, data)

export const deleteItem = async ({path}) => await axios.delete(path)
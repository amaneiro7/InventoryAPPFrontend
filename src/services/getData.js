import axios from "axios";
import endPoints from "./endPoint";

export const getCategories = async () => {
    const response = await axios.get(endPoints.categories.getAllCategories);
    return response
}
export const getItems = async () => {
    const response = await axios.get(endPoints.items.getAllItems);
    return response
}
export const getBrands = async () => {
    const response = await axios.get(endPoints.brand.getAllBrands);
    return response
}
export const getModels = async () => {
    const response = await axios.get(endPoints.models.getAllModels);
    return response
}
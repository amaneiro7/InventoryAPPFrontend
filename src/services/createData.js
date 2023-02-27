import axios from "axios";
import endPoints from "./endPoint";


export const createCategories = async (data) => {    
    const response = await axios.post(endPoints.categories.createCategory, data);
    return response
}

export const createItems = async (data) => {
    const response = await axios.post(endPoints.items.createItem, data);
    return response
}
export const createBrands = async (data) => {
    const response = await axios.post(endPoints.brand.createBrand, data);
    return response
}

export const createModels = async (data) => {
    const response = await axios.post(endPoints.models.createModel, data);
    return response
}
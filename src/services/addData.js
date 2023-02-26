import axios from "axios";
import endPoints from "./endPoint";


export const createCategories = async (data) => {
    const response = await axios.post(endPoints.createCategories, data);        
    return response
}
export const createItems = async (data) => {
    const response = await axios.post(endPoints.createItems, data);
    return response
}
export const createBranches = async (data) => {
    const response = await axios.post(endPoints.createBranches, data);
    return response
}
export const createModels = async (data) => {
    const response = await axios.post(endPoints.createModels, data);    
    return response
}
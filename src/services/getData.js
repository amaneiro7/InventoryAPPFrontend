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
export const getBranches = async () => {
    const response = await axios.get(endPoints.branch.getAllBranches);
    return response
}
export const getModels = async () => {
    const response = await axios.get(endPoints.models.getAllModels);
    return response
}
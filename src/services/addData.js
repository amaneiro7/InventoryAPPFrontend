import axios from "axios";
import endPoints from "./endPoint";


export const createCategories = async (data) => {    
    await axios({
        method: "post",
        url: endPoints.categories.createCategory,
        data: data
    })
    .then(res => res.data)
    .catch(err => console.log(err));
}

export const createItems = async (data) => {
    const response = await axios.post(endPoints.createItems, data);
    return response
}
export const createBrands = async (data) => {
    console.log(data);
    await axios.post(endPoints.branch.createBranch, data)
        .then(res => res.data)
        .catch(err => console.log(err))
    
}
export const createModels = async (data) => {
    const response = await axios.post(endPoints.createModels, data);    
    return response
}
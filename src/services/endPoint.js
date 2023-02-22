import { getApiUrl } from "./config";

const endPoints = {
    categories: {
        getAllCategories: `${getApiUrl}/categories`,
        getCategory: (name) => `${getApiUrl}/categories/${name}`,
        createCategory: `${getApiUrl}/categories`,
        updateCategory: (name) => `${getApiUrl}/categories/${name}`,
        deleteCategory: (name) => `${getApiUrl}/categories/${name}`,
    },
    items: {
        getAllItems: `${getApiUrl}/items`,
        getItem: (id) => `${getApiUrl}/items/${id}`,
        createItem: `${getApiUrl}/items`,
        updateItem: (id) => `${getApiUrl}/items/${id}`,
        deleteItem: (id) => `${getApiUrl}/items/${id}`,
    },
    branch: {
        getAllBranches: `${getApiUrl}/branch`,
        getBranch: (name) => `${getApiUrl}/branch/${name}`,
        createBranch: `${getApiUrl}/branch`,
        updateBranch: (name) => `${getApiUrl}/branch/${name}`,
        deleteBranch: (name) => `${getApiUrl}/branch/${name}`,
    },
    models: {
        getAllModels: `${getApiUrl}/models`,
        getModel: (name) => `${getApiUrl}/models/${name}`,
        createModel: `${getApiUrl}/models`,
        updateModel: (name) => `${getApiUrl}/models/${name}`,
        deleteModel: (name) => `${getApiUrl}/models/${name}`,
    }
}

export default endPoints;
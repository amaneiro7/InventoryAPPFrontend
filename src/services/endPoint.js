import { getApiUrl } from "./config";

const endPoints = {
    categories: {
        getAllCategories: `${getApiUrl}/categories`,
        getCategory: (id) => `${getApiUrl}/categories/${id}`,
        createCategory: `${getApiUrl}/categories`,
        updateCategory: (id) => `${getApiUrl}/categories/${id}`,
        deleteCategory: (id) => `${getApiUrl}/categories/${id}`,
    },
    items: {
        getAllItems: `${getApiUrl}/items`,
        getItem: (id) => `${getApiUrl}/items/${id}`,
        createItem: `${getApiUrl}/items`,
        updateItem: (id) => `${getApiUrl}/items/${id}`,
        deleteItem: (id) => `${getApiUrl}/items/${id}`,
    },
    brand: {
        getAllBrands: `${getApiUrl}/brand`,
        getBrand: (id) => `${getApiUrl}/brand/${id}`,
        createBrand: `${getApiUrl}/brand`,
        updateBrand: (id) => `${getApiUrl}/brand/${id}`,
        deleteBrand: (id) => `${getApiUrl}/brand/${id}`,
    },
    models: {
        getAllModels: `${getApiUrl}/models`,
        getModel: (id) => `${getApiUrl}/models/${id}`,
        createModel: `${getApiUrl}/models`,
        updateModel: (id) => `${getApiUrl}/models/${id}`,
        deleteModel: (id) => `${getApiUrl}/models/${id}`,
    }
}

export default endPoints;
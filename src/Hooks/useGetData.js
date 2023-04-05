import { useEffect, useReducer } from "react";

const initialState = {
    dataItems: [],
    dataCategory: [],
    dataBrand: [],
    dataModel: [],
};

const reducer = (state, action) => {
    return reducerOBJECT(state, action.payload)[action.type] || state;
};

const reducerOBJECT = (state, payload) => ({
    'SUCCESS': {
        ...state,
        dataItems: payload.items,
        dataCategory: payload.categories,
        dataBrand: payload.brand,
        dataModel: payload.models,
    },
    'ERROR': {
        ...state,
        error: payload,
    }
});


export default function useGetData(setReload, reload) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const endPoints = {
            items: "items",
            categories: "categories",
            brand: "brand",
            models: "models",
        };
        setReload(false)
        const fetchData = async () => {
            try {
                const [items, categories, brand, models] = await Promise.all(
                    Object.values(endPoints).map((endPoint) => 
                        import('services/api').then(module =>
                            module.getAllItems({ endPoint: endPoint })
                        )
                    )
                );
                
                const sortItems = items.sort(( a, b ) => (a.categoryId + b.categoryId || a.brandId + b.brandId || a.modelId + b.modelId))
                const sortCategories = categories.sort((a,b) => a.name.localeCompare(b.name))
                const sortBrand = brand.sort((a,b) => a.name.localeCompare(b.name))
                const sortModels = models.sort((a,b) => a.name.localeCompare(b.name))
                dispatch({ type: 'SUCCESS', payload: {items: sortItems, categories: sortCategories, brand: sortBrand, models: sortModels} });
            } catch (error) {
                dispatch({ type: "ERROR", payload: error });
            }
        };        
        fetchData();
    }, [setReload, reload]);
    const { dataItems, dataCategory, dataBrand, dataModel } = state
    return {
        dataItems, dataCategory, dataBrand, dataModel
    }

}
import { useEffect, useReducer } from "react";

const initialState = {
    dataItems: [],
    dataCategory: [],
    dataBrand: [],
    dataModel: [],
    searchValueCategory: "5",
    searchValueSerial: "",
    searchValueActivo: "",
    searchValueBrand: "",
    searchValueModel: "",
};

const reducer = (state, action) => {
    return reducerOBJECT(state, action.payload)[action.type] || state;
};

const reducerOBJECT = (state, payload) => ({
    'CHANGEVALUE': {
        ...state,
        [payload?.name]: payload?.value,
    },
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
    },
});

export default function useGetSearch(setReload, reload) {
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
                dispatch({ type: 'SUCCESS', payload: {items, categories, brand, models} });
            } catch (error) {
                dispatch({ type: "ERROR", payload: error });
            }
        };        
        fetchData();
    }, [reload]);

    const { searchValueCategory, searchValueSerial, searchValueActivo, searchValueBrand, searchValueModel, dataItems, dataCategory, dataBrand, dataModel } = state;

    let searchedItems = [];
    let currentSearchValue;
    currentSearchValue = dataItems;
    

    if (searchValueCategory.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return item.category.id === Number(searchValueCategory);
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueSerial.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return String(item.serial).toLowerCase().includes(searchValueSerial.toLowerCase());
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueActivo.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return String(item.activo).toLowerCase().includes(searchValueActivo.toLowerCase());
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueBrand.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return item.brand.id === Number(searchValueBrand);
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueModel.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return item.model.id === Number(searchValueModel);
        });
        currentSearchValue = searchedItems;
    }

    const searchValueTrigger = searchValueCategory.length + searchValueSerial.length + searchValueActivo.length + searchValueBrand.length + searchValueModel.length;

    if (searchValueTrigger === 0) {
        searchedItems = dataItems;
    }

    return {
        dataItems,
        dataCategory,
        dataBrand,
        dataModel,
        searchedItems,
        state,
        dispatch,
    };
}

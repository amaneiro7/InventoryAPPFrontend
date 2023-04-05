import { useReducer } from "react";

const initialState = {
    searchValueCategory: "",
    searchValueSerial: "",
    searchValueActivo: "",
    searchValueBrand: "",
    searchValueModel: "",
    statusInput: undefined,
    obsoleteInput: undefined,
};

const reducer = (state, action) => {
    return reducerOBJECT(state, action.payload)[action.type] || state;
};

const reducerOBJECT = (state, payload) => ({
    'CHANGEVALUE': {
        ...state,
        [payload?.name]: payload?.value,
    }
});

export default function useGetSearch(dataItems) {
    const [state, dispatch] = useReducer(reducer, initialState);
    let searchedItems = [];
    let currentSearchValue;

    currentSearchValue = dataItems;

    if (JSON.stringify(initialState) === JSON.stringify(state)) {
        searchedItems = dataItems;
    }

    if (state.searchValueCategory) {        
        searchedItems = getSearch(state.searchValueCategory, "categoryId", "number")
        currentSearchValue = searchedItems;
    }

    if (state.searchValueSerial) {
        searchedItems = getSearch(state.searchValueSerial, "serial", "string")
        currentSearchValue = searchedItems;
    }

    if (state.searchValueActivo) {
        searchedItems = getSearch(state.searchValueActivo, "activo", "string");
        currentSearchValue = searchedItems;
    }

    if (state.searchValueBrand) {
        searchedItems = getSearch(state.searchValueBrand, "brandId", "number")
        currentSearchValue = searchedItems;
    }

    if (state.searchValueModel) {
        searchedItems = getSearch(state.searchValueModel, "modelId", "number")
        currentSearchValue = searchedItems;
    }

    if (state.statusInput !== undefined) {
        searchedItems = getSearch(state.statusInput, "status", "boolean")
        currentSearchValue = searchedItems
    }

    if (state.obsoleteInput !== undefined) {
        searchedItems = getSearch(state.obsoleteInput, "obsolete", "boolean")
        currentSearchValue = searchedItems
    }

    function getSearch(searchValue, value, type) {
        const typeValidation = {
            string: (searchValue, value) => currentSearchValue.filter(item => String(item[value]).toLowerCase().includes(searchValue.toLowerCase())),
            number: (searchValue, value) => currentSearchValue.filter(item => item[value] === Number(searchValue)),
            boolean: (searchValue, value) => currentSearchValue.filter(item => item[value] === searchValue)
        }
        return typeValidation[type] && typeValidation[type](searchValue, value)
    }
    return {
        searchedItems,
        state,
        dispatch,
    };
}

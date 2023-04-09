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
        getSearch(state.searchValueCategory, "categoryId", "number")
    }

    if (state.searchValueSerial) {
        getSearch(state.searchValueSerial, "serial", "string")
    }

    if (state.searchValueActivo) {
        getSearch(state.searchValueActivo, "activo", "string")
    }

    if (state.searchValueBrand) {
        getSearch(state.searchValueBrand, "brandId", "number")
    }

    if (state.searchValueModel) {
        getSearch(state.searchValueModel, "modelId", "number")
    }

    if (state.statusInput !== undefined) {
        getSearch(state.statusInput, "status", "boolean")
    }

    if (state.obsoleteInput !== undefined) {
        getSearch(state.obsoleteInput, "obsolete", "boolean")
    }

    function getSearch(searchValue, value, type) {
        const typeValidation = {
            string: (searchValue, value) => currentSearchValue.filter(item => String(item[value]).toLowerCase().includes(searchValue.toLowerCase())),
            number: (searchValue, value) => currentSearchValue.filter(item => item[value] === Number(searchValue)),
            boolean: (searchValue, value) => currentSearchValue.filter(item => item[value] === searchValue)
        }
        searchedItems = typeValidation[type] && typeValidation[type](searchValue, value)
        currentSearchValue = searchedItems
    }
    return {
        searchedItems,
        state,
        dispatch,
    };
}

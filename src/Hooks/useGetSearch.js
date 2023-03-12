import { useReducer } from "react";
import useGetAddData from "./useGetData";

const initialState = {    
    searchValueCategory: "5",
    searchValueSerial: "",
    searchValueActivo: "",
    searchValueBrand:"",
    searchValueModel:""
}

const reducer = (state, action) => {
    return reducerOBJECT(state, action.payload)[action.type] || state
}

const reducerOBJECT = (state, payload) => ({
    'CHANGEVALUE': {
        ...state, 
        [payload?.name]: payload?.value
    },
})

export default function useGetSearch() {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { data } = useGetAddData({ endPoint: 'items' })
    const {
        searchValueCategory,
        searchValueSerial,
        searchValueActivo,
        searchValueBrand,
        searchValueModel,
    } = state
    

    let searchedItems = [];
    let currentSearchValue
    currentSearchValue = data

    if (searchValueCategory.length >= 1) {
        searchedItems = currentSearchValue.filter(item => {
            return item.category.id === Number(searchValueCategory);
        });
        currentSearchValue = searchedItems
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
        searchedItems = currentSearchValue.filter(item => {
            return item.brand.id === Number(searchValueBrand);
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueModel.length >= 1) {
        searchedItems = currentSearchValue.filter(item => {
            return item.model.id === Number(searchValueModel);
        });
        currentSearchValue = searchedItems;
    }

    const searchValueTrigger = searchValueCategory.length + searchValueSerial.length + searchValueActivo.length + searchValueBrand.length + searchValueModel.length;

    if (searchValueTrigger === 0) {
        searchedItems = data;
    }

    return {
        data,
        searchedItems,
        state,
        dispatch
    }
}

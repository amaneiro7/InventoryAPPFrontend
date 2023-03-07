import { useReducer } from "react";

const initialState = {   
    modeUI: "",
    name: "Item",
    nameTitle: "",
    endPoint: "",
    openModal: false, 
    title: "",
}

const reducer = (state, action ) => {    
    return reducerOBJECT(state, action.payload)[action.type] || state
}

const reducerOBJECT = (state, payload) => ({
    'CATEGORY': {
        ...state,
        name: "Categoria",
        nameTitle:"una Categoria",
        endPoint: "categories",        
    },
    'BRAND': {
        ...state,
        name: "Marca",
        nameTitle:"una Marca",
        endPoint: "brand",        
    },
    'MODEL': {
        ...state,
        name: "Modelo",
        nameTitle:"un Modelo",
        endPoint: "models",        
    },
    'ADD': {
        ...state,
        openModal: true,
        modeUI: "ADD",
        title: "Cree",
    },
    'EDIT': {
        ...state,
        openModal: true,
        modeUI: "EDIT",
        title: "Edite",
    },
    'DELETE': {
        ...state,
        openModal: true,
        modeUI: "DELETE",
        title: "Elimine",
    },
    'RESET': {
        ...state,
        modeUI: "",
        name: "",
        nameTitle: "",
        endPoint: "",
        openModal: false, 
        title: "",
    }
})

export function useReducerFromFormModal() {    
    const [state, dispatch] = useReducer(reducer, initialState)   

    return {state, dispatch}
}
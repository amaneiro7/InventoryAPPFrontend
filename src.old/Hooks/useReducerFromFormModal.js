import { useReducer } from "react";

const initialState = {   
    targetModeUI: "",
    modeUI: "",
    name: "",
    nameTitle: "",
    endPoint: "",
    openModal: false, 
    title: "",
    oper: "",
    options: [],
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
        targetModeUI: "CATEGORY",
    },
    'BRAND': {
        ...state,
        name: "Marca",
        nameTitle:"una Marca",
        endPoint: "brand",
        targetModeUI: "BRAND",
    },
    'MODEL': {
        ...state,
        name: "Model",
        nameTitle:"un Modelo",
        endPoint: "models",
        targetModeUI: "MODEL",
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
        targetModeUI: "",
        modeUI: "",
        name: "",
        endPoint: "",
        openModal: false, 
        title: "",
        oper: "",
        options: [],
    }
})

export function useReducerFromFormModal() {    
    const [state, dispatch] = useReducer(reducer, initialState)   

    return {state, dispatch}
}
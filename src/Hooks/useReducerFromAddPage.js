import { useReducer } from "react";

const initialState = {
    category: "",
    serial: "",
    activo: "",
    status: true,
    obsolete: false,
    brand: "",
    model: "",
    button: "",
    actionTypeButton: "",
    activoExisted: false,
    serialExisted: false,
    modeUI: "",
    name: "Item",
    endPoint: "",
    openModal: false, 
    title: "",
}

const reducer = (state, action) => {
    return reducerOBJECT(state, action.payload)[action.type] || state
}

const reducerOBJECT = (state, payload) => ({ 
    'CHANGEVALUE': { 
        ...state, 
        [payload?.name]: payload?.value 
    },
    'VIEWDETAIL': {
        ...state,        
        category: payload?.category,
        serial: payload?.serial,
        activo: payload?.activo,
        brand: payload?.brand,
        model: payload?.model,
    },
    'ALREADY_EXIST': {
        ...state,
        [`${payload?.name}Existed`]: payload?.result,
    },
    'DEFAULTVALUE': { 
        ...state,
        modeUI: "",
        name: "",
        nameTitle: "",
        endPoint: "",
        serial: "",
        activo: "",
        title: "",
    },
    'CATEGORY': {
        ...state,
        name: "Categoria",
        nameTitle:"una Categoria",
        endPoint: "/categories"
    },
    'BRAND': {
        ...state,
        name: "Marca",
        nameTitle:"una Marca",
        endPoint: "/brand"
    },
    'MODEL': {
        ...state,
        name: "Modelo",
        nameTitle:"un Modelo",
        endPoint: "/models"
    },
    'ADD': {
        ...state,
        openModal: true,
        modeUI: "ADD",
        title: "Cree",
        button: "Añadir",
        actionTypeButton: 'actionType'
    },
    'EDIT': {
        ...state,
        openModal: true,
        modeUI: "EDIT",
        title: "Edite",
        button: "Editar",
        actionTypeButton: 'saveType'
    },
    'DELETE': {
        ...state,
        openModal: true,
        modeUI: "DELETE",
        title: "Elimine",
        button: "Eliminar",
        actionTypeButton: 'deleteType'
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

export function useReducerFromAddPage() {

    const [state, dispatch] = useReducer(reducer, initialState)


    return { state, dispatch }
}
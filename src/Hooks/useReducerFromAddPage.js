import { useReducer } from "react";

const initialState = {
    category: "",
    serial: "",
    activo: "",
    brand: "",
    model: "",
}

const reducer = (state, action) => {
    console.log(action);
    return reducerOBJECT(state, action.payload)[action.type] || state
}

const reducerOBJECT = (state, payload) => ({ 
    'CHANGEVALUE': { 
        ...state, 
        [payload?.name]: payload?.value 
    },
    'RESET': { 
        ...state,
        serial: '', 
        activo: '', 
    },
})

export function useReducerFromAddPage() {

    const [state, dispatch] = useReducer(reducer, initialState)


    return { state, dispatch }
}
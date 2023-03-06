import { useEffect, useReducer } from "react";
import { updateItem } from "services/api";
import { getApiUrl } from "services/config";

//Se Deffine el estado inicial
const initialState = {   
    status: "",
    statusInfo: "",
    loading: false,
    error: null,
}

const reducer = (state, action) => {    
    return reducerOBJECT(state, action.payload)[action.type] || state
}
const reducerOBJECT = (state, payload) => ({
    'START': {
        ...state,
        loading: true,
    },
    'SUCCESS': {
        ...state,
        loading: false,
        status: "Elemento actualizado exitosamente",
        statusInfo: payload,
    },
    'ERROR': {
        ...state,
        loading: false,
        error: payload,
    }
})

export default function useUpdateData({ endPoint, data }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const onStart = () => dispatch({ type: 'START' })
    const onSuccess = (res) => dispatch({ type: 'SUCCESS', payload: res })
    const onError = (error) => dispatch({ type: 'ERROR', payload: error })


    useEffect(() => {
        onStart()        
        updateItem({ path: `${getApiUrl}${endPoint}`, data })            
            .then(res => onSuccess(res))
            .catch(error => onError(error))
    }, [endPoint]);
    
    return state
}
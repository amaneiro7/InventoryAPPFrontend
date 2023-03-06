import { useEffect, useReducer } from "react";
import { createItems,deleteItem, updateItem } from "services/api";
import { getApiUrl } from "services/config";

const initialState = {
    status: "",
    statusInfo: "",
    loading: false,
    error: null,
}

const reducer = (fetchState, action) => {    
    return reducerOBJECT(fetchState, action.payload)[action.type] || fetchState
}
const reducerOBJECT = (fetchState, payload) => ({
    'START': {
        ...fetchState,
        loading: true,
    },
    'CREATE': {
        ...fetchState,
        loading: false,
        status: "Elemento creado exitosamente",
        statusInfo: payload
    },
    'UPDATE': {
        ...fetchState,
        loading: false,
        status: "Elemento actualizado exitosamente",
        statusInfo: payload
    },
    'DELETE': {
        ...fetchState,
        loading: false,
        status: "Elemento eliminado exitosamente",
        statusInfo: payload
    },
    'ERROR': {
        ...fetchState,
        loading: false,
        error: payload,
        status: payload?.statusText,
        statusInfo: payload?.status
    }
})

export default function useFetchingData() {
    const [fetchState, dispatch] = useReducer(reducer, initialState)
    const onStart = () => dispatch({ type: 'START' })
    const onCreate = (res) => dispatch({ type: 'CREATE', payload: res})
    const onUpdate = (res) => dispatch({ type: 'UPDATE', payload: res})
    const onDelete = (res) => dispatch({ type: 'DELETE', payload: res})
    const onError = (error) => {console.log(error);
        dispatch({ type: 'ERROR', payload: error })
}
    
    const createData = ({ endPoint, data }) => {
        onStart()        
        createItems({ path: `${getApiUrl}${endPoint}`, data })            
            .then(res => onCreate(res))
            .catch(error => onError(error.response))
    }
    const deleteData = ({ endPoint }) => {
        onStart()        
        deleteItem({ path: `${getApiUrl}${endPoint}` })            
            .then(res => onDelete(res))
            .catch(error => onError(error.response))
    }
    const updateData = ({ endPoint, data }) => {
        onStart()        
        updateItem({ path: `${getApiUrl}${endPoint}`, data })            
            .then(res => onUpdate(res))
            .catch(error => onError(error.response))
    }
    
    
    return { fetchState, createData, deleteData, updateData }
}
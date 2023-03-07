import { useReducer } from "react";
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
    },
    'RESET': {
        status: "",
        statusInfo: "",
        loading: false,
        error: null,
    }
})

export default function useFetchingData() {
    const [fetchState, dispatch] = useReducer(reducer, initialState)
    const onStart = () => dispatch({ type: 'START' })
    const onCreate = (res) => dispatch({ type: 'CREATE', payload: res})
    const onUpdate = (res) => dispatch({ type: 'UPDATE', payload: res})
    const onDelete = (res) => dispatch({ type: 'DELETE', payload: res})
    const onError = (error) => dispatch({ type: 'ERROR', payload: error })
    const onReset = (error) => dispatch({ type: 'RESET' })
    
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

    wait(3000, (fetchState.status !== ""), onReset)


    function wait(time, condition, callback) {
        setTimeout(function() {
            if (condition) {
                callback();
            }
        }, time);
    }
    
    
    return { fetchState, createData, deleteData, updateData }
}
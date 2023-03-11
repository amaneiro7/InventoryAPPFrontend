import { useEffect, useReducer } from "react";
import { getAllItems } from "services/api";
import { getApiUrl } from "services/config";

//Se Deffine el estado inicial
const initialState = {
    data: [],
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
        data: payload,
    },
    'ERROR': {
        ...state,
        loading: false,
        error: payload,
    }
})

export default function useGetAddData({ endPoint }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const onStart = () => dispatch({ type: 'START' })
    const onSuccess = (data) => dispatch({ type: 'SUCCESS', payload: data })
    const onError = (error) => dispatch({ type: 'ERROR', payload: error })


    useEffect(() => {
        onStart()        
        getAllItems({ path: `${getApiUrl}${endPoint}` })            
            .then(res => onSuccess(res.data))
            .catch(error => onError(error))
    }, [endPoint]);
    
    return state
}
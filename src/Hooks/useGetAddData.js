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

const actionTypes = {
    start: "START",
    success: 'SUCCESS',
    error: 'ERROR',
}
const reducerOBJECT = (state, payload) => ({
    [actionTypes.start]: {
        ...state,
        loading: true,
    },
    [actionTypes.success]: {
        ...state,
        loading: false,
        data: payload,
    },
    [actionTypes.error]: {
        ...state,
        loading: false,
        error: payload,
    }
})

export default function useGetAddData({ endPoint }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const onStart = () => dispatch({ type: actionTypes.start })
    const onSuccess = (data) => dispatch({ type: actionTypes.success, payload: data })
    const onError = (error) => dispatch({ type: actionTypes.error, payload: error })


    useEffect(() => {
        onStart()        
        getAllItems({ path: `${getApiUrl}${endPoint}` })            
            .then(res => onSuccess(res.data))
            .catch(error => onError(error))
    }, [endPoint]);
    
    return state
}
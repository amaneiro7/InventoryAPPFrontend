import { useEffect, useState } from "react";
import { getApiUrl } from "../config";
import axios from "axios";


export function useGetData(endpoint) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true)

        const [dataInfo] = Promise.all([
            getData({endpoint})
        ]).then(() => {
            setData(dataInfo)
        }).catch(error => {
            new Error(error);
            setLoading(false)
            setError(error)
        })
    },[endpoint])

    const getData = ({endpoint}) => {
        const apiUrl = getApiUrl(`${endpoint}`)
        return axios.get(apiUrl).then(res => res.data)
    }

    return {
        data,
        loading,
        error,
        getData
    }
}


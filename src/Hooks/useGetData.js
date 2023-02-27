import { useEffect, useState } from "react";
import { getItems } from "../services/getData";
import { useCreateAddData } from "./useCreateAddData";


export function useGetData() {
    const {upload} = useCreateAddData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [items, setItems] = useState([]);

useEffect(() => {
    setLoading(true);
    setError(false);
    getItems()
        .then(res => setItems(res.data))
        .catch(err => setError(err))
        .finally(() => setLoading(false))
},[upload])

    return {
        items,
        loading,
        setLoading,
        error,  
        setError
    }
}


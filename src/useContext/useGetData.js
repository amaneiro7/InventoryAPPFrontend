import { useEffect, useState } from "react";
import { getItems  } from "../services/getData";


export function useGetData() {
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
},[])

    return {
        items,
        loading,
        setLoading,
        error,  
        setError
    }
}


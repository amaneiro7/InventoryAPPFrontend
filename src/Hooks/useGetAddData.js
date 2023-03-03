import {useEffect, useState } from "react";
import { getAllItems, getOneItem } from "../services/api";
import { getApiUrl } from "../services/config";

export function useGetAddData({setLoading, setError, upload}) {
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [category, setCategory] = useState("")
    const [serial, setSerial] = useState("")
    const [activo, setActivo] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    
    useEffect(() => {
        setLoading(true)
        setError("")
            getAllItems({path: `${getApiUrl}categories`})
            .then(res => setCategories(res.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [upload])

    useEffect(() => {        
        setError(false)          
        getAllItems({path: `${getApiUrl}brand`})
            .then(res => setBrands(res.data))
            .catch(error => setError(error))            
    }, [category, upload])

    useEffect(() => {        
        setError(false)
        const id = Number(brand)        
        if (id !== 0) {
            getOneItem({path: `${getApiUrl}/brand/${id}`})
                .then(res => setModels(res.data.model))
                .catch(error => setError(error))
        }
    }, [brand, upload])


    return {
        categories,
        brands,
        models,
        category,
        serial,
        activo,
        brand,
        model,
        setCategory,
        setSerial,
        setActivo,
        setBrand,
        setModel
    }
}
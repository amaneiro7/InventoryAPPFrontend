import {useEffect, useState } from "react";
import { getAllItems } from "../services/api";
import endPoints from "../services/endPoint";


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
            getAllItems({path: endPoints.categories.getAllCategories})
            .then(res => setCategories(res.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [upload])

    useEffect(() => {
        setLoading(true)
        setError(false)          
        getAllItems({path: endPoints.brand.getAllBrands})
            .then(res => setBrands(res.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [category, upload])

    useEffect(() => { 
        let filteredBrand = []            
        if (brands.length >= 1) {
            filteredBrand = brands.filter((model) => {
                return model.id === Number(brand)
            });
        }
        const filteredModel = filteredBrand.map(elem => elem.model)
        setModels(filteredModel[0])
        }, [brand])

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
import { useEffect, useState } from "react";
import { getBrands, getCategories } from "../services/getData";

export function useGetAddData() {
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [category, setCategory] = useState("")
    const [serial, setSerial] = useState("")
    const [activo, setActivo] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        setError(false)
        getCategories()
            .then(res => setCategories(res.data))            
        getBrands()
            .then(res => setBrands(res.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [])

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
        loading,
        error,
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
import { useEffect, useState } from "react";
import { getBranches, getCategories } from "../services/getData";

export function useGetAddData() {
    const [categories, setCategories] = useState([])
    const [branches, setBranches] = useState([])
    const [models, setModels] = useState([])
    const [category, setCategory] = useState("")
    const [serial, setSerial] = useState("")
    const [activo, setActivo] = useState("")
    const [branch, setBranch] = useState("")
    const [model, setModel] = useState("")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        setError(false)
        getCategories()
            .then(res => setCategories(res.data))            
        getBranches()
            .then(res => setBranches(res.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => { 
        let filteredBranch = []            
        if (branches.length >= 1) {
            filteredBranch = branches.filter((model) => {
                return model.id === Number(branch)
            });
        }
        const filteredModel = filteredBranch.map(elem => elem.model)
        setModels(filteredModel[0])
        }, [branch])

    return {
        loading,
        error,
        categories,
        branches,
        models,
        category,
        serial,
        activo,
        branch,
        model,
        setCategory,
        setSerial,
        setActivo,
        setBranch,
        setModel
    }
}
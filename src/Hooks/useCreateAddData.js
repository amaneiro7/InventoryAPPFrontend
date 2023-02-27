import { createItems, createBrands, createCategories, createModels } from "../services/createData";
import { useState } from "react";


export function useCreateAddData() {
    const [loading,  setLoading] = useState(false);
    const [error,  setError] = useState(false);    
    const [statusData, setStatusData] = useState("")    
    const [upload, setUpload] = useState(false)
    

    const createNewItem = (data) => {
        setLoading(true);
        setUpload(true)
        setError(false);
        createItems(data)
            .then(res => {
                setStatusData(res)
            })
            .catch(err => {
                setError(true)
                setStatusData(err.response.data)
            })
            .finally(() => {
                setLoading(false)
                setUpload(false)
            })
    }
    
    const createNewCategory = (data) => {
        setLoading(true);
        setUpload(true)
        setError(false);
        createCategories(data)
            .then(res => {
                setStatusData(res)
            })
            .catch(err => {
                setError(true)
                setStatusData(err.response.data)             
            })
            .finally(() => {
                setLoading(false)
                setUpload(false)
            })
    }
    
    const createNewBrand = (data) => {
        setLoading(true);
        setUpload(true)
        setError(false);
        createBrands(data)
            .then(res => {
                setStatusData(res)
            })
            .catch(err => {
                setError(true)
                setStatusData(err.response.data)
            })
            .finally(() => {
                setLoading(false)
                setUpload(false)
            })
    }

    const createNewModel = (data) => {
        setLoading(true);
        setUpload(true)
        setError(false);
        createModels(data)
            .then(res => {
                setStatusData(res)
            })
            .catch(err => {
                setError(true)
                setStatusData(err.response.data)
            })
            .finally(() => {
                setLoading(false)
                setUpload(false)
            })
    }
    

    return {
        loading,
        error,        
        statusData,
        upload,
        createNewCategory,
        createNewBrand,
        createNewModel,
        createNewItem
    }
}


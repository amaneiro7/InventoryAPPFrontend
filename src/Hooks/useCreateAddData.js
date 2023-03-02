import { useState } from "react";
import { createItems, deleteItem, updateItem } from "../services/api";


export function useCreateAddData({setLoading, setError, setUpload}) {
    const [statusData, setStatusData] = useState("")

    const createNewItem = ({path, data}) => {
        setLoading(true);
        setUpload(true)
        setError(false);
        createItems({path, data})
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
    const getOneItem = ({path}) => {
        setLoading(true);
        setUpload(true)
        setError(false);
        getOneItem({path})
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
    
    const updatingItem = ({path, data}) => {
        setLoading(true);
        setUpload(true)
        setError(false);
        updateItem({path, data})
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
    const deletingItem = ({path}) => {
        setLoading(true);
        setUpload(true)
        setError(false);
        deleteItem({path})
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

    if (statusData !== "") {
        setTimeout(() => setStatusData(""),5000)
    }

    return {
        statusData,
        setStatusData,
        createNewItem,
        getOneItem,
        updatingItem,
        deletingItem
    }
}


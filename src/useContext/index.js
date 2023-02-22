import React, {createContext } from "react";
import { useGetData } from "./useGetData";



export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const { data, loading, error, getData } = useGetData;

    const getAllData = async (endpoint) => {
        const response = await getData(endpoint)
        return response;
    }
    
    return (
        <InventaryContext.Provider value={{
            data,
            loading,
            error,
            getAllData
            }}>            
        </InventaryContext.Provider>
    )
}
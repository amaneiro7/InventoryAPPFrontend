import useGetSearch from "Hooks/useGetDataHome";
import React, { createContext, useState } from "react";
import { useCreateAddData } from "../Hooks/useCreateAddData";
import { useGetAddData } from "../Hooks/useGetAddData";

// const useCreateAddData = lazy(() => import('./useCreateAddData').then(module => {
//     return { default: module.useCreateAddData }
// }))

// const useGetAddData = lazy(() => import('./useGetAddData').then(module => {
//     return { default: module.useGetAddData }
// }))

// const useGetSearch = lazy(() => import('./useGetDataHome').then(module => {
//     return { default: module.useGetSearch }
// }))

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [upload, setUpload] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { 
        statusData, 
        setStatusData, 
        createNewItem,  
        gettingOneItem,      
        updatingItem,
        deletingItem,
    } = useCreateAddData({ setLoading, setError, setUpload });


    return (
        <InventaryContext.Provider
            value={{

                loading,
                setLoading,
                error,
                setError,
                openModal,
                setOpenModal,

                statusData,
                setStatusData,
                createNewItem,
                gettingOneItem,
                updatingItem,
                deletingItem,
            }}
        >
            {props.children}
        </InventaryContext.Provider>
    );
}

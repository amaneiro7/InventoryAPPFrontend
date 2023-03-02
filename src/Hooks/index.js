import React, { createContext, useState } from "react";
import { useCreateAddData } from "./useCreateAddData";
import { useGetAddData } from "./useGetAddData";
import { useGetSearch } from "./useGetDataHome";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [upload, setUpload] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const {
        searchedItems,
        searchValueCategory,
        searchValueSerial,
        searchValueActivo,
        searchValueBranch,
        searchValueModel,
        setSearchValueCategory,
        setSearchValueSerial,
        setSearchValueActivo,
        setSearchValueBranch,
        setSearchValueModel,
    } = useGetSearch({ setLoading, setError, upload });

    const { 
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
    } = useGetAddData({ setLoading, setError, upload });

    const { 
        statusData, 
        setStatusData, 
        createNewItem,        
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
                searchedItems,
                searchValueCategory,
                setSearchValueCategory,
                searchValueSerial,
                setSearchValueSerial,
                searchValueActivo,
                setSearchValueActivo,
                searchValueBranch,
                setSearchValueBranch,
                searchValueModel,
                setSearchValueModel,
                openModal,
                setOpenModal,

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
                setModel,

                statusData,
                setStatusData,
                createNewItem,
                updatingItem,
                deletingItem,
            }}
        >
            {props.children}
        </InventaryContext.Provider>
    );
}

import React, {createContext, useState } from "react";
import { useGetData } from "./useGetData";
import { useGetSearch } from "./useGetSearch";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const { items, loading, error } = useGetData();
    const { searchedItems,
        searchValueCategory, 
        searchValueSerial, 
        searchValueActivo, 
        searchValueBranch, 
        searchValueModel,
        setSearchValueCategory,
        setSearchValueSerial,
        setSearchValueActivo,
        setSearchValueBranch,
        setSearchValueModel, } = useGetSearch();    
    const [openModal, setOpenModal] = useState(false);
    
    return (
        <InventaryContext.Provider value={{
            items,
            loading,
            error,
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
            }}>
                {props.children}
        </InventaryContext.Provider>
    )
}
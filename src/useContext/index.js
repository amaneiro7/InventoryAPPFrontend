import React, {createContext, useState } from "react";
import { useGetData } from "./useGetData";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const { items, loading, error } = useGetData();

    const [searchValueCategory, setSearchValueCategory] = useState("");
    const [searchValueSerial, setSearchValueSerial] = useState("");
    const [searchValueActivo, setSearchValueActivo] = useState("");
    const [searchValueBranch, setSearchValueBranch] = useState("");
    const [searchValueModel, setSearchValueModel] = useState("");
    const [openModal, setOpenModal] = useState(false);

    let searchedItems = [];

    if (searchValueCategory.length >= 1) {
        searchedItems = items.filter(item => {
            return item.category.name.toLowerCase().includes(searchValueCategory.toLowerCase());
        })
    } else {
            searchedItems = items;
    };
    
    if (searchValueBranch.length >= 1) {        
        searchedItems = items.filter(item => {
            return item.branch.name.toLowerCase().includes(searchValueBranch.toLowerCase());
        })
    } else {
            searchedItems = items;
    };

    
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

            searchedItems
            }}>
                {props.children}
        </InventaryContext.Provider>
    )
}
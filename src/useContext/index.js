import React, {createContext, useState } from "react";
import { useGetData } from "./useGetData";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const { items, loading, error } = useGetData();

    const [searchValue, setSearchValue] = useState("");
    const [openModal, setOpenModal] = useState(false);

    let searchedItems = [];

    if (searchValue.length >= 1) {
        searchedItems = items.filter(item => {
            return item.serial.toLowerCase().includes(searchValue.toLowerCase());
        })
    } else {
            searchedItems = items;
    };

    
    return (
        <InventaryContext.Provider value={{
            items,
            loading,
            error,

            searchValue,
            setSearchValue,
            openModal,
            setOpenModal,

            searchedItems
            }}>
                {props.children}
        </InventaryContext.Provider>
    )
}
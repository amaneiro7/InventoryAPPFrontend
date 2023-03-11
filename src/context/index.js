import useGetSearch from "Hooks/useGetSearch";
import React, { createContext } from "react";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const {
        state,         
        searchedItems,
        searchValueCategory, 
        setSearchValueCategory,
        searchValueSerial,
        setSearchValueSerial,
        searchValueActivo, 
        setSearchValueActivo,
        searchValueBrand, 
        setSearchValueBrand,
        searchValueModel, 
        setSearchValueModel
    } = useGetSearch()



    return (
        <InventaryContext.Provider
            value={{
                state,                
                searchedItems,
                searchValueCategory, 
                setSearchValueCategory,
                searchValueSerial,
                setSearchValueSerial,
                searchValueActivo, 
                setSearchValueActivo,
                searchValueBrand, 
                setSearchValueBrand,
                searchValueModel, 
                setSearchValueModel
            }}
        >
            {props.children}
        </InventaryContext.Provider>
    );
}

import useGetSearch from "Hooks/useGetSearch";
import React, { createContext } from "react";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const {
        state,         
        searchedItems,
        dispatch
    } = useGetSearch()



    return (
        <InventaryContext.Provider
            value={{
                state,                
                searchedItems,
                dispatch
            }}
        >
            {props.children}
        </InventaryContext.Provider>
    );
}

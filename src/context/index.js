import useGetSearch from "Hooks/useGetSearch";
import React, { createContext } from "react";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const {
        data: items,
        state,
        searchedItems,
        dispatch
    } = useGetSearch()



    return (
        <InventaryContext.Provider
            value={{
                items,
                state,                
                searchedItems,
                dispatch
            }}
        >
            {props.children}
        </InventaryContext.Provider>
    );
}

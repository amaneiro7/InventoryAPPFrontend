import useGetSearch from "Hooks/useGetSearch";
import React, { createContext, useState } from "react";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const [reload, setReload] = useState(false);
    const {        
        dataItems: items,
        dataCategory,
        dataBrand,
        dataModel,
        state,
        searchedItems,
        dispatch
    } = useGetSearch(setReload, reload)

    const dataStatus = {
        bueno: true,
        malo: false
    }

    return (
        <InventaryContext.Provider
            value={{
                dataStatus,
                items,
                dataCategory,
                dataBrand,
                dataModel,
                state,                
                searchedItems,
                dispatch,
                reload,
                setReload
            }}
        >
            {props.children}
        </InventaryContext.Provider>
    );
}

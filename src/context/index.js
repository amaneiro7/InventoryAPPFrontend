import useGetData from "Hooks/useGetData";
import useGetSearch from "Hooks/useGetSearch";
import React, { createContext, useState } from "react";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const [reload, setReload] = useState(false);
    
    const {
        dataItems: items,
        dataCategory,
        dataBrand,
        dataModel
    } = useGetData(setReload, reload)
    
    const {
        state,
        searchedItems,
        dispatch
    } = useGetSearch(items)

    const dataStatus = [
        {
        id: true,
        name: 'Operativo',
        },
        {
        id: false,
        name: 'Dañado',
        },
    ]
    const dataObsolete = [
        {
        id: false,
        name: 'Funcional',
        },
        {
        id: true,
        name: 'Obsoleto',
        },
    ]

    return (
        <InventaryContext.Provider
            value={{
                dataStatus,
                dataObsolete,
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

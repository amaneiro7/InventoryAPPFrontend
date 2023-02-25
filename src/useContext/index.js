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
    let currentSearchValue = items; 

    if (searchValueCategory.length >= 1) {
        searchedItems = currentSearchValue.filter(item => {
            return item.category.name.toLowerCase().includes(searchValueCategory.toLowerCase());
        })
        currentSearchValue = searchedItems
    } 

    if (searchValueSerial.length >= 1) {
        searchedItems = currentSearchValue.filter(item => {
            return String(item.serial).toLowerCase().includes(searchValueSerial.toLowerCase());
        })
        currentSearchValue = searchedItems
    }

    if (searchValueActivo.length >= 1) {
        searchedItems = currentSearchValue.filter(item => {
            return String(item.activo).toLowerCase().includes(searchValueActivo.toLowerCase());
        })
        currentSearchValue = searchedItems
    } 

    if (searchValueBranch.length >= 1) {
        searchedItems = currentSearchValue.filter(item => {
            return item.branch.name.toLowerCase().includes(searchValueBranch.toLowerCase());
        })
        currentSearchValue = searchedItems
    } 

    if (searchValueModel.length >= 1) {
        searchedItems = currentSearchValue.filter(item => {
            return item.model.name.toLowerCase().includes(searchValueModel.toLowerCase());
        })
        currentSearchValue = searchedItems
    } 
    
    const searchValueTrigger = searchValueCategory.length + searchValueSerial.length + searchValueActivo.length + searchValueBranch.length + searchValueModel.length;

    if (searchValueTrigger === 0) {
        searchedItems = items
    }
    
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
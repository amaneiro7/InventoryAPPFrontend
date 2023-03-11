import { useState } from "react";
import useGetAddData from "./useGetData";

export default function useGetSearch() {    
    const [searchValueCategory, setSearchValueCategory] = useState("");
    const [searchValueSerial, setSearchValueSerial] = useState("");
    const [searchValueActivo, setSearchValueActivo] = useState("");
    const [searchValueBrand, setSearchValueBrand] = useState("");
    const [searchValueModel, setSearchValueModel] = useState("");
    const { data } = useGetAddData({ endPoint: 'items' })

    let searchedItems = [];
    let currentSearchValue
    currentSearchValue = data
    
    if (searchValueCategory.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return item.category.name.toLowerCase().includes(searchValueCategory.toLowerCase());
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueSerial.length >= 1) {
        console.log('me estan buscando');
        searchedItems = currentSearchValue.filter((item) => {
            return String(item.serial).toLowerCase().includes(searchValueSerial.toLowerCase());
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueActivo.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return String(item.activo).toLowerCase().includes(searchValueActivo.toLowerCase());
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueBrand.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return item.brand.name.toLowerCase().includes(searchValueBrand.toLowerCase());
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueModel.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return item.model.name.toLowerCase().includes(searchValueModel.toLowerCase());
        });
        currentSearchValue = searchedItems;
    }

    const searchValueTrigger = searchValueCategory.length + searchValueSerial.length + searchValueActivo.length + searchValueBrand.length + searchValueModel.length;

    if (searchValueTrigger === 0) {
        searchedItems = data;
    }
    
    return {
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
    }
}

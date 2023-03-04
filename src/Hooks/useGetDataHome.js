import { useEffect, useState } from "react";
import { getAllItems } from "../services/api";
import endPoints from "../services/endPoint";


export function useGetSearch({setLoading, setError, upload}) {    
    const [items, setItems] = useState([]);
    const [searchValueCategory, setSearchValueCategory] = useState("");
    const [searchValueSerial, setSearchValueSerial] = useState("");
    const [searchValueActivo, setSearchValueActivo] = useState("");
    const [searchValueBrand, setSearchValueBrand] = useState("");
    const [searchValueModel, setSearchValueModel] = useState("");

    let searchedItems = [];
    let currentSearchValue = items

    useEffect(() => {        
        setLoading(true)
        setError("")        
        getAllItems({path: endPoints.items.getAllItems})
            .then(res => setItems(res.data))            
            .catch(error =>  setError(error))
            .finally(() => setLoading(false))
            // eslint-disable-next-line
    }, [upload])
    
    
    if (searchValueCategory.length >= 1) {
        searchedItems = currentSearchValue.filter((item) => {
            return item.category.name.toLowerCase().includes(searchValueCategory.toLowerCase());
        });
        currentSearchValue = searchedItems;
    }

    if (searchValueSerial.length >= 1) {
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
        searchedItems = items;
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

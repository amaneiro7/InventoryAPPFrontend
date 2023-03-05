import { useEffect, useState } from "react";
import { getAllItems } from "services/api";
import { getApiUrl } from "services/config";



export default function useGetSearch() {    
    const [items, setItems] = useState([]);
    const [loading,  setLoading] = useState(true);
    const [error, setError] = useState(false);
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
        getAllItems({path: `${getApiUrl}items`})
            .then(res => setItems(res.data))            
            .catch(error =>  setError(error))
            .finally(() => setLoading(false))
            // eslint-disable-next-line
    }, [])
    
    
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
        searchedItems = items;
    }
    
    return {
        loading, 
        error,
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

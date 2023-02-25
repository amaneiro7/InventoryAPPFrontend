import React, { useContext } from 'react';
import { InventaryContext } from "../useContext/index";
import './Home.css';
import { Input } from "../components/Input";

export function Home() {
    const { 
        searchedItems, 
        loading, 
        error,
        searchValueCategory,
        searchValueSerial,
        searchValueActivo,
        searchValueBranch,
        searchValueModel,
        setSearchValueCategory,
        setSearchValueSerial,
        setSearchValueActivo,
        setSearchValueBranch,
        setSearchValueModel,
    } = useContext(InventaryContext)
    return (
        <main className='main-inputs'>
            <h1>InventarioAPP</h1>
            <table className='main-table'>
                <tbody>
                    <tr className='main-table--title'>
                        <th>Categoria<Input value={"Categoria"} searchValue={searchValueCategory} setSearchValue={setSearchValueCategory} /></th>
                        <th>Serial<Input value={"Serial"} searchValue={searchValueSerial} setSearchValue={setSearchValueSerial} /></th>
                        <th>Activo<Input value={"Activo"} searchValue={searchValueActivo} setSearchValue={setSearchValueActivo} /></th>
                        <th>Marca<Input value={"Marca"} searchValue={searchValueBranch} setSearchValue={setSearchValueBranch} /></th>
                        <th>Modelo<Input value={"Modelo"} searchValue={searchValueModel} setSearchValue={setSearchValueModel} /></th>
                    </tr>
                    {searchedItems.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.category.name}</td>
                                <td>{item.serial}</td>
                                <td>{item.activo}</td>
                                <td>{item.branch.name}</td>
                                <td>{item.model.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}

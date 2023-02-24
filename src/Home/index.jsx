import React, { useContext } from 'react';
import { InventaryContext } from "../useContext/index";
import './Home.css';
import { Input } from "../components/Input";

export function Home() {
    const { items, loading, error, searchValue, setSearchValue } = useContext(InventaryContext)
    return (
        <main className='main-inputs'>
            <h1>InventarioAPP</h1>
            <table className='main-table'>
                <tbody>
                    <tr>                       
                        <th>Categoria<Input value={"Categoria"} searchValue={searchValue} setSearchValue={setSearchValue}/></th>
                        <th>Serial<Input value={"Serial"} searchValue={searchValue} setSearchValue={setSearchValue}/></th>
                        <th>Activo<Input value={"Activo"} searchValue={searchValue} setSearchValue={setSearchValue}/></th>
                        <th>Marca<Input value={"Marca"} searchValue={searchValue} setSearchValue={setSearchValue}/></th>
                        <th>Modelo<Input value={"Modelo"} searchValue={searchValue} setSearchValue={setSearchValue}/></th>
                    </tr>
                    {items.map(item => {
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

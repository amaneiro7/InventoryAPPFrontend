import React, { useContext } from 'react';
import { InventaryContext } from "../../useContext/index";
import { TableTitle } from "./TableTitle";
import { Button } from "../../UI/Button";
import { InventoryList } from './InventoryList/InventoryList';
import './Home.css';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();
    const {
        searchedItems,
        loading,
        error,
    } = useContext(InventaryContext)
    
    return (
        <main className='main-inputs'>
            <div>
                <h1>InventarioAPP</h1>
                <Button
                    name={"Agregar un nuevo Item"}
                    onHandle={() => navigate('addnewitem')}
                />
            </div>
            <table className='main-table'>
                <tbody>
                    <TableTitle />
                    {(!error && !loading) && <InventoryList />}
                </tbody>
            </table>
            {error && <p>Ha Ocurrirdo un error {error}</p>}
            {(loading && !error) && <p>...Loading</p>}
            {(!loading && searchedItems.length === 0) && <p>No se encuentra el elemento que esta buscando</p>}
        </main>
    )
}

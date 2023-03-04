import React, { useContext } from 'react';
import { InventaryContext } from "../../Hooks";
import { TableTitle } from "./TableTitle";
import { InventoryList } from './InventoryList/InventoryList';
import { Button } from "../../UI/Button";
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../UI/Loading';
import { Modal } from '../../UI/Modal';
import './Home.css';

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
            {(error && !loading) && <p>Ha Ocurrirdo un error {error}</p>}
            {(loading && !error) && <Loading />}
            {(!loading && !error && searchedItems.length === 0) && <p>No se encuentra el elemento que esta buscando</p>}
            {loading && <Modal>                
                {loading && <Loading/>}
            </Modal>}        
        </main>
    )
}

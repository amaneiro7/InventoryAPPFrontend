import React, { useContext } from 'react';
import { InventaryContext } from "../useContext/index";
import { TableTitle } from "../UI/TableTitle";
import { Button } from "../components/Button";
import { InventoryList } from './InventoryList/InventoryList';
import { Modal } from "../UI/Modal";
import { AddNewItemForm } from "../UI/AddNewItemForm";
import './Home.css';

export function Home() {
    const {
        searchedItems,
        loading,
        error,
        setOpenModal,
        openModal
    } = useContext(InventaryContext)

    const onHandleOpenModal = () => setOpenModal(true)
    return (
        <main className='main-inputs'>
            <div>
                <h1>InventarioAPP</h1>
                <Button
                    name={"Agregar un nuevo Item"}
                    onHandle={onHandleOpenModal}
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
            {openModal && (
                <Modal>
                    <AddNewItemForm />
                </Modal>
            )}
        </main>
    )
}

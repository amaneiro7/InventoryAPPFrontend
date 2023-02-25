import React, { useContext } from 'react';
import { InventaryContext } from "../useContext/index";
import './Home.css';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { InventoryList } from './InventoryList/InventoryList';
import { Modal } from "../Modal";
import { AddNewItemForm } from "../AddNewItemForm";

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
                    <tr className='main-table--title'>
                        <th>Categoria<Input value={"Categoria"} searchValue={searchValueCategory} setSearchValue={setSearchValueCategory} /></th>
                        <th>Serial<Input value={"Serial"} searchValue={searchValueSerial} setSearchValue={setSearchValueSerial} /></th>
                        <th>Activo<Input value={"Activo"} searchValue={searchValueActivo} setSearchValue={setSearchValueActivo} /></th>
                        <th>Marca<Input value={"Marca"} searchValue={searchValueBranch} setSearchValue={setSearchValueBranch} /></th>
                        <th>Modelo<Input value={"Modelo"} searchValue={searchValueModel} setSearchValue={setSearchValueModel} /></th>
                    </tr>
                    {(!error && !loading) && <InventoryList/>}
                </tbody>
                    {error && <p>Ha Ocurrirdo un error {error}</p>}
                    {(loading && !error) && <p>...Loading</p>}
                    {(!loading && searchedItems.length === 0) && <p>No se encuentra el elemento que esta buscando</p>}
            </table>
            {openModal && (
                <Modal>
                    <AddNewItemForm/>
                </Modal>
            )}
        </main>
    )
}

import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'UI/Loading';
import { Modal } from 'UI/Modal';
import { Button } from "UI/Button";
import './Home.css';

const TableTitle = lazy(() => import('./TableTitle'))
const InventoryList = lazy(() => import('./InventoryList/'))

export default function Home() {
    const navigate = useNavigate();        
    
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
                    <Suspense fallback={
                        <Modal>
                            <Loading/>
                        </Modal>
                    }>
                        <TableTitle />                      
                    </Suspense>
                    <Suspense fallback={
                        <Modal>
                            <Loading/>
                        </Modal>
                    }>
                        <InventoryList />
                    </Suspense>
                </tbody>
            </table>
        </main>
    )
}

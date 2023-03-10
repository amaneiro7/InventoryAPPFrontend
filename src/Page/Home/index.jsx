import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const TableTitle = lazy(() => import('../../UI/Organisms/TableTitle'))
const InventoryList = lazy(() => import('../../UI/Organisms/InventoryList'))
const Loading = lazy(() => import('UI/Atoms/Loading'));
const Modal = lazy(() => import('UI/Atoms/Modal'));
const Button = lazy(() => import('UI/Atoms/Button'));

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

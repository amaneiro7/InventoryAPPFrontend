import React, { lazy, Suspense, useContext } from 'react';
import { InventaryContext } from 'context';
import ErrorBoundary from 'App/ErrorBoundary';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const LoadingTable = lazy(() => import('UI/Atoms/LoadingTable'));
const TableTitle = lazy(() => import('Page/Home/TableTitle'))
const InventoryList = lazy(() => import('Page/Home/InventoryList'))
const Loading = lazy(() => import('UI/Atoms/Loading'));
const Button = lazy(() => import('UI/Atoms/Button'));

export default function Home() {
    const { searchedItems, items } = useContext(InventaryContext)
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
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingTable />}>
                            <TableTitle />
                        </Suspense>
                    </ErrorBoundary>                    
                    {items && <ErrorBoundary>
                        <Suspense fallback={<LoadingTable />}>
                            <InventoryList 
                            searchedItems={searchedItems}/>
                        </Suspense>
                    </ErrorBoundary>}
                </tbody>
            </table>
            {!items && <Loading/>}
            {(items && searchedItems.length === 0) && <p>No hay ningun dispositivo que coincida con las búsqueda</p>}
        </main>
    )
}

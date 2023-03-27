import React, { lazy, Suspense, useRef, useContext } from 'react';
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
    const tableRef = useRef(null)
    const navigate = useNavigate();

    const exportExcel = () => {
        import('Hooks/useExportToExcel').then(module =>
            module.exportToExcel(tableRef.current)
        )
    }
    
    return (
        <main className='main-inputs'>
            <div>
                <h1>InventarioAPP</h1>
            </div>
                <Button
                    name={"Agregar un nuevo Item"}
                    onHandle={() => navigate('addnewitem')}
                />
                <Button
                    name={"Exportar"}
                    action={'saveType'}
                    onHandle={exportExcel}
                />
                <ErrorBoundary>
                    <Suspense fallback={<LoadingTable />}>
                        <TableTitle />
                    </Suspense>
                </ErrorBoundary>                    
            <table className='main-table' ref={tableRef}>
                <tbody>                    
                    <tr className='main-table--title'>
                        <th>Categoria</th>
                        <th>Serial</th>
                        <th>Activo</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Estado</th>
                        <th>Obsolescencia</th>
                    </tr>
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

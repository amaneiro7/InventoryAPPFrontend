import React, { lazy } from 'react';
import useGetSearch from 'Hooks/useGetDataHome';

const Input = lazy(() => import('UI/Atoms/Input'));

export default function TableTitle() {
    const {
        searchValueCategory,
        searchValueSerial,
        searchValueActivo,
        searchValueBrand,
        searchValueModel,
        setSearchValueCategory,
        setSearchValueSerial,
        setSearchValueActivo,
        setSearchValueBrand,
        setSearchValueModel,
    } = useGetSearch()
    
    return (
        <tr className='main-table--title'>
            <th>
                <h3>
                    Categoria
                </h3>
                <Input
                name={''}
                type={'text'}
                placeholder={"Categoria"}
                value={searchValueCategory.value}
                setInputValue={setSearchValueCategory} 
                isAutoFocus={true}
            />
            </th>
            <th>
                <h3>Serial</h3>
                <Input
                name={''}
                type={'text'}
                placeholder={"Serial"}
                value={searchValueSerial.value}
                setInputValue={setSearchValueSerial} 
                isAutoFocus={false}
            />
            </th>
            <th>
                <h3>Activo</h3>
                <Input
                name={''}
                type={'text'}
                placeholder={"Activo"}
                value={searchValueActivo.value}
                setInputValue={setSearchValueActivo} 
                isAutoFocus={false}
            />
            </th>
            <th>
                <h3>Marca</h3>
                <Input
                name={''}
                type={'text'}
                placeholder={"Marca"}
                value={searchValueBrand.value}
                setInputValue={setSearchValueBrand} 
                isAutoFocus={false}
            />
            </th>
            <th>
                <h3>Modelo</h3>
                <Input
                name={''}
                type={'text'}
                placeholder={"Modelo"}
                value={searchValueModel.value}
                setInputValue={setSearchValueModel} 
                isAutoFocus={false}
            />
            </th>
        </tr>
    )
}

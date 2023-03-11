import React, { Suspense, lazy, useContext } from 'react';
import { InventaryContext } from 'context';
import LoadingInput from 'UI/Atoms/LoadingInput';
import Select from 'UI/Atoms/Select';
import useGetAddData from 'Hooks/useGetData';

const Input = lazy(() => import('UI/Atoms/Input'));

export default function TableTitle() {
    const {
        state,
        dispatch
    } = useContext(InventaryContext)

    const { data: dataCategory } = useGetAddData({ endPoint: 'categories' })
    const { data: dataBrand } = useGetAddData({ endPoint: 'brand' })
    const { data: dataModel } = useGetAddData({ endPoint: 'models' })

    const onHandleInput = ({ target }) => {
        const { name, value } = target
        console.log(name, value);
        dispatch({ type: 'CHANGEVALUE', payload: { name, value } });
    };

    return (
        <tr className='main-table--title'>
            <th>
                <h3>
                    Categoria
                </h3>
                <Suspense fallback={<LoadingInput />}>
                    <Select
                        name={'searchValueCategory'}
                        value={state.searchValueCategory}
                        options={dataCategory}
                        placeholder={"-- Filtre por Categoria --"}
                        hidden={false}
                        disabled={false}
                        onChange={onHandleInput}
                        isDisabled={false}
                        isAutoFocus={false}
                    />
                </Suspense>
            </th>
            <th>
                <h3>Serial</h3>
                <Suspense fallback={<LoadingInput />}>
                    <Input
                        name={'searchValueSerial'}
                        type={'text'}
                        placeholder={"Serial"}
                        value={state.searchValueSerial}
                        onChange={onHandleInput}
                        isAutoFocus={true}
                    />
                </Suspense>
            </th>
            <th>
                <h3>Activo</h3>
                <Suspense fallback={<LoadingInput />}>
                    <Input
                        name={'searchValueActivo'}
                        type={'text'}
                        placeholder={"Activo"}
                        value={state.searchValueActivo}
                        onChange={onHandleInput}
                        isAutoFocus={false}
                    />
                </Suspense>
            </th>
            <th>
                <h3>Marca</h3>
                <Suspense fallback={<LoadingInput />}>
                    <Select
                        name={'searchValueBrand'}
                        value={state.searchValueBrand}
                        options={dataBrand}                        
                        placeholder={"-- Filtre por Marca --"}
                        hidden={false}
                        disabled={false}
                        onChange={onHandleInput}
                        isDisabled={false}
                        isAutoFocus={false}
                    />
                </Suspense>
            </th>
            <th>
                <h3>Modelo</h3>
                <Suspense fallback={<LoadingInput />}>
                    <Select
                        name={'searchValueModel'}
                        value={state.searchValueModel}
                        options={dataModel}                        
                        placeholder={"-- Filtre por Modelo --"}
                        hidden={false}
                        disabled={false}
                        onChange={onHandleInput}
                        isDisabled={false}
                        isAutoFocus={false}
                    />
                </Suspense>
            </th>
        </tr>
    )
}

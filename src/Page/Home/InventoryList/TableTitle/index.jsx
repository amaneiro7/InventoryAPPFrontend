import React, { Suspense, lazy, useContext, useTransition } from 'react';
import { InventaryContext } from 'context';
import LoadingInput from 'UI/Atoms/LoadingInput';

const Input = lazy(() => import('UI/Atoms/Input'));
const Select = lazy(() => import('UI/Atoms/Select'));
const Loading = lazy(() => import('UI/Atoms/Loading'));

export default function TableTitle() {
    const [isPending, startTransition] = useTransition();
    const {
        state,
        dataCategory,
        dataBrand,
        dataModel,
        dispatch
    } = useContext(InventaryContext)
    
    const onHandleInput = ({ target }) => {
        const { name, value } = target
        startTransition(() => {
            dispatch({ type: 'CHANGEVALUE', payload: { name, value } });
        })
    };   

    return (
        <tr className='main-table--title'>
            <th>
                <h3>
                    Categoria
                </h3>
                {isPending && <Loading/>}                
                <Suspense fallback={<LoadingInput />}>
                    {dataCategory &&
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
                            size='home'
                        />}
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
                        size='home'
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
                        size='home'
                    />
                </Suspense>
            </th>
            <th>
                <h3>Marca</h3>                
                <Suspense fallback={<LoadingInput />}>
                    {dataBrand &&
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
                            size='home'
                        />}
                </Suspense>
            </th>
            <th>
                <h3>Modelo</h3>                
                <Suspense fallback={<LoadingInput />}>
                    {dataModel &&
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
                            size='home'
                        />}
                </Suspense>
            </th>
        </tr>
    )
}
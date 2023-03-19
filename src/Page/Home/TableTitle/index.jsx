import React, { Suspense, lazy, useContext, useTransition, useEffect, useState } from 'react';
import { InventaryContext } from 'context';
import LoadingInput from 'UI/Atoms/LoadingInput';

const Input = lazy(() => import('UI/Atoms/Input'));
const Select = lazy(() => import('UI/Atoms/Select'));
const Loading = lazy(() => import('UI/Atoms/Loading'));

export default function TableTitle() {
    const [isPending, startTransition] = useTransition();
    const [setBrand, setDataBrand] = useState();
    const [setModel, setDataModel] = useState();
    const {
        state,
        dataCategory,
        items,
        dataBrand,
        dataModel,
        dispatch
    } = useContext(InventaryContext)

    useEffect(() => {
        if (state.searchValueCategory === "") {
            setDataBrand(dataBrand)
            return
        }
        let brandList = []
        const brandFiltered = items.filter(item => item.category.id === Number(state.searchValueCategory))

        brandFiltered.forEach(item => {
            if (!brandList.some(brand => brand.id === item.brand.id)) {
                brandList.push(item.brand)
            }
        });
        setDataBrand(brandList)
    }, [items, state.searchValueCategory, dataBrand])

    useEffect(() => {
        if (state.searchValueCategory === "" && state.searchValueBrand === "") {
            setDataModel(dataModel)
            return
        }
        let modelList = []
        const modelFiltered = items.filter(item => 
            item.category.id === Number(state.searchValueCategory) || 
            item.brand.id === Number(state.searchValueBrand)
            )
        modelFiltered.forEach(item => {
            if (!modelList.some(model => model.id === item.model.id)) {
                modelList.push(item.model)
            }
        })
        setDataModel(modelList)
    }, [items, state.searchValueCategory, state.searchValueBrand, dataModel])

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
                {isPending && <Loading />}
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
                            options={setBrand}
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
                            options={setModel}
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

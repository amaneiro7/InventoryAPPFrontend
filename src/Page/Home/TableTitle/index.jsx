import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { InventaryContext } from 'context';
import LoadingInput from 'UI/Atoms/LoadingInput';
import './TableTitle.css'

const Input = lazy(() => import('UI/Atoms/Input'));
const Select = lazy(() => import('UI/Atoms/Select'));

export default function TableTitle() {

    const [setBrand, setDataBrand] = useState();
    const [setModel, setDataModel] = useState();
    const {
        state,
        dataStatus,
        dataObsolete,
        dataCategory,
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
        const brandFiltered = dataModel.filter(brand => brand.category.id === Number(state.searchValueCategory))

        brandFiltered.forEach(item => {
            if (!brandList.some(brand => brand.id === item.brand.id)) {
                brandList.push(item.brand)
            }
        });
        setDataBrand(brandList)
    }, [dataModel, state.searchValueCategory, dataBrand])

    useEffect(() => {
        // funcion auxiliar que filtra el modelo segun los parametros
        const filterModel = (category, brand) => {
            return dataModel.filter(model =>
                (category === "" || model.category.id === Number(category)) &&
                (brand === "" || model.brand.id === Number(brand))
            );
        }
        // si no hay ningun parametro de busqueda, se usa el modelo original
        if (state.searchValueCategory === "" && state.searchValueBrand === "") {
            setDataModel(dataModel)
            return
        }
        //si hay algun parametro de busqueda, se llama a la funcion uxiliar
        const modelFiltered = filterModel(
            state.searchValueCategory,
            state.searchValueBrand
        );
        setDataModel(modelFiltered)
    }, [state.searchValueCategory, state.searchValueBrand, dataModel])

    const isDisabled = !dataCategory ? true : false

    const onHandleInput = ({ target }) => {
        let { name, value } = target
        dispatch({ type: 'CHANGEVALUE', payload: { name, value } });
        console.log(name, value);
    };

    const onHandleInput2 = ({ target }) => {
        let { name, value } = target
        const trueFalseValue = {
            true: true,
            false: false,
            '': undefined
        }
        value = trueFalseValue[value]
        dispatch({ type: 'CHANGEVALUE', payload: { name, value } });
    }


    return (
        <div className='TableTitle__container'>
            <div className='TableTitle__inputs'>
                <h3>Categoria</h3>
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
                            isDisabled={isDisabled}
                            isAutoFocus={false}
                            size='home'
                        />}
                </Suspense>
            </div>
            <div className='TableTitle--Inputs'>
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
            </div>
            <div className='TableTitle--Inputs'>
                <h3>Activo</h3>
                <Suspense fallback={<LoadingInput />}>
                    <Input
                        name={'searchValueActivo'}
                        type={'text'}
                        placeholder={"Activo"}
                        value={state.searchValueActivo}
                        onChange={onHandleInput}
                        isAutoFocus={isDisabled}
                        size='home'
                    />
                </Suspense>
            </div>
            <div className='TableTitle--Inputs'>
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
                            isDisabled={isDisabled}
                            isAutoFocus={false}
                            size='home'
                        />}
                </Suspense>
            </div>
            <div className='TableTitle--Inputs'>
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
                            isDisabled={isDisabled}
                            isAutoFocus={false}
                            size='home'
                        />}
                </Suspense>
            </div>
            <div className='TableTitle--Inputs'>
                <h3>Estado</h3>
                <Suspense fallback={<LoadingInput />}>
                    <Select
                        name={'statusInput'}
                        value={state.statusInput}
                        options={dataStatus}
                        placeholder={"-- Filtre por Estado --"}
                        hidden={false}
                        disabled={false}
                        onChange={onHandleInput2}
                        isDisabled={isDisabled}
                        isAutoFocus={false}
                        size='home'
                    />
                </Suspense>
            </div>
            <div className='TableTitle--Inputs'>
                <h3>Obsoletos</h3>
                <Suspense fallback={<LoadingInput />}>
                    <Select
                        name={'obsoleteInput'}
                        value={state.obsoleteInput}
                        options={dataObsolete}
                        placeholder={"-- Filtre por Obsoleto --"}
                        hidden={false}
                        disabled={false}
                        onChange={onHandleInput2}
                        isDisabled={isDisabled}
                        isAutoFocus={false}
                        size='home'
                    />
                </Suspense>
            </div>
        </div>
    )
}

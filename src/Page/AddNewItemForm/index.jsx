import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventaryContext } from "../../Hooks";
import { useCreateAddData } from '../../Hooks/useCreateAddData';
import { useGetAddData } from '../../Hooks/useGetAddData';
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Select } from "../../UI/Select";
import { Modal } from "../../UI/Modal";
import { CreateNewBrandForm } from './CreateNewBrandForm';
import { CreateNewCategoryForm } from './CreateNewCategoryForm';
import { CreateNewModelForm } from './CreateNewModelForm';
import './AddNewItemForm.css'


export function AddNewItemForm() {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const { openModal, setOpenModal } = useContext(InventaryContext)
    const [openModalCategoy,setOpenModalCategory] = useState(false);
    const [openModalBrand,setOpenModalBrand] = useState(false);
    const [openModalModel,setOpenModalModel] = useState(false);
    const {createNewItem, loading, error, statusData} = useCreateAddData()
    const {
        categories,
        brands,
        models,
        category,
        serial,
        activo,
        brand,
        model,
        setCategory,
        setSerial,
        setActivo,
        setBrand,
        setModel
    } = useGetAddData()


    const onClose = () => { navigate('/') }
    const onOpenModalCategory = () => {
        setOpenModalBrand(false)
        setOpenModalModel(false)
        setOpenModalCategory(true)
        setOpenModal(true)
    }
    const onOpenModalBrand = () => {
        setOpenModalModel(false)
        setOpenModalCategory(false)
        setOpenModalBrand(true)
        setOpenModal(true)
    }
    const onOpenModalModel = () => {
        setOpenModalBrand(false)
        setOpenModalCategory(false)
        setOpenModalModel(true)
        setOpenModal(true)
    }

    const onSubmit = (e) => {        
        const formData = new FormData(formRef.current)
        const valueSerial = formData.get('serial') === "" ? null : (formData.get('serial')).trim().toUpperCase()
        const valueActivo = formData.get('activo') === "" ? null : (formData.get('activo')).trim().toUpperCase()
        const data = {
            serial: valueSerial,
            activo: valueActivo,
            categoryId: formData.get('categoryId'),
            brandId: formData.get('brandId'),
            modelId: formData.get('modelId'),
        }
        createNewItem(data)
    }

    return (
        <>
            <form className='AddNewItemForm' ref={formRef} onSubmit={onSubmit}>
                <h1>Agrega un nuevo elemento</h1>

                {(!loading && !error) &&
                    <div className='AddNewItemForm--container'>
                        <div className='AddNewItemForm--select'>
                            <Select
                                name={'categoryId'}
                                setValue={setCategory}
                                isDisabled={false}
                                options={categories}
                                placeholder={'-- Seleccione la categoria --'}
                                autoFocus={true}
                            />
                            <Button
                                type={'button'}
                                name={'+'}
                                onHandle={onOpenModalCategory}
                            />
                        </div>

                        <div className='AddNewItemForm--input'>
                            <Input
                                name={'serial'}
                                type={'text'}
                                placeholder={'-- Ingrese el Serial --'}
                                value={serial}
                                setInputValue={setSerial}
                                required={true}
                                autoFocus={false}
                            />
                        </div>

                        <div className='AddNewItemForm--input'>
                            <Input
                                name={'activo'}
                                type={'text'}
                                placeholder={'-- Ingrese el Activo --'}
                                value={activo}
                                setInputValue={setActivo}
                                required={true}
                                autoFocus={false}
                            />
                        </div>
                        <div className='AddNewItemForm--select'>
                            <Select
                                name={'brandId'}
                                isDisabled={!category ? true : false}
                                setValue={setBrand}
                                options={brands}
                                placeholder={'-- Seleccione la Marca --'}
                                autoFocus={false}
                            />
                            <Button
                                type={'button'}
                                name={'+'}
                                onHandle={onOpenModalBrand}
                            />
                        </div>
                        <div className='AddNewItemForm--select'>
                            <Select
                                name={'modelId'}
                                isDisabled={!brand ? true : false}
                                setValue={setModel}
                                options={models}
                                placeholder={'-- Seleccione el Model --'}
                                autoFocus={false}
                            />
                            <Button
                                type={'button'}
                                name={'+'}
                                onHandle={onOpenModalModel}
                            />
                        </div>
                    </div>}

                <div className="AddNewItemForm-btnContainer">
                    <Button
                        type={'button'}
                        name={'Cerrar'}
                        action={'cancelType'}
                        onHandle={onClose}
                    />
                    <Button
                        type={'submit'}
                        name={'Añadir'}
                        isDisabled={((!category || !brand || !model) || (serial === "" && activo === "") ) ? true : false}
                    />
                </div>
                {(loading && !error) && <p>Se esta Enviando</p>}
                {(!loading && statusData.status === 201) && <p>{statusData.statusText}</p>}
                {(error && !loading) && <p>{statusData.error[0].message}</p>}
            </form>
            {openModal && <Modal>
                {openModalCategoy && <CreateNewCategoryForm />}
                {openModalBrand && <CreateNewBrandForm />}
                {openModalModel && <CreateNewModelForm brands={brands} />}
            </Modal>}
        </>
    )
}

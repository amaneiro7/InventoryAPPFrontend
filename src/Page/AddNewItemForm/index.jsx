import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventaryContext } from "../../useContext/index";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Select } from "../../UI/Select";
import { useGetAddData } from '../../useContext/useGetAddData';
import { Modal } from "../../UI/Modal";
import './AddNewItemForm.css'
import { CreateNewBranchForm } from './CreateNewBranchForm';
import { CreateNewCategoryForm } from './CreateNewCategoryForm';
import { CreateNewModelForm } from './CreateNewModelForm';
import { createItems } from '../../services/addData';


export function AddNewItemForm() {
    const { openModal, setOpenModal } = useContext(InventaryContext)
    const [openModalCategoy,setOpenModalCategory] = useState(false);
    const [openModalBrand,setOpenModalBrand] = useState(false);
    const [openModalModel,setOpenModalModel] = useState(false);
    const navigate = useNavigate()
    const {
        loading,
        error,
        categories,
        branches,
        models,
        category,
        serial,
        activo,
        branch,
        setCategory,
        setSerial,
        setActivo,
        setBranch,
        setModel
    } = useGetAddData()

    const formRef = useRef(null)

    const onClose = () => { navigate('/') }
    const onOpenModalCategory = () => {
        setOpenModalCategory(true)
        setOpenModal(true)
    }
    const onOpenModalBrand = () => {
        setOpenModalBrand(true)
        setOpenModal(true)
    }
    const onOpenModalModel = () => {
setOpenModalModel(true)
        setOpenModal(true)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const data = {
            serial: formData.get('serial'),
            activo: formData.get('activo'),
            categoryId: formData.get('categoryId'),
            branchId: formData.get('branchId'),
            modelId: formData.get('modelId'),
        }
        createItems(data)        
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
                            />
                        </div>
                        <div className='AddNewItemForm--select'>
                            <Select
                                name={'branchId'}
                                isDisabled={!category ? true : false}
                                setValue={setBranch}
                                options={branches}
                                placeholder={'-- Seleccione la Marca --'}
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
                                isDisabled={!branch ? true : false}
                                setValue={setModel}
                                options={models}
                                placeholder={'-- Seleccione el Model --'}
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
                    />
                </div>
            </form>
            {openModal && <Modal>
                {openModalCategoy && <CreateNewBranchForm />}
                {openModalBrand && <CreateNewCategoryForm />}
                {openModalModel && <CreateNewModelForm brands={branches} />}
            </Modal>}
        </>
    )
}

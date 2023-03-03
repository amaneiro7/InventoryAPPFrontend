import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventaryContext } from "../../Hooks";
import { CreateNewBrandForm } from './CreateNewBrandForm';
import { CreateNewCategoryForm } from './CreateNewCategoryForm';
import { CreateNewModelForm } from './CreateNewModelForm';
import { FormModal } from './FormModal';
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Select } from "../../UI/Select";
import { Modal } from "../../UI/Modal";
import { AddIcon } from '../../UI/Icon/AddIcon';
import { EditIcon } from '../../UI/Icon/EditIcon';
import { DeleteIcon } from '../../UI/Icon/DeleteIcon';
import endPoints from '../../services/endPoint';
import './AddNewItemForm.css'


export function AddNewItemForm() {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const { 
        openModal, 
        setOpenModal, 
        loading, 
        error, 
        categories,
        brands,
        models,
        category,
        serial,
        activo,
        brand,
        model,
        upload,
        setCategory,
        setSerial,
        setActivo,
        setBrand,
        setModel,
        statusData,
        createNewItem } = useContext(InventaryContext)
    const [openModalCategoy, setOpenModalCategory] = useState(false);
    const [openModalBrand, setOpenModalBrand] = useState(false);
    const [openModalModel, setOpenModalModel] = useState(false);
    const [openModalFormModal, setOpenModalFormModal] = useState(false);
    const [mode, setMode] = useState("");
    const [targetMode, setTargetMode] = useState("");

    const onClose = () => { navigate('/') }
    function onOpenModalCategory({modeUI, targetModeUI}) {           
        setMode(modeUI)
        setTargetMode(targetModeUI)
        setOpenModalBrand(false)
        setOpenModalModel(false)
        setOpenModalCategory(false)
        setOpenModalFormModal(true)
        setOpenModal(true)
    }
    const onOpenModalBrand = ({modeUI}) => {
        setMode(modeUI)
        setOpenModalModel(false)
        setOpenModalCategory(false)
        setOpenModalBrand(true)
        setOpenModal(true)
    }
    const onOpenModalModel = ({modeUI}) => {
        setMode(modeUI)
        setOpenModalBrand(false)
        setOpenModalCategory(false)
        setOpenModalModel(true)
        setOpenModal(true)
    }

    const onSubmit = (e) => {
        e.preventDefault();
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
        setSerial("")
        setActivo("")
        createNewItem({path:endPoints.items.createItem, data})
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
                                isAutoFocus={true}
                            />
                            <AddIcon                                
                                onHandle={() => onOpenModalCategory({modeUI: "add", targetModeUI: "Category"})}
                                />
                            <EditIcon
                                onHandle={() => onOpenModalCategory({modeUI: "edit", targetModeUI: "Category"})}
                                />
                            <DeleteIcon
                                onHandle={() => onOpenModalCategory({modeUI: "delete", targetModeUI: "Category"})}
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
                                isAutoFocus={false}
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
                                isAutoFocus={false}
                            />
                        </div>
                        <div className='AddNewItemForm--select'>
                            <Select
                                name={'brandId'}
                                isDisabled={!category ? true : false}
                                setValue={setBrand}
                                options={brands}
                                placeholder={'-- Seleccione la Marca --'}
                                isAutoFocus={false}
                            />
                            <AddIcon                                
                                onHandle={() => onOpenModalBrand({modeUI: "add"})}                                
                                />
                            <EditIcon
                                onHandle={() => onOpenModalBrand({modeUI: "edit"})}                                
                                />
                            <DeleteIcon
                                onHandle={() => onOpenModalBrand({modeUI: "delete"})}                                
                            />
                        </div>
                        <div className='AddNewItemForm--select'>
                            <Select
                                name={'modelId'}
                                isDisabled={!brand ? true : false}
                                setValue={setModel}
                                options={models}
                                placeholder={'-- Seleccione el Model --'}
                                isAutoFocus={false}
                            />
                            <AddIcon                                
                                onHandle={() => onOpenModalModel({modeUI: "add"})}                                
                                />
                            <EditIcon
                                onHandle={() => onOpenModalModel({modeUI: "edit"})}                                
                                />
                            <DeleteIcon
                                onHandle={() => onOpenModalModel({modeUI: "delete"})}                                
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
                        isDisabled={((!category || !brand || !model) || (serial === "" && activo === "")) ? true : false}
                    />
                </div>
                {(upload && !error) && <p>Se esta Enviando</p>}
                {(!loading && statusData.status === 201) && <p>{statusData.statusText}</p>}
                {(error && !loading) && <p>{statusData.error[0].message}</p>}
            </form>
            {openModal && <Modal>
                {openModalCategoy && <CreateNewCategoryForm mode={mode} setMode={setMode}/>}
                {openModalFormModal && <FormModal mode={mode} setMode={setMode} targetMode={targetMode} setTargetMode={setTargetMode} />}
                {openModalBrand && <CreateNewBrandForm />}
                {openModalModel && <CreateNewModelForm brands={brands} />}
            </Modal>}
        </>
    )
}
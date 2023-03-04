import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventaryContext } from "../../Hooks";
import { getApiUrl } from '../../services/config';
import { FormModal } from './FormModal';
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Select } from "../../UI/Select";
import { Modal } from "../../UI/Modal";
import { AddIcon } from '../../UI/Icon/AddIcon';
import { EditIcon } from '../../UI/Icon/EditIcon';
import { DeleteIcon } from '../../UI/Icon/DeleteIcon';
import { Loading } from '../../UI/Loading';
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

    const [mode, setMode] = useState("");
    const [targetMode, setTargetMode] = useState("");

    const onClose = () => { navigate('/') }

    function onOpenModal({modeUI, targetModeUI}) {           
        setMode(modeUI)
        setTargetMode(targetModeUI)        
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
        createNewItem({path: `${getApiUrl}`, data})
    }

    return (
        <>
            <form className='AddNewItemForm' ref={formRef} onSubmit={onSubmit}>
                <h1>Agrega un nuevo elemento</h1>

                {<div className='AddNewItemForm--container'>
                        <div className='AddNewItemForm--field'>
                            <AddIcon                                
                                onHandle={() => onOpenModal({modeUI: "add", targetModeUI: "Category"})}
                            />
                            <Select
                                name={'categoryId'}
                                setValue={setCategory}
                                isDisabled={false}
                                options={categories}
                                placeholder={'-- Seleccione la categoria --'}
                                isAutoFocus={true}
                            />
                            <div>
                                <EditIcon
                                    onHandle={() => onOpenModal({modeUI: "edit", targetModeUI: "Category"})}
                                />
                                <DeleteIcon
                                    onHandle={() => onOpenModal({modeUI: "delete", targetModeUI: "Category"})}
                                />
                            </div>
                        </div>

                        <div className='AddNewItemForm--field'>
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

                        <div className='AddNewItemForm--field'>
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
                        <div className='AddNewItemForm--field'>
                            <AddIcon                                
                                onHandle={() => onOpenModal({modeUI: "add", targetModeUI: "Brand"})}
                            />
                            <Select
                                name={'brandId'}
                                isDisabled={!category ? true : false}
                                setValue={setBrand}
                                options={brands}
                                placeholder={'-- Seleccione la Marca --'}
                                isAutoFocus={false}
                            />
                            <div>
                                <EditIcon
                                    onHandle={() => onOpenModal({modeUI: "edit", targetModeUI: "Brand"})}
                                />
                                <DeleteIcon
                                    onHandle={() => onOpenModal({modeUI: "delete", targetModeUI: "Brand"})}
                                />
                            </div>
                        </div>
                        <div className='AddNewItemForm--field'>
                            <AddIcon                                
                                onHandle={() => onOpenModal({modeUI: "add", targetModeUI: "Model"})}
                            />
                            <Select
                                name={'modelId'}
                                isDisabled={!brand ? true : false}
                                setValue={setModel}
                                options={models}
                                placeholder={'-- Seleccione el Model --'}
                                isAutoFocus={false}
                                />
                            <div>
                                <EditIcon
                                    onHandle={() => onOpenModal({modeUI: "edit", targetModeUI: "Model"})}
                                />
                                <DeleteIcon
                                    onHandle={() => onOpenModal({modeUI: "delete", targetModeUI: "Model"})}
                                />
                            </div>
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
                {(!openModal && upload && !error) && <p>Se esta Enviando</p>}
                {(!openModal && !loading && statusData.status === 201) && <p>{statusData.statusText}</p>}
                {!openModal && (error && !loading) && <p>{statusData.error[0].message}</p>}
            </form>
            {(openModal || loading) && <Modal>
                {openModal &&<FormModal mode={mode} setMode={setMode} targetMode={targetMode} setTargetMode={setTargetMode} />}
                {loading && <Loading/>}
            </Modal>}
        </>
    )
}
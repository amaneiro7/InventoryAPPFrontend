import React, { useContext, useRef } from 'react';
import { InventaryContext } from "../../useContext/index";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { useGetAddData } from '../../useContext/useGetAddData';
import './AddNewItemForm.css'


export function AddNewItemForm() {
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
        model,
        setCategory,
        setSerial,
        setActivo,
        setBranch,
        setModel
    } = useGetAddData()

    const formRef = useRef(null)
    const { setOpenModal } = useContext(InventaryContext)

    const onClose = () => {
        setOpenModal(false)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)     
        const addItem = {
            serial: formData.get('serial'),
            activo: formData.get('activo'),
            categoryId: formData.get('categoryId'),
            branchId: formData.get('branchId'),
            modelId: formData.get('modelId'),
        }
        console.log(addItem);        
    }

    return (
        <form className='AddNewItemForm' ref={formRef} onSubmit={onSubmit}>
            <p>Agrega un nuevo elemento</p>

            {(!loading && !error) && 
            <div className='AddNewItemForm--container'>
                <Select
                    name={'categoryId'}
                    setValue={setCategory}
                    isDisabled={false}
                    options={categories}
                    placeholder={'-- Seleccione la categoria --'}
                />

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

                <Select
                    name={'branchId'}
                    isDisabled={!category ? true : false}
                    setValue={setBranch}
                    options={branches}
                    placeholder={'-- Seleccione la Marca --'}
                />
                
                <Select
                    name={'modelId'}
                    isDisabled={!branch ? true : false}
                    setValue={setModel}
                    options={models}
                    placeholder={'-- Seleccione el Model --'}
                />
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
    )
}

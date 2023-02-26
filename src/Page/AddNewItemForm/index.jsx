import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventaryContext } from "../../useContext/index";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Select } from "../../UI/Select";
import { useGetAddData } from '../../useContext/useGetAddData';
import { Modal } from "../../UI/Modal";
import './AddNewItemForm.css'


export function AddNewItemForm() {
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
    const { setOpenModal } = useContext(InventaryContext)

    const onClose = () => {navigate('/')}
    const onOpenModal = () => setOpenModal(true)

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
        <>
        <form className='AddNewItemForm' ref={formRef} onSubmit={onSubmit}>
            <p>Agrega un nuevo elemento</p>

            {(!loading && !error) &&
                <div className='AddNewItemForm--container'>
                    <div>

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
                            onHandle={onOpenModal}
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
        <Modal>
            
        </Modal>
        </>
    )
}

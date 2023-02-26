import React, { useContext, useRef } from 'react';
import { createModels } from '../../../services/addData';
import { Button } from '../../../UI/Button';
import { Input } from '../../../UI/Input';
import { Select } from '../../../UI/Select';
import { InventaryContext } from '../../../useContext';

export function CreateNewModelForm({ brands }) {
    const { setOpenModal } = useContext(InventaryContext)
    const formRef = useRef(null)

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const data = {
            name: formData.get('name')
        }
        createModels(data)
    }

    const onClose = () => setOpenModal(false)
    return (
        <form
            className='AddNewItemForm'
            ref={formRef}
            onSubmit={onSubmit}
        >
            <div className='AddNewItemForm--container'>                
                <h3>Agrega el nuevo Modelo</h3>
                <div className='AddNewItemForm--input'>
                    <Input
                        type='text'
                        placeholder='Ingresa el nuevo Modelo'
                        name={'name'}
                        required={true}
                    />
                </div>
                <Select
                    name={'branchId'}
                    isDisabled={false}                    
                    options={brands}
                    placeholder={'-- Seleccione la Marca --'}
                />
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
            </div>
        </form>
    )
}

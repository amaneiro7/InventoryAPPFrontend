import React, { useContext, useRef } from 'react';
import { createBrands } from '../../../services/addData';
import { Button } from '../../../UI/Button';
import { Input } from '../../../UI/Input';
import { InventaryContext } from '../../../useContext';

export function CreateNewBranchForm() {
    const {setOpenModal} = useContext(InventaryContext)
    const formRef = useRef(null)
    
    const onSubmit = (e) => {
        e.preventDefault();        
        const formData = new FormData(formRef.current)
        const data = {
            name: formData.get('name')
        }        
        createBrands(data)
    }

    const onClose = () => setOpenModal(false)
    return (
        <form
            className='AddNewItemForm'
            ref={formRef}
            onSubmit={onSubmit}
        >
            <div className='AddNewItemForm--container'>
                <div className='AddNewItemForm--title'>
                    <h2>Create new brand</h2>
                </div>
                <div className='AddNewItemForm--input'>
                    <Input
                        type='text'
                        placeholder='Ingresa la nueva Marca'
                        name={'name'}                        
                        required={true}
                    />
                </div>
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

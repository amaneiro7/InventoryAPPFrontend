import React, { useContext, useRef } from 'react';
import { createCategories } from '../../../services/addData';
import { Button } from '../../../UI/Button';
import { Input } from '../../../UI/Input';
import { InventaryContext } from '../../../Hooks';

export function CreateNewCategoryForm() {
    const {setOpenModal} = useContext(InventaryContext)
    const formRef = useRef(null)
    
    const onSubmit = (e) => {
        e.preventDefault();        
        const formData = new FormData(formRef.current)
        const data = {
            name: formData.get('name')
        }        
        createCategories(data)
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
                    <h2>Crea una nueva categoria</h2>
                </div>
                <div className='AddNewItemForm--input'>
                    <Input
                        type='text'
                        placeholder='Ingresa la nueva Categoria'
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

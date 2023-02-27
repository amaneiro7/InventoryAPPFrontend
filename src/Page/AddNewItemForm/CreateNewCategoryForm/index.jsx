import React, { useContext, useRef, useState } from 'react';
import { useCreateAddData } from '../../../Hooks/useCreateAddData';
import { Button } from '../../../UI/Button';
import { Input } from '../../../UI/Input';
import { InventaryContext } from '../../../Hooks';

export function CreateNewCategoryForm() {
    const {setOpenModal} = useContext(InventaryContext);
    const [input, setInput ] = useState("");
    const {createNewCategory, loading, error, statusData} = useCreateAddData()
    const formRef = useRef(null)
    
    const onSubmit = (e) => {             
        const formData = new FormData(formRef.current)
        const valueName = formData.get('name').trimStart().trimEnd().toLowerCase()
        const data = {
            name: valueName
        }         
        createNewCategory(data)
        setInput('')        
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
                        value={input}
                        setInputValue={setInput}
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
                        isDisabled={input === "" ? true : false}                    
                    />
                </div>
                {(loading && !error) && <p>Se esta Enviando</p>}
                {(!loading && statusData.status === 201) && <p>{statusData.statusText}</p>}
                {(error && !loading) && <p>{statusData.error[0].message}</p>}
            </div>
        </form>
    )
}

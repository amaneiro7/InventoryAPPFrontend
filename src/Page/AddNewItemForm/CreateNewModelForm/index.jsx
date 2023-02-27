import React, { useContext, useRef, useState } from 'react';
import { useCreateAddData } from '../../../Hooks/useCreateAddData';
import { Button } from '../../../UI/Button';
import { Input } from '../../../UI/Input';
import { Select } from '../../../UI/Select';
import { InventaryContext } from '../../../Hooks';

export function CreateNewModelForm({ brands }) {
    const { setOpenModal } = useContext(InventaryContext)
    const [input, setInput ] = useState("");
    const {createNewModel, loading, error, statusData} = useCreateAddData()
    const formRef = useRef(null)

    const onSubmit = (e) => {        
        const formData = new FormData(formRef.current)
        const valueName = formData.get('name').trimStart().trimEnd().toLowerCase()
        const data = {
            name: valueName,
            brandId: formData.get('brandId'),
        }
        createNewModel(data)
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
                <h3>Agrega el nuevo Modelo</h3>
                <div className='AddNewItemForm--input'>
                    <Input
                        type='text'
                        placeholder='Ingresa el nuevo Modelo'
                        name={'name'}
                        value={input}
                        setInputValue={setInput}
                        isAutoFocus={true}
                        required={true}
                    />
                </div>
                <Select
                    name={'brandId'}
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

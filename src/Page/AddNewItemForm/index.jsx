import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "UI/Button";
import { Input } from "UI/Input";
import SelectForm from './SelectForm';
import './AddNewItemForm.css';
import './FormAddNewItem.css';
import { useReducerFromAddPage } from 'Hooks/useReducerFromAddPage';

export default function AddNewItemForm() {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const onClose = () => { navigate('/') }
    const { state, dispatch } = useReducerFromAddPage()

    const onHandleInput = (target) => {
        dispatch({ type: 'CHANGEVALUE', payload: target })
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
        console.log(data);
        // setSerial("")
        // setActivo("")
        // createNewItem({path: `${getApiUrl}`, data})
    }

    return (
        <>
            <form className='AddNewItemForm' ref={formRef} onSubmit={onSubmit}>
                <h1>Agrega un nuevo elemento</h1>

                <div className='AddNewItemForm--container'>
                    <SelectForm
                        name={'category'}
                        type={"CATEGORY"}
                        setValue={onHandleInput}
                        endPoint={'categories'}
                        placeholder={'la Categoria'}
                    />
                    <div className='AddNewItemForm--field'>
                        <Input
                            name={'serial'}
                            type={'text'}
                            placeholder={'-- Ingrese el Serial --'}
                            value={state.serial}
                            setInputValue={onHandleInput}
                            required={true}
                            isAutoFocus={false}
                        />
                    </div>

                    <div className='AddNewItemForm--field'>
                        <Input
                            name={'activo'}
                            type={'text'}
                            placeholder={'-- Ingrese el Activo --'}
                            value={state.activo}
                            setInputValue={onHandleInput}
                            required={true}
                            isAutoFocus={false}
                        />
                    </div>
                    <SelectForm
                        name={'brand'}
                        type={"BRAND"}
                        setValue={onHandleInput}
                        endPoint={`brand?category=${state.category}`}
                        placeholder={'la Marca'}
                        isDisabled={state.category === '' && true}
                    />
                    <SelectForm
                        name={'model'}
                        type={"MODEL"}
                        setValue={onHandleInput}
                        endPoint={`models?brandId=${state.brand}`}
                        placeholder={'el Modelo'}
                        isDisabled={state.brand === '' && true}
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
                    // isDisabled={((!category || !brand || !model) || (serial === "" && activo === "")) ? true : false}
                    />
                </div>
            </form>
        </>
    )
}
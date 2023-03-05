import React, { lazy, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "UI/Button";
import { Input } from "UI/Input";
import SelectForm from './SelectForm';
import { Loading } from 'UI/Loading';
import './AddNewItemForm.css';


export default function AddNewItemForm() {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const onClose = () => { navigate('/') }


    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        // const valueSerial = formData.get('serial') === "" ? null : (formData.get('serial')).trim().toUpperCase()
        // const valueActivo = formData.get('activo') === "" ? null : (formData.get('activo')).trim().toUpperCase()
        const data = {
            // serial: valueSerial,
            // activo: valueActivo,
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
                        name={'categoryId'}
                        type={"Category"}
                        endPoint={'categories'}
                        placeholder={'la Categoria'}
                    />
                    <div className='AddNewItemForm--field'>
                        <Input
                            name={'serial'}
                            type={'text'}
                            placeholder={'-- Ingrese el Serial --'}
                            // value={serial}
                            // setInputValue={setSerial}
                            required={true}
                            isAutoFocus={false}
                        />
                    </div>

                    <div className='AddNewItemForm--field'>
                        <Input
                            name={'activo'}
                            type={'text'}
                            placeholder={'-- Ingrese el Activo --'}
                            // value={activo}
                            // setInputValue={setActivo}
                            required={true}
                            isAutoFocus={false}
                        />
                    </div>
                    <SelectForm
                        name={'brandId'}
                        type={"Brand"}
                        endPoint={'brand'}
                        placeholder={'la Marca'}
                    />
                    <SelectForm
                        name={'modelId'}
                        type={"Model"}
                        endPoint={'models'}
                        placeholder={'el Modelo'}
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
                {/* {(!openModal && upload && !error) && <p>Se esta Enviando</p>}
                {(!openModal && !loading && statusData.status === 201) && <p>{statusData.statusText}</p>}
                {!openModal && (error && !loading) && <p>{statusData.error[0].message}</p>} */}
            </form>
            {/* {(openModal || loading) && <Modal>
                {openModal &&<FormModal mode={mode} setMode={setMode} targetMode={targetMode} setTargetMode={setTargetMode} />}
                {loading && <Loading/>}
            </Modal>} */}
        </>
    )
}
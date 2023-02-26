import React, { useContext, useEffect, useState, useRef } from 'react';
import { InventaryContext } from "../../useContext/index";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { getBranches, getCategories, getModels } from '../../services/getData';
import './AddNewItemForm.css'


export function AddNewItemForm() {
    const [categories, setCategories] = useState([])
    const [branches, setBranches] = useState([])
    const [models, setModels] = useState([])

    const [category, setCategory] = useState("")
    const [serial, setSerial] = useState("")
    const [activo, setActivo] = useState("")
    const [branch, setBranch] = useState("")    

    const formRef = useRef(null)

    const { setOpenModal, items } = useContext(InventaryContext)

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

    useEffect(() => {
        getCategories().then(res => setCategories(res.data))
        getBranches().then(res => setBranches(res.data))
    }, [])

    useEffect(() => { 
        let filteredBranch = []            
        if (branches.length >= 1) {
            filteredBranch = branches.filter((model) => {
                return model.id === Number(branch)
            });
        }
        const filteredModel = filteredBranch.map(elem => elem.model)
        setModels(filteredModel[0])
        }, [branch])
        
        
    return (
        <form className='AddNewItemForm' ref={formRef} onSubmit={onSubmit}>
            <p>Agrega un nuevo elemento</p>
            <div className='AddNewItemForm--container'>

                <div className='AddNewItemForm--input'>
                    <select defaultValue={'none'} name={'categoryId'} id="categoryId" onChange={({target: {value}}) => setCategory(value)} >Category
                        <option value={'none'} disabled hidden>-- Seleccione la categoria --</option>
                        {categories.map((category, index) =>
                            <option key={index} name={category.name} value={category.id}
                            >
                                {category.name}
                            </option>)}
                    </select>
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

                <div className='AddNewItemForm--input'>
                    <select defaultValue={'none'} name="branchId" id="branchId" disabled={!category} onChange={({target: {value}}) => setBranch(value)}>Marca
                        <option value={'none'} disabled hidden>-- Seleccione la Marca --</option>
                        {branches.map((branch, index) =>
                            <option key={index} name={branch.name} value={branch.id}>{branch.name}</option>)}
                    </select>
                </div>

                <div className='AddNewItemForm--input'>
                    <select defaultValue={'none'} name="modelId" id="modelId" disabled={!branch} >Modelo
                        <option value={'none'} disabled hidden>-- Seleccione el Modelo --</option>
                        {models.map((model, index) =>
                            <option key={index} name={model.name} value={model.id}>{model.name}</option>)}
                    </select>
                </div>
            </div>


            <div className="AddNewItemForm-btnContainer">
                <Button
                    type={'button'}
                    name={'Cerrar'}
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

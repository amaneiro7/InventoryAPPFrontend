import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "UI/Button";
import { Input } from 'UI/Input';
import { Loading } from "UI/Loading";
import { Modal } from "UI/Modal";
import { Select } from "UI/Select";
import useFetchingData from "Hooks/useFetchingData";
import useGetAddData from "Hooks/useGetData";
import { useReducerFromAddPage } from "Hooks/useReducerFromAddPage";

export default function ViewDetail() {
    // const { openModal, setLoading, gettingOneItem, deletingItem, categories, setCategory, brands, setBrand, models, setModel, serial, setSerial, activo, setActivo } = useContext(InventaryContext)
    
    const { fetchState, getOneData, updateData, deleteData } = useFetchingData
    const { state, dispatch } = useReducerFromAddPage();    
    const formRef = useRef(null)
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        let itemDetail
        if (location.state?.item) {            
            itemDetail = (location.state.item)
            console.log();   
        } 
        if ( itemDetail === "" ) {            
            getOneData({ endPoint: `/items/${id}` })
            itemDetail = fetchState.data
        }        
        dispatch({ type: 'VIEWDETAIL', payload: itemDetail})        
    },[id])

    // const onHandleInput = (target) => {
    //     dispatch({ type: "CHANGEVALUE", payload: target });
    // };
    
    const { data: dataCategory } = useGetAddData({ endPoint: 'categories' })
    const { data: dataBrand } = useGetAddData({ endPoint: `brand?category=${state.category}` })
    const { data: dataModels } = useGetAddData({ endPoint: `models?brandId=${state.brand}` })

    const onSubmit = () => {

    }

    // const onDelete = () => {
    //     deletingItem({ path: `${getApiUrl}/items/${id}` })
    //     setLoading(true)
    //     setTimeout(() => {
    //         navigate('/')
    //         setLoading(false)
    //         setCategory("")
    //         setSerial("")
    //         setActivo("")
    //         setBrand("")
    //         setModel("")
    //     }, 1000)
    // }


    const onClose = () => {
        dispatch({type: 'RESETVIEWDETAIL'})
        navigate("/")
    }

    console.log(dataCategory);
    console.log(state.category.id);
    console.log(state.model);
    return (
        <main className='main-inputs'>
            <div>
                <h1>Editar un elemento</h1>
                <form className="AddNewItemForm" ref={formRef} onSubmit={onSubmit}>
                    <div>
                        <div>
                            <label htmlFor="Categoria">Categoria</label>
                        </div>
                        <Select
                            name={'categoryId'}
                            // setValue={onHandleInput}
                            isDisabled={false}
                            options={dataCategory}
                            defaultValue={state.category.id}
                            placeholder={'-- Seleccione la categoria --'}
                            isAutoFocus={true}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="Serial">Serial</label>
                        </div>
                        <Input
                            name={'serial'}
                            type={'text'}
                            value={state.serial}
                            // setInputValue={onHandleInput}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="Activo">Activo</label>
                        </div>
                        <Input
                            name={'activo'}
                            type={'text'}
                            value={state.activo}
                            // setInputValue={onHandleInput}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="Marca">Marca</label>
                        </div>
                        <Select
                            name={'brandId'}
                            defaultValue={state.brand.id}
                            // setValue={onHandleInput}
                            isDisabled={false}
                            options={dataBrand}
                            placeholder={'-- Seleccione la categoria --'}
                            isAutoFocus={false}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="Modelo">Modelo</label>
                        </div>
                        <Select
                            name={'modelId'}
                            defaultValue={state.model.id}
                            // setValue={onHandleInput}
                            isDisabled={false}
                            options={dataModels}
                            placeholder={'-- Seleccione la categoria --'}
                            isAutoFocus={false}
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
                            name={'Guardar'}
                        // isDisabled={((!category || !brand || !model) || (serial === "" && activo === "")) ? true : false}
                        />
                        <Button
                            type={'button'}
                            name={'Eliminar'}
                            // onHandle={onDelete}
                        // isDisabled={((!category || !brand || !model) || (serial === "" && activo === "")) ? true : false}
                        />
                    </div>
                </form>
            </div>
            {(fetchState?.loading) && <Modal>
                {<Loading />}
            </Modal>}
        </main>
    )
}
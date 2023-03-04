import React, { useContext, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { InventaryContext } from "../../Hooks";
import { getApiUrl } from "../../services/config";
import { Button } from "../../UI/Button";
import { Input } from '../../UI/Input';
import { Loading } from "../../UI/Loading";
import { Modal } from "../../UI/Modal";
import { Select } from "../../UI/Select";

export function ViewDetail() {
    const { openModal, loading, gettingOneItem, categories, setCategory, brands, setBrand, models, setModel } = useContext(InventaryContext)
    const formRef = useRef(null)
    const location = useLocation();
    const { id } = useParams();    
    let itemDetail
    
        
                if (location.state?.item) {
                    itemDetail = (location.state.item)
                } else {
                    itemDetail = (itemDetail === "") && gettingOneItem(`${getApiUrl}/items/${id}`)
                }                
                setCategory(itemDetail?.category?.id)
                setBrand(itemDetail?.brand?.id)
                setModel(itemDetail?.model?.id)
        
    
    
    const onSubmit = () => {

    }
    return (
        <main className='main-inputs'>
            <div>
                <h1>Editar un elemento</h1>
                <form className="AddNewItemForm" ref={formRef} onSubmit={onSubmit}>
                    <div>
                        <div>
                            <label htmlFor={itemDetail?.category?.name}>{itemDetail?.category?.name}</label>
                        </div>
                            <Select
                                name={'categoryId'}
                                defaultValue={itemDetail?.category?.id}
                                setValue={setCategory}
                                isDisabled={false}
                                options={categories}
                                placeholder={'-- Seleccione la categoria --'}
                                isAutoFocus={true}
                            />
                    </div>
                    <div>
                        <div>
                            <label htmlFor={itemDetail?.serial}>{itemDetail?.serial}</label>
                        </div>
                        <Input id="" />
                    </div>
                    <div>
                        <div>
                            <label htmlFor={itemDetail?.activo}>{itemDetail?.activo}</label>
                        </div>
                        <Input id="" />
                    </div>
                    <div>
                        <div>
                            <label htmlFor={itemDetail?.brand?.name}>{itemDetail?.brand?.name}</label>
                        </div>
                            <Select
                                name={'brandId'}
                                defaultValue={itemDetail?.brand?.id}
                                setValue={setBrand}
                                isDisabled={false}
                                options={brands}
                                placeholder={'-- Seleccione la categoria --'}
                                isAutoFocus={false}
                            />
                    </div>
                    <div>
                        <div>
                            <label htmlFor={itemDetail?.model?.name}>{itemDetail?.model?.name}</label>
                        </div>
                            <Select
                                name={'modelId'}
                                defaultValue={itemDetail?.model?.id}
                                setValue={setModel}
                                isDisabled={false}
                                options={models}
                                placeholder={'-- Seleccione la categoria --'}
                                isAutoFocus={false}
                            />
                    </div>
                    <div className="AddNewItemForm-btnContainer">
                    <Button
                        type={'button'}
                        name={'Cerrar'}
                        action={'cancelType'}
                        // onHandle={onClose}
                    />
                    <Button
                        type={'submit'}
                        name={'Añadir'}
                        // isDisabled={((!category || !brand || !model) || (serial === "" && activo === "")) ? true : false}
                    />
                </div>
                </form>
            </div>
            {(openModal || loading) && <Modal>
                {loading && <Loading/>}
            </Modal>}
        </main>
    )
}
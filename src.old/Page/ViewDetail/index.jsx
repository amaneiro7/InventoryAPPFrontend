import React, { useContext, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { InventaryContext } from "context";
import { getApiUrl } from "services/config";
import { Button } from "UI/Button";
import { Input } from 'UI/Input';
import { Loading } from "UI/Loading";
import { Modal } from "UI/Modal";
import { Select } from "UI/Select";

export default function ViewDetail() {
    const { openModal, setLoading, loading, gettingOneItem, deletingItem, categories, setCategory, brands, setBrand, models, setModel, serial, setSerial, activo, setActivo } = useContext(InventaryContext)
    const formRef = useRef(null)
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    let itemDetail


    if (location.state?.item) {
        itemDetail = (location.state.item)
    } else {
        itemDetail = (itemDetail === "") && gettingOneItem({ path: `${getApiUrl}/items/${id}` })
    }
    setCategory(itemDetail?.category?.id)
    setSerial(itemDetail?.serial)
    setActivo(itemDetail?.activo)
    setBrand(itemDetail?.brand?.id)
    setModel(itemDetail?.model?.id)

    const onSubmit = () => {

    }

    const onDelete = () => {
        deletingItem({ path: `${getApiUrl}/items/${id}` })
        setLoading(true)
        setTimeout(() => {
            navigate('/')
            setLoading(false)
            setCategory("")
            setSerial("")
            setActivo("")
            setBrand("")
            setModel("")
        }, 1000)
    }


    const onClose = () => {
        setCategory("")
        setSerial("")
        setActivo("")
        setBrand("")
        setModel("")
        navigate("/")
    }
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
                            <label htmlFor="Serial">Serial</label>
                        </div>
                        <Input
                            name={'serial'}
                            type={'text'}
                            value={serial}
                            setInputValue={setSerial}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="Activo">Activo</label>
                        </div>
                        <Input
                            name={'activo'}
                            type={'text'}
                            value={activo}
                            setInputValue={setActivo}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="Marca">Marca</label>
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
                            <label htmlFor="Modelo">Modelo</label>
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
                            onHandle={onDelete}
                        // isDisabled={((!category || !brand || !model) || (serial === "" && activo === "")) ? true : false}
                        />
                    </div>
                </form>
            </div>
            {(openModal || loading) && <Modal>
                {loading && <Loading />}
            </Modal>}
        </main>
    )
}
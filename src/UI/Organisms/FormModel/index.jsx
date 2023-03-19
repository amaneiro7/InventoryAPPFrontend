import React, { useRef, useState, Suspense, lazy, useContext } from "react";
import useFetchingData from "Hooks/useFetchingData";
import { InventaryContext } from "context";

const Input = lazy(() => import("UI/Atoms/Input"))
const Select = lazy(() => import("UI/Atoms/Select"))
const Button = lazy(() => import("UI/Atoms/Button"))
const Loading = lazy(() => import("UI/Atoms/Loading"))
const MessageStatus = lazy(() => import("UI/Atoms/MessageStatus"))


export default function FormModel({ state, dispatch }) {
    const { modeUI, title, nameTitle, endPoint, button } = state;
    const { dataBrand, dataModel, setReload } = useContext(InventaryContext);

    const formRef = useRef(null);
    const [input, setInput] = useState("");
    const [brandValue, setBrandValue] = useState("");
    const [value, setValue] = useState("");
    const { fetchState, createData, deleteData, updateData } = useFetchingData();

    const onSubmit = (e) => {
        e.preventDefault();        
        let data = {};
        const formData = new FormData(formRef.current);
        const valueName = formData?.get("name")?.trimStart().trimEnd().toLowerCase();
        const id = Number(formData.get("id"));
        const brandId = Number(formData.get('brandId'))
        data = {
            name: valueName,
            brandId: brandId
        };

        switch (modeUI) {
            case 'ADD':
                createData({ endPoint, data })
                break;
            case 'EDIT':
                updateData({ endPoint, data, id })
                break;
            case 'DELETE':
                deleteData({ endPoint, data, id })
                break;
            default:
                break;
        }        
        setValue("")
        setBrandValue("")
        setInput("")
        setReload(true)
    }

    const onHandleInput = ({ target: { value } }) => {
        setValue(value)
        const dataIndex = dataModel.findIndex(elem => elem.id === Number(value))
        setInput(() => dataModel[dataIndex].name)
    }

    const onClose = () => {
        dispatch({ type: 'RESET' })
    };

    return (
        <form className="AddNewItem--Form" ref={formRef} onSubmit={onSubmit}>
            <div className="AddNewItem--Form--container">
                <div className="AddNewItemForm--title">
                    <h2>
                        {title} {nameTitle}
                    </h2>
                </div>
                {fetchState.loading && <Loading />}
                {!fetchState.loading &&
                    <Suspense fallback={<Loading />}>
                        {<Select
                            name={"brandId"}
                            value={brandValue}
                            onChange={({target: {value}}) => setBrandValue(value)}
                            options={dataBrand}
                            placeholder={`-- Selecciona una Marca --`}
                            isAutoFocus={true}
                            isDisabled={false}
                        />}

                        {(modeUI === 'EDIT' || modeUI === 'DELETE') && <Select
                            name={"id"}
                            value={value}
                            onChange={onHandleInput}
                            options={dataModel}
                            placeholder={`-- Selecciona un Modelo --`}
                            isAutoFocus={true}
                            isDisabled={false}                            
                        />}

                        {(modeUI === 'ADD' || modeUI === 'EDIT') &&
                            <div className="AddNewItemForm--field">
                                <Input
                                    type="text"
                                    placeholder={`Ingresa el Modelo`}
                                    name={"name"}
                                    value={input}
                                    onChange={setInput}
                                    isAutoFocus={false}
                                    required={true}
                                />
                            </div>}
                    </Suspense>}

                <div className="AddNewItem--Form-btnContainer">
                    <Button
                        type={"button"}
                        name={"Cerrar"}
                        action={"cancelType"}
                        onHandle={onClose}
                    />
                    <Button
                        type={"submit"}
                        name={button}
                        isDisabled={(input === "") ? true : false}
                    />
                </div>
                {fetchState.status !== "" &&
                    <Suspense>
                        <MessageStatus
                            status={fetchState?.error === null ? 'success' : 'error'}
                            message={fetchState.status}
                            messageInfo={fetchState?.error !== null && fetchState.statusInfo}
                        />
                    </Suspense>
                }
            </div>
        </form>
    );
}

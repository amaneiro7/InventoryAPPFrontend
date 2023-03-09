import React, { useRef, useState, Suspense } from "react";
import { Input } from "UI/Input";
import { Select } from "UI/Select";
import { Button } from "UI/Button";
import useFetchingData from "Hooks/useFetchingData";
import useGetAddData from "Hooks/useGetData";
import { Loading } from "UI/Loading";
import { MessageStatus } from "UI/MessageStatus";


export default function FormModel({ state, dispatch }) {
    const { modeUI, title, nameTitle, endPoint } = state;
    const { data: dataBrand } = useGetAddData({ endPoint: 'brand' })
    const { data: dataModels } = useGetAddData({ endPoint: endPoint })
    const formRef = useRef(null);
    const [input, setInput] = useState("");
    const [brandValue, setBrandValue] = useState("");
    const [value, setValue] = useState("");
    const { fetchState, createData, deleteData, updateData } = useFetchingData();
    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(endPoint);
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
                updateData({ endPoint: `${endPoint}/${id}`, data })
                break;
            case 'DELETE':
                deleteData({ endPoint: `${endPoint}/${id}`, data })
                break;
            default:
                break;
        }
        setValue("")
        setBrandValue("")
        setInput("")
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
                    <Suspense fallback={<Loading/>}>
                        {<Select
                            name={"brandId"}
                            setValue={setBrandValue}
                            options={dataBrand}
                            isDisabled={false}
                            placeholder={`-- Selecciona una Marca --`}
                            isAutoFocus={true}
                            required={true}
                        />}

                        {(modeUI === 'EDIT' || modeUI === 'DELETE') && <Select
                            name={"id"}
                            setValue={setValue}
                            options={dataModels}
                            isDisabled={false}
                            placeholder={`-- Selecciona un Modelo --`}
                            isAutoFocus={false}
                            required={true}
                        />}

                        {(modeUI === 'ADD' || modeUI === 'EDIT') &&
                        <div className="AddNewItemForm--field">
                            <Input
                                type="text"
                                placeholder={`Ingresa el Modelo`}
                                name={"name"}
                                value={modeUI === 'ADD' ? input : value}
                                setInputValue={setInput}
                                isAutoFocus={brandValue !== "" ? true : false}
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
                        name={"Añadir"}
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

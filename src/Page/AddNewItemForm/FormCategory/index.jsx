import React, { Suspense, useRef, useState } from "react";
import useFetchingData from "Hooks/useFetchingData";
import useGetAddData from "Hooks/useGetData";
import { Input } from "UI/Input";
import { Select } from "UI/Select";
import { Button } from "UI/Button";
import { Loading } from "UI/Loading";
import { MessageStatus } from "UI/MessageStatus";

export default function FormCategory({ state, dispatch }) {
    const { modeUI, title, name, nameTitle, endPoint } = state;
    const { data } = useGetAddData({ endPoint });
    const formRef = useRef(null);
    const [value, setValue] = useState("");
    const { fetchState, createData, deleteData, updateData } = useFetchingData();

    const onSubmit = (e) => {
        e.preventDefault();
        let data = {};
        const formData = new FormData(formRef.current);
        const valueName = formData
            ?.get("name")
            ?.trimStart()
            .trimEnd()
            .toLowerCase();
        const id = Number(formData.get("id"));
        data = { name: valueName };

        switch (modeUI) {
            case "ADD":
                createData({ endPoint, data });
                break;
            case "EDIT":
                updateData({ endPoint: `${endPoint}/${id}`, data });
                break;
            case "DELETE":
                deleteData({ endPoint: `${endPoint}/${id}`, data });
                break;
            default:
                break;
        }
        setValue("");
    };

    const onClose = () => {
        dispatch({ type: "RESET" });
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
                {!fetchState.loading && (
                    <>
                        {(modeUI === "EDIT" || modeUI === "DELETE") && (
                            <Select
                                name={"id"}
                                setValue={setValue}
                                options={data}
                                isDisabled={false}
                                placeholder={`-- Selecciona una ${name} --`}
                                isAutoFocus={true}
                                required={true}
                            />
                        )}
                        {(modeUI === "ADD" || modeUI === "EDIT") && (
                            <div className="AddNewItemForm--field">
                                <Input
                                    type="text"
                                    placeholder={`Ingresa la ${name}`}
                                    name={"name"}
                                    value={value}
                                    setInputValue={setValue}
                                    isAutoFocus={true}
                                    required={true}
                                />
                            </div>
                        )}
                    </>
                )}
                <div className="AddNewItem--Form-btnContainer">
                    <Button
                        type={"button"}
                        name={"Cerrar"}
                        action={"cancelType"}
                        onHandle={onClose}
                    />
                    <Button
                        key={'onSubmitCategory'}
                        type={"submit"}
                        name={"Añadir"}
                        isDisabled={value === "" ? true : false}
                    />
                </div>
                {fetchState.status !== "" && (
                    <Suspense>
                        <MessageStatus
                            status={fetchState?.error === null ? "success" : "error"}
                            message={fetchState.status}
                            messageInfo={fetchState?.error !== null && fetchState.statusInfo}
                        />
                    </Suspense>
                )}
            </div>
        </form>
    );
}

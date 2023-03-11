import React, { useRef, useState, Suspense, lazy } from "react";
import useFetchingData from "Hooks/useFetchingData";
import useGetAddData from "Hooks/useGetData";

const Input = lazy(() => import("UI/Atoms/Input"))
const Select = lazy(() => import("UI/Atoms/Select"))
const Button = lazy(() => import("UI/Atoms/Button"))
const Loading = lazy(() => import("UI/Atoms/Loading"))
const MessageStatus = lazy(() => import("UI/Atoms/MessageStatus"))

export default function FormCategory({ state, dispatch }) {
    const { modeUI, title, name, nameTitle, endPoint } = state;
    const { data } = useGetAddData({ endPoint });
    const formRef = useRef(null);
    const [value, setValue] = useState("");
    const [input, setInput] = useState("");
    const { fetchState, createData, deleteData, updateData } = useFetchingData();

    const onSubmit = (e) => {
        e.preventDefault();
        let data = {};
        const formData = new FormData(formRef.current);
        const valueName = formData?.get("name")?.trimStart().trimEnd().toLowerCase();
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
        setInput("")
    };

    const onHandleInput = ({ target: { value } }) => {
        setValue(value)
        const dataIndex = data.findIndex(elem => elem.id === Number(value))
        setInput(() => data[dataIndex].name)
    }

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
                {!fetchState.loading &&
                    <Suspense fallback={<Loading />}>
                        {(modeUI === "EDIT" || modeUI === "DELETE") && (
                            <Select
                                name={"id"}
                                value={value}
                                onChange={onHandleInput}
                                options={data}
                                placeholder={`-- Selecciona una ${name} --`}
                                isAutoFocus={true}
                                isDisabled={false}
                            />
                        )}
                        {(modeUI === "ADD" || modeUI === "EDIT") &&
                            <div className="AddNewItemForm--field">
                                <Input
                                    type="text"
                                    placeholder={`Ingresa la ${name}`}
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
                        key={'onSubmitCategory'}
                        type={"submit"}
                        name={"Añadir"}
                        isDisabled={input === "" ? true : false}
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

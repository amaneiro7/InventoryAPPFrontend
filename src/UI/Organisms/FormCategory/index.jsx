import React, { useRef, useState, Suspense, lazy, useContext } from "react";
import useFetchingData from "Hooks/useFetchingData";
import { InventaryContext } from "context";

const Input = lazy(() => import("UI/Atoms/Input"))
const Select = lazy(() => import("UI/Atoms/Select"))
const Button = lazy(() => import("UI/Atoms/Button"))
const Loading = lazy(() => import("UI/Atoms/Loading"))
const MessageStatus = lazy(() => import("UI/Atoms/MessageStatus"))

export default function FormCategory({ state, dispatch }) {
    const { modeUI, title, name, nameTitle, endPoint, button, actionTypeButton } = state;
    const { dataCategory, setReload } = useContext(InventaryContext);
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
                updateData({ endPoint, data, id })
                break;
            case "DELETE":
                deleteData({ endPoint, data, id })
                break;
            default:
                break;
        }
        setReload(true)
        setValue("");
        setInput("");
    };

    const onSetDefaultInput = ({ target: { value } }) => {
        setValue(value)
        const dataIndex = dataCategory.findIndex(elem => elem.id === Number(value))
        setInput(() => dataCategory[dataIndex].name)
    }

    const onHandleInput = ({target: { value}}) => setInput(value)

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
                                onChange={onSetDefaultInput}
                                options={dataCategory}
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
                                    onChange={onHandleInput}
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
                        action={actionTypeButton}
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

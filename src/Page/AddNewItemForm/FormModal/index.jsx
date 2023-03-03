import React, { useContext, useRef, useState } from "react";
import { InventaryContext } from "../../../Hooks";
import { Input } from "../../../UI/Input";
import { Select } from "../../../UI/Select";
import { Button } from "../../../UI/Button";
import { getApiUrl } from "../../../services/config";


export function FormModal({ mode, setMode, targetMode, setTargetMode }) {
    const {
        setOpenModal,
        statusData,
        createNewItem,
        updatingItem,
        deletingItem,
        loading,
        error,
        categories,
        brands,
        models,
    } = useContext(InventaryContext);

    const [input, setInput] = useState("");
    const [value, setValue] = useState("");
    const formRef = useRef(null);

    const targetModeUI= {
        "Category": {
            name: "Categoria",
            pathTarget: "categories",
            options: categories

        },
        "Brand": {
            name: "Marca",
            pathTarget: "brand",
            options: brands
        },
        "Model": {
            name: "Modelo",
            pathTarget: "model",
            options: models
        }
    }
    
    const modeUI = {
        "add": {
            title: "Cree una nueva",
            oper: createNewItem,
            pathEntry: `${getApiUrl}${targetModeUI[targetMode].pathTarget}`,
        },
        "edit": {
            title: "Edite una",
            oper: updatingItem,            
            pathEntry: `${getApiUrl}${targetModeUI[targetMode].pathTarget}`,
        },
        "delete": {
            title: "Elimine una",
            oper: deletingItem,            
            pathEntry: `${getApiUrl}${targetModeUI[targetMode].pathTarget}`,
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const pathTarget = modeUI[mode].pathEntry        
        const formData = new FormData(formRef.current);
        const valueName = formData.get("name") !== null && formData.get("name").trimStart().trimEnd().toLowerCase();
        const id = Number(formData.get("id"))        
        const data = {
            name: valueName,
        };
        modeUI[mode].oper({path: `${pathTarget}/${id === 0 ? "" : id}`, data})
        setInput("");
    };

    const onClose = () => {
        setOpenModal(false);
        setInput("");
        setMode("");
        setTargetMode("")
    };

    return (
        <form className="AddNewItemForm" ref={formRef} onSubmit={onSubmit}>
            <div className="AddNewItemForm--container">
                <div className="AddNewItemForm--title">
                    <h2>{modeUI[mode].title} {targetModeUI[targetMode].name}</h2>
                </div>
                {(mode === "edit" || mode === "delete") && (
                    <>
                        <div className="AddNewItemForm--input">
                            <Select
                                name={"id"}
                                setValue={setValue}
                                options={targetModeUI[targetMode].options}
                                isDisabled={false}
                                placeholder={`-- Selecciona una ${targetModeUI[targetMode].name} --`}
                                isAutoFocus={true}
                                required={true}
                            />
                        </div>
                    </>
                )}
                {(mode === "add" || mode === "edit") && (
                    <>
                        <div className="AddNewItemForm--input">
                            <Input
                                type="text"
                                placeholder={`Ingresa la ${targetModeUI[targetMode].name}`}
                                name={"name"}
                                value={input}
                                setInputValue={setInput}
                                isAutoFocus={true}
                                required={true}
                            />
                        </div>
                    </>
                )}

                <div className="AddNewItemForm-btnContainer">
                    <Button
                        type={"button"}
                        name={"Cerrar"}
                        action={"cancelType"}
                        onHandle={onClose}
                    />
                    <Button
                        type={"submit"}
                        name={"Añadir"}
                        // isDisabled={input === "" ? true : false}
                        isDisabled={false}
                    />
                </div>
                {loading && !error && <p>Se esta Enviando</p>}
                {!loading && statusData.status === 201 && (
                    <p>{statusData.statusText}</p>
                )}
                {error && !loading && <p>{statusData.error[0].message}</p>}
            </div>
        </form>
    )
}

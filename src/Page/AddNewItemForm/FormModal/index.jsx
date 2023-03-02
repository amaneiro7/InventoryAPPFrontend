import React, { useContext, useRef, useState } from "react";
import { InventaryContext } from "../../../Hooks";
import endPoints from "../../../services/endPoint";
import { Input } from "../../../UI/Input";
import { Select } from "../../../UI/Select";
import { Button } from "../../../UI/Button";


export function FormModal({ mode, setMode, targetMode }) {
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

    const taregtModeUI= {
        "Category": {
            Name: "Categoria",
            pathEntry: endPoints.categories,
            pathTarget: "Category",
            options: categories

        },
        "Brand": {
            Name: "Marca",
            pathEntry: endPoints.brand,
            pathTarget: "Brand",
            options: brands
        },
        "Model": {
            Name: "Modelo",
            pathEntry: endPoints.models,
            pathTarget: "Model",
            options: models
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const valueName = formData.get("name") !== null && formData.get("name").trimStart().trimEnd().toLowerCase();
        const id = Number(formData.get("id"))
        const data = {
            name: valueName,
        };
        if (mode === "add") {
            createNewItem({ path: endPoints.categories.createCategory, data });
        }
        if (mode === "edit") {
            updatingItem({ path: endPoints.categories.updateCategory(id), data })
        }
        if (mode === "delete") {
            deletingItem({ path: endPoints.categories.deleteCategory(id) })
        }
        setInput("");
    };

    const onClose = () => {
        setOpenModal(false);
        setInput("");
        setMode("");
    };

    return (
        <form className="AddNewItemForm" ref={formRef} onSubmit={onSubmit}>
            <div className="AddNewItemForm--container">
                {mode === "add" && (
                    <>
                        <div className="AddNewItemForm--title">
                            <h2>Crea una nueva {taregtModeUI[targetMode].name}</h2>
                        </div>
                        <div className="AddNewItemForm--input">
                            <Input
                                type="text"
                                placeholder="Ingresa la nueva Categoria"
                                name={"name"}
                                value={input}
                                setInputValue={setInput}
                                isAutoFocus={true}
                                required={true}
                            />
                        </div>
                    </>
                )}
                {mode === "edit" && (
                    <>
                        <div className="AddNewItemForm--title">
                            <h2>Edite una categoria</h2>
                        </div>
                        <div className="AddNewItemForm--input">
                            <Select
                                name={"id"}
                                setValue={setValue}
                                options={categories}
                                isDisabled={false}
                                placeholder={"-- Selecciona una Categoria --"}
                                isAutoFocus={true}
                                required={true}
                            />
                            {value && <Input
                                name={"name"}
                                type={"text"}
                                placeholder={"Ingresa el nuevo Modelo"}
                                defaultValue={value}
                                value={input}
                                setInputValue={setInput}
                                isAutoFocus={true}
                                required={true}
                            />}
                        </div>
                    </>
                )}
                {mode === "delete" && (
                    <>
                        <div className="AddNewItemForm--title">
                            <h2>Elimine una categoria</h2>
                        </div>
                        <div className="AddNewItemForm--input">
                            <Select
                                name={"id"}
                                options={categories}
                                isDisabled={false}
                                setValue={setInput}
                                placeholder={"-- Selecciona una Categoria --"}
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
                        isDisabled={input === "" ? true : false}
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

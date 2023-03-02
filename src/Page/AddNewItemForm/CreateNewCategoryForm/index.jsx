import React, { useContext, useRef, useState } from "react";
import { Button } from "../../../UI/Button";
import { Input } from "../../../UI/Input";
import { InventaryContext } from "../../../Hooks";
import endPoints from "../../../services/endPoint";
import { Select } from "../../../UI/Select";

export function CreateNewCategoryForm({ mode, setMode }) {
  const {
    setOpenModal,
    statusData,
    createNewItem,
    updatingItem,
    deletingItem,
    loading,
    error,
    categories,
  } = useContext(InventaryContext);
  const [input, setInput] = useState("");  
  const formRef = useRef(null);
  

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    if (mode === "add") {
        const valueName = formData.get("name").trimStart().trimEnd().toLowerCase();
        const data = {
            name: valueName,
        };
        console.log("Estes el add",mode, data);
        createNewItem({ path: endPoints.categories.createCategory, data });        
    }
    if (mode === "edit") {
        const valueName = formData.get("name").trimStart().trimEnd().toLowerCase();
        const data = {
            name: valueName,
        };        
        const id = Number(formData.get("id"))
        console.log("este es el edit",mode,id);
        updatingItem({path: endPoints.categories.updateCategory(id), data})
    }
    if (mode === "delete") {
        const id = Number(formData.get("id"))
        console.log("este el delete",mode, id);
        deletingItem({path: endPoints.categories.deleteCategory(id)})
    }
    setInput("");
  };
  const onClose = () => {
    setOpenModal(false);
    setMode("");
  };



  return (
    <form className="AddNewItemForm" ref={formRef} onSubmit={onSubmit}>
      <div className="AddNewItemForm--container">
        {mode === "add" && (
          <>
            <div className="AddNewItemForm--title">
              <h2>Crea una nueva categoria</h2>
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
                options={categories}
                isDisabled={false}
                placeholder={"-- Selecciona una Categoria --"}
                isAutoFocus={true}
                required={true}
              />
              <Input
                type={"text"}
                placeholder={"Ingresa el nuevo Modelo"}
                name={"name"}
                value={input}
                setInputValue={setInput}
                isAutoFocus={false}
                required={true}
              />
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
  );
}
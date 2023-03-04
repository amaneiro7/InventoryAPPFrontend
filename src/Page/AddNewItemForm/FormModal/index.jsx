import React, { useContext, useRef, useState } from "react";
import { InventaryContext } from "../../../Hooks";
import { Input } from "../../../UI/Input";
import { Select } from "../../../UI/Select";
import { Button } from "../../../UI/Button";
import { getApiUrl } from "../../../services/config";
import "./FormModal.css";

export function FormModal({ mode, setMode, targetMode, setTargetMode }) {
  const {
    setOpenModal,
    openModal,
    statusData,
    createNewItem,
    updatingItem,
    deletingItem,
    loading,
    error,
    categories,
    brands,
    models,
    setBrand,
  } = useContext(InventaryContext);

  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const formRef = useRef(null);

  const targetModeUI = {
    Category: {
      name: "Categoria",
      pathTarget: "categories",
      options: categories,
    },
    Brand: {
      name: "Marca",
      pathTarget: "brand",
      options: brands,
    },
    Model: {
      name: "Modelo",
      pathTarget: "models",
      options: models,
    },
  };

  const modeUI = {
    add: {
      title: "Cree una nueva",
      oper: createNewItem,
      pathEntry: `${getApiUrl}${targetModeUI[targetMode].pathTarget}`,
    },
    edit: {
      title: "Edite una",
      oper: updatingItem,
      pathEntry: `${getApiUrl}${targetModeUI[targetMode].pathTarget}`,
    },
    delete: {
      title: "Elimine una",
      oper: deletingItem,
      pathEntry: `${getApiUrl}${targetModeUI[targetMode].pathTarget}`,
    },
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {};
    const pathTarget = modeUI[mode].pathEntry;
    const formData = new FormData(formRef.current);
    const valueName =
      formData.get("name") !== null &&
      formData.get("name").trimStart().trimEnd().toLowerCase();
    const id = Number(formData.get("id"));
    const brandId = Number(formData.get("brandId"));
    if (targetMode === "Model" && mode !== "delete") {
      data = {
        name: valueName,
        brandId: brandId,
      };
    } else {
      data = {
        name: valueName,
      };
    }

    modeUI[mode].oper({ path: `${pathTarget}/${id === 0 ? "" : id}`, data });
    setInput("");
  };

  const onClose = () => {
    setOpenModal(false);
    setInput("");
    setMode("");
    setTargetMode("");
  };
  // console.log(statusData);
  console.log(value);
  return (
    <form className="AddNewItem--Form" ref={formRef} onSubmit={onSubmit}>
      <div className="AddNewItem--Form--container">
        <div className="AddNewItemForm--title">
          <h2>
            {modeUI[mode].title} {targetModeUI[targetMode].name}
          </h2>
        </div>
        {(mode === "edit" ||
          mode === "delete" ||
          (targetMode === "Model" && mode === "add")) && (
            <Select
              name={targetMode === "Model" ? "brandId" : "id"}
              setValue={targetMode === "Model" ? setBrand : setValue}
              options={
                targetMode === "Model"
                  ? targetModeUI["Brand"].options
                  : targetModeUI[targetMode].options
              }
              isDisabled={false}
              placeholder={`-- Selecciona una ${
                targetMode === "Model"
                  ? targetModeUI["Brand"].name
                  : targetModeUI[targetMode].name
              } --`}
              isAutoFocus={true}
              required={true}
            />
        )}

        {targetMode === "Model" && mode !== "add" && (
          <Select
              name={"id"}
              setValue={setValue}
              options={targetModeUI["Model"].options}
              isDisabled={false}
              placeholder={`-- Selecciona una ${targetModeUI[targetMode].name} --`}
              isAutoFocus={true}
              required={true}
            />
          )}
        {(mode === "add" || mode === "edit") && (
          <div className="AddNewItemForm--field">
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
        )}

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
            isDisabled={(value === "") ? true : false}
            // isDisabled={false}
          />
        </div>
        {openModal && loading && !error && <p>Se esta Enviando</p>}
        {openModal && !loading && statusData.status === 201 && (
          <p>{statusData.statusText}</p>
        )}
        {openModal && error && !loading && <p>{statusData.error[0].message}</p>}
      </div>
    </form>
  );
}

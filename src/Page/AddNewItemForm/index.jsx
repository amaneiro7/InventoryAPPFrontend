import React, { Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReducerFromAddPage } from "Hooks/useReducerFromAddPage";
import useFetchingData from "Hooks/useFetchingData";
import { Button } from "UI/Button";
import { Input } from "UI/Input";
import SelectForm from "./SelectForm";
import { MessageStatus } from "UI/MessageStatus";
import "./AddNewItemForm.css";
import "./FormAddNewItem.css";

export default function AddNewItemForm() {
  const { state, dispatch } = useReducerFromAddPage();
  const { fetchState, createData } = useFetchingData();
  const navigate = useNavigate();
  const formRef = useRef(null);
  
  const onHandleInput = (target) => {
    dispatch({ type: "CHANGEVALUE", payload: target });
  };

  const onReset = () => {
    let target
    target= {
      name: "serial",
      value: ""
    }
    dispatch({ type: "CHANGEVALUE", payload: target })
    target= {
      name: "activo",
      value: ""
    }
    dispatch({ type: "CHANGEVALUE", payload: target })
    console.log(state);
    };

  const onClose = () => {  
    navigate("/");
  };

  const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      const valueSerial =
      formData.get("serial") === ""
      ? null
      : formData.get("serial").trim().toUpperCase();
    const valueActivo =
      formData.get("activo") === ""
      ? null
      : formData.get("activo").trim().toUpperCase();
    const data = {
      serial: valueSerial,
      activo: valueActivo,
      categoryId: formData.get("category"),
      brandId: formData.get("brand"),
      modelId: formData.get("model"),
    };
    onReset()
    createData({ endPoint: "items", data });    
  };  

  return (
    <>
      <form className="AddNewItemForm" ref={formRef} onSubmit={onSubmit}>
        <div className="AddNewItemForm--container">
          <div className="AddNewItemForm--title">
            <h1>Agrega un nuevo elemento</h1>
          </div>
          <>
            <SelectForm
              name={"category"}
              type={"CATEGORY"}
              setValue={onHandleInput}
              endPoint={"categories"}
              placeholder={"la Categoria"}
            />
            <div className="AddNewItemForm--field">
              <Input
                name={"serial"}
                type={"text"}
                placeholder={"-- Ingrese el Serial --"}
                value={state.serial}
                setInputValue={onHandleInput}
                required={true}
                isAutoFocus={false}
              />
            </div>

            <div className="AddNewItemForm--field">
              <Input
                name={"activo"}
                type={"text"}
                placeholder={"-- Ingrese el Activo --"}
                value={state.activo}
                setInputValue={onHandleInput}
                required={true}
                isAutoFocus={false}
              />
            </div>
            <SelectForm
              name={"brand"}
              type={"BRAND"}
              setValue={onHandleInput}
              endPoint={`brand?category=${state.category}`}
              placeholder={"la Marca"}
              isDisabled={state.category === "" && true}
            />
            <SelectForm
              name={"model"}
              type={"MODEL"}
              setValue={onHandleInput}
              endPoint={`models?brandId=${state.brand}`}
              placeholder={"el Modelo"}
              isDisabled={state.brand === "" && true}
            />
          </>

          <div className="AddNewItemForm-btnContainer">
            <Button
              key={'cancel'}
              type={"button"}
              name={"Cerrar"}
              action={"cancelType"}
              onHandle={onClose}
            />
            <Button
              key={'onSubmitItem'}
              type={"submit"}
              name={"Añadir"}
              // isDisabled={((!category || !brand || !model) || (serial === "" && activo === "")) ? true : false}
            />
          </div>
          {fetchState.status !== "" && (
            <Suspense>
              <MessageStatus
                status={fetchState?.error === null ? "success" : "error"}
                message={fetchState.status}
                messageInfo={
                  fetchState?.error !== null && fetchState.statusInfo
                }
              />
            </Suspense>
          )}
        </div>
      </form>
    </>
  );
}

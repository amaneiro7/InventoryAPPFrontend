import React, { lazy, Suspense, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReducerFromAddPage } from "Hooks/useReducerFromAddPage";
import useFetchingData from "Hooks/useFetchingData";

import "./AddNewItemForm.css";
import "./FormAddNewItem.css";
import { InventaryContext } from "context";

const Button = lazy(() => import('UI/Atoms/Button'));
const Input = lazy(() => import('UI/Atoms/Input'));
const SelectForm = lazy(() => import('UI/Molecules/SelectForm'));
const MessageStatus = lazy(() => import("UI/Atoms/MessageStatus"));

export default function AddNewItemForm() {
  const { items } = useContext(InventaryContext)
  const { state, dispatch } = useReducerFromAddPage();
  const { fetchState, createData } = useFetchingData();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const onHandleInput = ({ target }) => {
    const {name, value} = target
    dispatch({ type: "CHANGEVALUE", payload: target });

    import('Hooks/useIsExist.js')
    .then(module => module.useIsExist(items, name, value))
    .then(result => {      
      dispatch({ type: 'ALREADY_EXIST', payload: {name, result}})
    })    
  };

  console.log(state.activoExisted);

  const onClose = () => {
    navigate("/");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.openModal) {
      return
    }

    const formData = new FormData(formRef.current);

    const valueSerial =
      formData.get("serial") === ""
        ? null
        : formData.get("serial").trim().toUpperCase();

    const valueActivo =
      formData.get("activo") === ""
        ? null
        : formData.get("activo").trim().toUpperCase();

    if (valueSerial === null && valueActivo === null) {
      alert('Al menos uno de los campos serial o activo debe tener un valor')
      return
    }

    const data = {
      serial: valueSerial,
      activo: valueActivo,
      categoryId: formData.get("category"),
      brandId: formData.get("brand"),
      modelId: formData.get("model"),
    };
    dispatch({ type: "DEFAULTVALUE"})
    createData({ endPoint: "items", data });
  };
  
  const isDisabled = ((state.category === "" || state.brand === "" || state.model === "") || (state.activo === "" && state.serial === ""))
  
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
              value={state.category}
              onChange={onHandleInput}
              state={state}
              dispatch={dispatch}
              endPoint={"categories"}
              placeholder={"la Categoria"}
              isAutoFocus={true}
            />
            <div className="AddNewItemForm--field">
              <Input
                name={"serial"}
                type={"text"}
                placeholder={"-- Ingrese el Serial --"}
                value={state.serial}
                onChange={onHandleInput}
                required={true}
                isAutoFocus={state.category !== ""}
              />
            </div>

            <div className="AddNewItemForm--field">
              <Input
                name={"activo"}
                type={"text"}
                placeholder={"-- Ingrese el Activo --"}
                value={state.activo === "" ? "" : state.activo}
                onChange={onHandleInput}
                required={true}
                isAutoFocus={false}
              />
            </div>
            <SelectForm
              name={"brand"}
              type={"BRAND"}
              value={state.brand}
              onChange={onHandleInput}
              state={state}
              dispatch={dispatch}
              endPoint={`brand?category=${state.category}`}
              placeholder={"la Marca"}
              isDisabled={state.category === ""}
            />
            <SelectForm
              name={"model"}
              type={"MODEL"}
              value={state.model}
              state={state}
              dispatch={dispatch}
              onChange={onHandleInput}
              endPoint={`models?brandId=${state.brand}`}
              placeholder={"el Modelo"}
              isDisabled={state.brand === ""}
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
              isDisabled={isDisabled}
            />
          </div>
        </div>
          {(state.serialExisted && !state.openModal) && (
            <Suspense>
              <MessageStatus
                status={"error"}
                message={null}
                messageInfo={'El serial introducido ya existe'}
              />
            </Suspense>
          )}
          {(state.activoExisted && !state.openModal) && (
            <Suspense>
              <MessageStatus
                status={"error"}
                message={null}
                messageInfo={'El activo introducido ya existe'}
              />
            </Suspense>
          )}
          {(fetchState.status !== "" && !state.openModal) && (
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
      </form>
    </>
  );
}

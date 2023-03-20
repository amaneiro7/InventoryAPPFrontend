import React, { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReducerFromAddPage } from "Hooks/useReducerFromAddPage";
import useFetchingData from "Hooks/useFetchingData";

import "./AddNewItemForm.css";
import "./FormAddNewItem.css";
import { InventaryContext } from "context";

const Button = lazy(() => import('UI/Atoms/Button'));
const Input = lazy(() => import('UI/Atoms/Input'));
const SelectForm = lazy(() => import('Page/AddNewItemForm/SelectForm'));
const MessageStatus = lazy(() => import("UI/Atoms/MessageStatus"));

export default function AddNewItemForm() {
  const { items, dataCategory, dataBrand, setReload } = useContext(InventaryContext)
  const { state, dispatch } = useReducerFromAddPage();
  const { fetchState, createData } = useFetchingData();
  const navigate = useNavigate();
  const formRef = useRef(null);
  // const [dataBrand, setDataBrand] = useState();
  const [dataModel, setDataModel] = useState();

  const onHandleInput = ({ target }) => {
    const {name, value} = target
    dispatch({ type: "CHANGEVALUE", payload: target });

    import('Hooks/useIsExist.js')
    .then(module => module.useIsExist(items, name, value))
    .then(result => {      
      dispatch({ type: 'ALREADY_EXIST', payload: {name, result}})
    })    
  };

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
    createData({ endPoint: "/items", data });
    setReload(true)
  };
  
  
  const isDisabled = ((state.category === "" || state.brand === "" || state.model === "") || (state.activo === "" && state.serial === ""))
  
  // useEffect(() => {
  //   let brandList = []
  //   const brandFiltered = items.filter(item => item.category.id === Number(state.category))  
    
  //   brandFiltered.forEach(item => {
  //     if (!brandList.some(brand => brand.id === item.brand.id)) {
  //       brandList.push(item.brand)
  //     }      
  //   });
  //   setDataBrand(brandList)
  // },[items, state.category])

  useEffect(() => {    
    const modelFiltered = dataBrand.filter(brand => brand.id === Number(state.brand))
    setDataModel(modelFiltered[0]?.model)    
  },[dataBrand, state.brand])

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
              data={dataCategory}
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

            <div className="AddNewItemForm--field">
              <div className={'AddNewItemForm--select status'}>
                <select 
                  name="status"
                  defaultValue={true}
                >
                  <option 
                    value={''}
                    disabled
                    
                  >-- Seleccione el Estado del dispositivo--</option>
                  <option value={"true"}>Bueno</option>
                  <option value={"false"}>Dañado</option>
                </select>
              </div>
            </div>

            <SelectForm
              name={"brand"}
              type={"BRAND"}
              value={state.brand}
              onChange={onHandleInput}
              state={state}
              dispatch={dispatch}
              data={dataBrand}
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
              data={dataModel}
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

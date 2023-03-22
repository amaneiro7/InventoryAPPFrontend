import React, { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReducerFromAddPage } from "Hooks/useReducerFromAddPage";
import useFetchingData from "Hooks/useFetchingData";

import "./AddNewItemForm.css";
import "./FormAddNewItem.css";
import { InventaryContext } from "context";
import Select from "UI/Atoms/Select";

const Button = lazy(() => import('UI/Atoms/Button'));
const Input = lazy(() => import('UI/Atoms/Input'));
const SelectForm = lazy(() => import('Page/AddNewItemForm/SelectForm'));
const MessageStatus = lazy(() => import("UI/Atoms/MessageStatus"));

export default function AddNewItemForm() {
  const { items, dataCategory, dataModel, dataStatus, dataObsolete, setReload } = useContext(InventaryContext)
  const { state, dispatch } = useReducerFromAddPage();
  const { fetchState, createData } = useFetchingData();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [dataBrandList, setDataBrand] = useState();
  const [dataModelList, setDataModel] = useState();

  const onHandleInput = ({ target }) => {
    const { name, value } = target
    dispatch({ type: "CHANGEVALUE", payload: target });

    import('Hooks/useIsExist.js')
      .then(module => module.useIsExist(items, name, value))
      .then(result => {
        dispatch({ type: 'ALREADY_EXIST', payload: { name, result } })
      })
  };

  const onHandleInput2 = ({ target }) => {
    let { name, value } = target
    const trueFalseValue = {
      true: true,
      false: false,
      '': undefined
    }
    value = trueFalseValue[value]
    dispatch({ type: 'CHANGEVALUE', payload: { name, value } });
  }

  const onClose = () => {
    navigate("/");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.openModal) {
      return
    }
    const trueFalseValue = {
      true: true,
      false: false,
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

    const statusValue = trueFalseValue[formData.get('status')]
    const obsoleteValue = trueFalseValue[formData.get('obsolete')]

    if (valueSerial === null && valueActivo === null) {
      alert('Al menos uno de los campos serial o activo debe tener un valor')
      return
    }

    const data = {
      serial: valueSerial,
      activo: valueActivo,
      status: statusValue,
      obsolete: obsoleteValue,
      categoryId: formData.get("category"),
      brandId: formData.get("brand"),
      modelId: formData.get("model"),
    };
    dispatch({ type: "DEFAULTVALUE" })
    createData({ endPoint: "/items", data });
    setReload(true)
  };


  const isDisabled = ((state.category === "" || state.brand === "" || state.model === "") || (state.activo === "" && state.serial === ""))

  useEffect(() => {
    let brandList = []
    const brandFiltered = dataModel.filter(brand => brand.category.id === Number(state.category))

    brandFiltered.forEach(item => {
      if (!brandList.some(brand => brand.id === item.brand.id)) {
        brandList.push(item.brand)
      }
    });
    setDataBrand(brandList)
  }, [dataModel, state.category])

  useEffect(() => {
    const modelFiltered = dataModel.filter(model =>
      model.category.id === Number(state.category) &&
      model.brand.id === Number(state.brand)
    )
    setDataModel(modelFiltered)
  }, [dataModel, state.brand, state.category])

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

              <Select
                name={'status'}
                value={state.status}
                options={dataStatus}
                onChange={onHandleInput2}
                placeholder={'Seleccione el estado del dispositivo'}
                isDisabled={false}
                isAutoFocus={false}
                size={'status'}
              />
            </div>

            <div className="AddNewItemForm--field">
              <Select
                name={'obsolete'}
                value={state.obsolete}
                options={dataObsolete}
                onChange={onHandleInput2}
                placeholder={'Seleccione si el dispositivo se encuentra obsoleto'}
                isDisabled={false}
                isAutoFocus={false}
                size={'status'}
              />
            </div>


            <SelectForm
              name={"brand"}
              type={"BRAND"}
              value={state.brand}
              onChange={onHandleInput}
              state={state}
              dispatch={dispatch}
              data={dataBrandList}
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
              data={dataModelList}
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

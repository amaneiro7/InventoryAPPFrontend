import React, { useRef, Suspense, useReducer, useMemo, lazy } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetchingData from "Hooks/useFetchingData";
import useGetData from "Hooks/useGetData";
import "./ViewDetail.css";

const Button = lazy(() => import('UI/Atoms/Button'));
const Input = lazy(() => import('UI/Atoms/Input'));
const Select = lazy(() => import('UI/Atoms/Select'));
const MessageStatus = lazy(() => import("UI/Atoms/MessageStatus"));
const Loading = lazy(() => import("UI/Atoms/Loading"));
const Modal = lazy(() => import("UI/Atoms/Modal"));

const reducer = (state, action) => {  
  return reducerOBJECT(state, action.payload)[action.type] || state;
};

const reducerOBJECT = (state, payload) => ({
  'CHANGEVALUE': {
    ...state,
    [payload.name]: payload.value
  },
});

const useDynamicState = (dataAPI, dataLocation) => {
  const initialState = useMemo(() => {
    if (dataLocation && dataLocation.item) {
      const itemDetail = dataLocation.item
      return {
        categoryId: itemDetail.category.id,
        serial: itemDetail.serial,
        activo: itemDetail.activo,
        brandId: itemDetail.brand.id,
        modelId: itemDetail.model.id,
      }
    } else if (dataAPI) {
      const itemDetail = dataAPI;
      return {
        categoryId: itemDetail.category.id,
        serial: itemDetail.serial,
        activo: itemDetail.activo,
        brandId: itemDetail.brand.id,
        modelId: itemDetail.model.id,
      }
    } else {
      return null
    }
  }, [dataAPI, dataLocation])

  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch]
}

export default function ViewDetail() {
  const { fetchState, updateData, deleteData } = useFetchingData();
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { state: { data, loading } } = useGetData({ endPoint: `/items/${id}` })
  const [state, dispatch] = useDynamicState(data, location.state);

  const onHandleInput = ({ target }) => {
    const { name, value } = target
    dispatch({ type: 'CHANGEVALUE', payload: { name, value } });
  };

  const { state: { data: dataCategory } } = useGetData({
    endPoint: "categories",
  });
  const { state: { data: dataBrand } } = useGetData({
    endPoint: `brand?category=${state.categoryId}`,
  });
  const { state: { data: dataModels } } = useGetData({
    endPoint: `models?brandId=${state.brandId}`,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const valueSerial =
      formData.get('serial') === ""
        ? null
        : formData.get('serial').trim().toUpperCase();
    const valueActivo =
      formData.get('activo') === ""
        ? null
        : formData.get('activo').trim().toUpperCase();

    if (valueSerial === null && valueActivo === null) {
      alert('Al menos uno de los campos serial o activo debe tener un valor')
      return
    }

    const data = {
      serial: valueSerial,
      activo: valueActivo,
      categoryId: formData.get('categoryId'),
      brandId: formData.get('brandId'),
      modelId: formData.get('modelId'),
    };
    updateData({ endPoint: `items`, data, id })
    setTimeout(() => {
      navigate('/')
    }, 1500)
  };

  const onDelete = (e) => {
    e.preventDefault();
    deleteData({ endPoint: `items`, data})
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  const onClose = () => {
    navigate("/");
  };

  return (
    <section className="ViewDetail">
      {!loading &&
        <form className="ViewDetail--form" ref={formRef} onSubmit={onSubmit}>
          <div className="ViewDetail--container">
            <div className="ViewDetail--title">
              <h1>Edita el elemento</h1>
            </div>
            <Button
              type={"button"}
              name={"Cerrar"}
              action={"cancelType"}
              onHandle={onClose}
            />

            {dataCategory ? (
              <Suspense fallback={<Loading />}>
                <div className="ViewDetail--field">
                  <label htmlFor="Categoria">Categoria</label>
                  <Select
                    name={"categoryId"}
                    value={state.categoryId}
                    onChange={onHandleInput}
                    options={dataCategory}
                    placeholder={"-- Seleccione la categoria --"}
                    isDisabled={false}
                    isAutoFocus={true}
                  />
                </div>
              </Suspense>
            ) : (
              <Loading />
            )}

            <div className="ViewDetail--field">
              <label htmlFor="Serial">Serial</label>
              <div className="ViewDetail--select">
                <Input
                  name={"serial"}
                  type={"text"}
                  value={state.serial}
                  setInputValue={onHandleInput}
                />
              </div>
            </div>

            <div className="ViewDetail--field">
              <label htmlFor="Activo">Activo</label>
              <div className="ViewDetail--select">
                <Input
                  name={"activo"}
                  type={"text"}
                  value={state.activo}
                  setInputValue={onHandleInput}
                />
              </div>
            </div>

            {dataBrand ? (
              <Suspense fallback={<Loading />}>
                <div className="ViewDetail--field">
                  <label htmlFor="Marca">Marca</label>
                  <Select
                    name={"brandId"}
                    value={state.brandId}
                    options={dataBrand}
                    onChange={onHandleInput}
                    placeholder={"-- Seleccione la marca --"}
                    isDisabled={false}
                    isAutoFocus={false}
                  />
                </div>
              </Suspense>
            ) : (
              <Loading />
            )}

            {dataModels ? (
              <Suspense fallback={<Loading />}>
                <div className="ViewDetail--field">
                  <label htmlFor="Modelo">Modelo</label>
                  <Select
                    name={"modelId"}
                    value={state.modelId}
                    options={dataModels}
                    onChange={onHandleInput}
                    placeholder={"-- Seleccione el modelo --"}
                    isDisabled={false}
                    isAutoFocus={false}
                  />
                </div>
              </Suspense>
            ) : (
              <Loading />
            )}
          </div>

          <div className="ViewDetail-btnContainer">

            <Button
              type={"submit"}
              name={"Guardar"}            
            />
            <Button
              type={"button"}
              name={"Eliminar"}
              action={'deleteType'}
              onHandle={onDelete}
            />
          </div>
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
        </form>}
      {loading && <Modal>{<Loading />}</Modal>}
    </section>
  );
}

import React, { useRef, Suspense, useReducer, lazy, useContext, useEffect} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { InventaryContext } from "context";
import useFetchingData from "Hooks/useFetchingData";
import "./ViewDetail.css";


const Button = lazy(() => import('UI/Atoms/Button'));
const Input = lazy(() => import('UI/Atoms/Input'));
const Select = lazy(() => import('UI/Atoms/Select'));
const MessageStatus = lazy(() => import("UI/Atoms/MessageStatus"));
const Loading = lazy(() => import("UI/Atoms/Loading"));

const initialState = {
  categoryId: "",
  serial: "",
  activo: "",
  brandId: "",
  modelId: "",
  loading: true,
}

const reducer = (state, action) => {  
  return reducerOBJECT(state, action.payload)[action.type] || state;
};

const reducerOBJECT = (state, payload) => ({
  'CHANGEVALUE': {
    ...state,
    [payload?.name]: payload?.value
  },
  'START': {
    ...state,
    loading: true
  },
  'INITIAL': {
    ...state,
    loading: false,
    categoryId: payload?.categoryId,
    serial: payload?.serial,
    activo: payload?.activo,
    brandId: payload?.brandId,
    modelId: payload?.modelId,
  }
});

export default function ViewDetail() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fetchState, updateData, deleteData } = useFetchingData();
  const { dataCategory, dataBrand, dataModel} = useContext(InventaryContext)
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
useEffect(() => {
  if (location.state?.item) {
    dispatch({type: 'INITIAL', payload: location.state.item})
  } else {
    dispatch({type: 'START'})
    import('services/api').then(module => module.getOneItem({endPoint: 'items', id})
      .then(data => {dispatch({type: 'INITIAL', payload: data})}))
  }
}, [id, location.state?.item])

  const onHandleInput = ({ target }) => {
    const { name, value } = target
    dispatch({ type: 'CHANGEVALUE', payload: { name, value } });
  };

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
    deleteData({ endPoint: `items/${id}`})
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  const onClose = () => {
    navigate("/");
  };

  return (
    <section className="ViewDetail">
      {state.loading && <Loading/>}
      {!state.loading &&
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

            {dataCategory && state ? (
              <Suspense fallback={<Loading />}>
                <div className="ViewDetail--field">
                  <label htmlFor="Categoria">Categoria</label>
                  <Select
                    name={"categoryId"}
                    value={state?.categoryId}
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
                  value={state?.serial}
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
                  value={state?.activo}
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
                    value={state?.brandId}
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

            {dataModel ? (
              <Suspense fallback={<Loading />}>
                <div className="ViewDetail--field">
                  <label htmlFor="Modelo">Modelo</label>
                  <Select
                    name={"modelId"}
                    value={state?.modelId}
                    options={dataModel}
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
    </section>
  );
}

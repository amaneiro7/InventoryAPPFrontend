import React, { useRef, useState, Suspense } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetchingData from "Hooks/useFetchingData";
import useGetAddData from "Hooks/useGetData";
import { Button } from "UI/Button";
import { Input } from "UI/Input";
import { Loading } from "UI/Loading";
import { Modal } from "UI/Modal";
import { Select } from "UI/Select";
import "./ViewDetail.css";

export default function ViewDetail() {
  const { fetchState, getOneData, updateData, deleteData } = useFetchingData;
  const formRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  let itemDetail;
  if (!itemDetail) {
    if (location.state?.item) {
      itemDetail = location.state.item;
    } else {
      getOneData({ endPoint: `/items/${id}` });
      itemDetail = fetchState.data;
    }
  }

  const [category, setCategory] = useState(itemDetail.category.id);
  const [serial, setSerial] = useState(itemDetail.serial);
  const [activo, setActivo] = useState(itemDetail.activo);
  const [brand, setBrand] = useState(itemDetail.brand.id);
  const [model, setModel] = useState(itemDetail.model.id);

  const setters = {
    categoryId: setCategory,
    serial: setSerial,
    activo: setActivo,
    brandId: setBrand,
    modelId: setModel,
  };

  const onHandleInput = (target) => {
    const { name, value } = target;
    const setter = setters[name];
    if (setter) {
      setter(value);
    }
  };

  const { data: dataCategory } = useGetAddData({
    endPoint: "categories",
  });
  const { data: dataBrand } = useGetAddData({
    endPoint: `brand?category=${itemDetail.category.id}`,
  });
  const { data: dataModels } = useGetAddData({
    endPoint: `models?brandId=${itemDetail.brand.id}`,
  });

  const onSubmit = () => {};

  // const onDelete = () => {
  //     deletingItem({ path: `${getApiUrl}/items/${id}` })
  //     setLoading(true)
  //     setTimeout(() => {
  //         navigate('/')
  //         setLoading(false)
  //         setCategory("")
  //         setSerial("")
  //         setActivo("")
  //         setBrand("")
  //         setModel("")
  //     }, 1000)
  // }

  const onClose = () => {
    navigate("/");
  };

  return (
    <section className="ViewDetail">
      <form className="ViewDetail--form" ref={formRef} onSubmit={onSubmit}>
        <div className="ViewDetail--container">
          <div className="ViewDetail--title">
            <h1>Edita el elemento</h1>
          </div>

          {dataCategory ? (
            <Suspense fallback={<Loading />}>
              <div className="ViewDetail--field">
                <label htmlFor="Categoria">Categoria</label>
                <Select
                  name={"categoryId"}
                  defaultValue={category}
                  setValue={onHandleInput}
                  isDisabled={false}
                  options={dataCategory}
                  placeholder={"-- Seleccione la categoria --"}
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
                value={serial}
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
                value={activo}
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
                  defaultValue={brand}
                  setValue={onHandleInput}
                  isDisabled={false}
                  options={dataBrand}
                  placeholder={"-- Seleccione la marca --"}
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
                  defaultValue={model}
                  setValue={onHandleInput}
                  isDisabled={false}
                  options={dataModels}
                  placeholder={"-- Seleccione el modelo --"}
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
            type={"button"}
            name={"Cerrar"}
            action={"cancelType"}
            onHandle={onClose}
          />
          <Button
            type={"submit"}
            name={"Guardar"}
            // isDisabled={((!category || !brand || !model) || (serial === "" && activo === "")) ? true : false}
          />
          <Button
            type={"button"}
            name={"Eliminar"}
            // onHandle={onDelete}
            // isDisabled={((!category || !brand || !model) || (serial === "" && activo === "")) ? true : false}
          />
        </div>
      </form>
      {fetchState?.loading && <Modal>{<Loading />}</Modal>}
    </section>
  );
}

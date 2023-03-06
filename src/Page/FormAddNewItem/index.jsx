import React, { useRef, useState } from "react";
import { Input } from "UI/Input";
import { Select } from "UI/Select";
import { Button } from "UI/Button";
import "./FormAddNewItem.css";


export default function FormAddNewItem({ state, dispatch }) {
  const { targetModeUI, modeUI, title, name, nameTitle, endPoint, oper } = state
  const formRef = useRef(null);
  const [input, setInput ] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {};
    const pathTarget = modeUI[modeUI].pathEntry;
    const formData = new FormData(formRef.current);
    const valueName =
      formData.get("name") !== null &&
      formData.get("name").trimStart().trimEnd().toLowerCase();
    const id = Number(formData.get("id"));
    const brandId = Number(formData.get("brandId"));
    if (targetModeUI === "MODEL" && modeUI !== "DELETE") {
      data = {
        name: valueName,
        brandId: brandId,
      };
    } else {
      data = {
        name: valueName,
      };
    }
  }

    // modeUI[mode].oper({ path: `${pathTarget}/${id === 0 ? "" : id}`, data });
    // setInput("");

    const onClose = () => {      
      console.log(state);
      dispatch({ type: 'RESET' })
    };

    return (
      <form className="AddNewItem--Form" ref={formRef} onSubmit={onSubmit}>
        <div className="AddNewItem--Form--container">
          <div className="AddNewItemForm--title">
            <h2>
              {title} {nameTitle}
            </h2>
          </div>
          {name === 'Categoria' && (             
              <div className="AddNewItemForm--field">
                <Input
                  type="text"
                  placeholder={`Ingresa la ${name}`}
                  name={"name"}
                  value={input}
                  setInputValue={setInput}
                  isAutoFocus={true}
                  required={true}
                />
              </div>
          )}

          {/* {(modeUI === "EDIT" ||
            modeUI === "DELETE" ||
            (targetModeUI === "MODEL" && modeUI === "ADD")) && (
              <Select
                name={targetModeUI === "MODEL" ? "brandId" : "id"}
                // setValue={targetModeUI === "MODEL" ? setBrand : setValue}
                options={
                  targetModeUI === "MODEL"
                    ? targetModeUI["Brand"].options
                    : targetModeUI[targetModeUI].options
                }
                isDisabled={false}
                placeholder={`-- Selecciona una ${targetModeUI === "MODEL"
                  ? targetModeUI["Brand"].name
                  : targetModeUI[targetModeUI].name
                  } --`}
                isAutoFocus={true}
                required={true}
              />
            )}

          {targetModeUI === "MODEL" && modeUI !== "ADD" && (
            <Select
              name={"id"}
              // setValue={setValue}
              options={targetModeUI["MODEL"].options}
              isDisabled={false}
              placeholder={`-- Selecciona una ${targetModeUI[targetModeUI].name} --`}
              isAutoFocus={true}
              required={true}
            />
          )}
          {(modeUI === "ADD" || modeUI === "EDIT") && (
            <div className="AddNewItemForm--field">
              <Input
                type="text"
                placeholder={`Ingresa la ${targetModeUI[targetModeUI].name}`}
                name={"name"}
                // value={input}
                // setInputValue={setInput}
                isAutoFocus={true}
                required={true}
              />
            </div>
          )} */}

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
            // isDisabled={(value === "") ? true : false}
            // isDisabled={false}
            />
          </div>
          {/* {openModal && loading && !error && <p>Se esta Enviando</p>}
         {openModal && !loading && statusData.status === 201 && (
           <p>{statusData.statusText}</p>
         )}
         {openModal && error && !loading && <p>{statusData.error[0].message}</p>} */}
        </div>
      </form>
    );
  }

import React, { useRef, useState } from "react";
import { Input } from "UI/Input";
import { Select } from "UI/Select";
import { Button } from "UI/Button";
import useFetchingData from "Hooks/useFetchingData";
import useGetAddData from "Hooks/useGetData";
import './FormAddNewItem.css'
import { Loading } from "UI/Loading";


export default function FormCategory({ state, dispatch }) {
    const { modeUI, title, name, nameTitle, endPoint } = state;
    const { loading, data, error } = useGetAddData({endPoint})
    const formRef = useRef(null);    
    const [value, setValue] = useState("");
    const { fetchState, createData, deleteData, updateData } = useFetchingData();    

    const onSubmit = (e) => {
        e.preventDefault();
        let data = {};
        const formData = new FormData(formRef.current);
        const valueName = formData?.get("name")?.trimStart().trimEnd().toLowerCase();
        const id = Number(formData.get("id"));
        data = { name: valueName };
        
        switch (modeUI) {
            case 'ADD':
                createData({ endPoint, data})                
                break;
            case 'EDIT':
                updateData({ endPoint:`${endPoint}/${id}`, data })
                break;
            case 'DELETE':
                console.log(`${endPoint}/${id}`)
                deleteData({ endPoint:`${endPoint}/${id}`, data })
                break;
            default:
                break;
        }
        setValue("")
    }


const onClose = () => {
    dispatch({ type: 'RESET' })
};
console.log(fetchState);

return (
    <form className="AddNewItem--Form" ref={formRef} onSubmit={onSubmit}>
        <div className="AddNewItem--Form--container">
            <div className="AddNewItemForm--title">
                <h2>
                    {title} {nameTitle}
                </h2>
            </div>
            {fetchState.loading && <Loading />}
            {!fetchState.loading && <div className="AddNewItemForm--field">
                {modeUI === 'ADD' &&
                    <Input
                        type="text"
                        placeholder={`Ingresa la ${name}`}
                        name={"name"}
                        value={value}
                        setInputValue={setValue}
                        isAutoFocus={true}
                        required={true}
                    />}
                {(modeUI === 'EDIT' || modeUI === 'DELETE') && <Select
                    name={"id"}
                    setValue={setValue}
                    options={data}
                    isDisabled={false}
                    placeholder={`-- Selecciona una ${name} --`}
                    isAutoFocus={true}
                    required={true}
                />}
            </div>}
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
                />
            </div>
            {fetchState.status !== "" && <p>{fetchState.status}</p>}
            {/* {openModal && loading && !error && <p>Se esta Enviando</p>}
         {openModal && !loading && statusData.status === 201 && (
           <p>{statusData.statusText}</p>
         )}
         {openModal && error && !loading && <p>{statusData.error[0].message}</p>} */}
        </div>
    </form>
);
}

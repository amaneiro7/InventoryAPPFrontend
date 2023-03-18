import React, { lazy, Suspense } from 'react';
import useGetData from 'Hooks/useGetData';
import { AddIcon } from 'UI/Atoms/Icon/AddIcon';
import { DeleteIcon } from 'UI/Atoms/Icon/DeleteIcon';
import { EditIcon } from 'UI/Atoms/Icon/EditIcon';


const FormCategory = lazy(() => import('UI/Organisms/FormCategory'));
const FormBrand = lazy(() => import('UI/Organisms/FormBrand'));
const FormModel = lazy(() => import('UI/Organisms/FormModel'));
const Select = lazy(() => import('UI/Atoms/Select'));
const Loading = lazy(() => import('UI/Atoms/Loading'));
const Modal = lazy(() => import('UI/Atoms/Modal'));


export default function SelectForm({ name, value, endPoint, placeholder, type, onChange, isDisabled, state, dispatch, isAutoFocus }) {
    const { state: { data }} = useGetData({ endPoint })

    function onOpenModal({ modeUI, targetModeUI }) {
        dispatch({ type: targetModeUI, payload: data })
        dispatch({ type: modeUI, payload: data })
    }

    return (
        <div className='AddNewItemForm--field'>
            <AddIcon
                onHandle={() => onOpenModal({ modeUI: "ADD", targetModeUI: type })}
            />
            <Select
                name={name}
                value={value}
                onChange={onChange}
                options={data}
                placeholder={`-- Seleccione ${placeholder} --`}
                isDisabled={isDisabled}
                isAutoFocus={isAutoFocus}
            />
            <div>
                <EditIcon
                    onHandle={() => onOpenModal({ modeUI: "EDIT", targetModeUI: type })}
                />
                <DeleteIcon
                    onHandle={() => onOpenModal({ modeUI: "DELETE", targetModeUI: type })}
                />
            </div>
            {state.openModal && <Modal>
                <Suspense fallback={<Loading/>}>
                    {state.name === 'Categoria' && <FormCategory state={state} dispatch={dispatch} />}
                    {state.name === 'Marca' && <FormBrand state={state} dispatch={dispatch} />}
                    {state.name === 'Modelo' && <FormModel state={state} dispatch={dispatch} />}
                </Suspense>                
            </Modal>}
        </div>
    )
}

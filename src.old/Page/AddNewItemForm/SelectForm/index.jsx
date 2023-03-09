import React, { lazy, Suspense } from 'react';
import useGetAddData from 'Hooks/useGetData';
import { AddIcon } from 'UI/Icon/AddIcon';
import { DeleteIcon } from 'UI/Icon/DeleteIcon';
import { EditIcon } from 'UI/Icon/EditIcon';
import { Select } from 'UI/Select';
import { Modal } from 'UI/Modal';
import { Loading } from 'UI/Loading';

const FormCategory = lazy(() => import('Page/AddNewItemForm/FormCategory'))
const FormBrand = lazy(() => import('Page/AddNewItemForm/FormBrand'))
const FormModel = lazy(() => import('Page/AddNewItemForm/FormModel'))

export default function SelectForm({ name, endPoint, placeholder, type, setValue, isDisabled, state, dispatch }) {
    const { loading, data} = useGetAddData({ endPoint })    

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
                setValue={setValue}
                isDisabled={isDisabled}
                options={data}
                placeholder={`-- Seleccione ${placeholder} --`}
                isAutoFocus={true}
            />
            <div>
                <EditIcon
                    onHandle={() => onOpenModal({ modeUI: "EDIT", targetModeUI: type })}
                />
                <DeleteIcon
                    onHandle={() => onOpenModal({ modeUI: "DELETE", targetModeUI: type })}
                />
            </div>
            {(state.openModal || loading) && <Modal>
                <Suspense fallback={<Loading/>}>
                    {state.name === 'Categoria' && <FormCategory state={state} dispatch={dispatch} />}
                    {state.name === 'Marca' && <FormBrand state={state} dispatch={dispatch} />}
                    {state.name === 'Modelo' && <FormModel state={state} dispatch={dispatch} />}
                </Suspense>
                {loading && <Loading />}
            </Modal>}
        </div>
    )
}

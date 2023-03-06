import React from 'react';
import useGetAddData from 'Hooks/useGetData';
import { AddIcon } from 'UI/Icon/AddIcon';
import { DeleteIcon } from 'UI/Icon/DeleteIcon';
import { EditIcon } from 'UI/Icon/EditIcon';
import { Select } from 'UI/Select';
import { Modal } from 'UI/Modal';
import { Loading } from 'UI/Loading';
import { useReducerFromFormModal } from 'Hooks/useReducerFromFormModal';
import FormCategory from 'Page/AddNewItemForm/FormCategory';

export default function SelectForm({name, endPoint, placeholder, type, setValue, isDisabled}) {    
    const { loading, data, error } = useGetAddData({endPoint})
    const { state, dispatch } = useReducerFromFormModal()
    
    function onOpenModal({modeUI, targetModeUI}) {   
        dispatch({type: targetModeUI, payload: data})
        dispatch({type: modeUI, payload: data})
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
                {state.name === 'Categoria' && <FormCategory state={state} dispatch={dispatch} />}
                {loading && <Loading/>}
            </Modal>}
        </div>
    )
}

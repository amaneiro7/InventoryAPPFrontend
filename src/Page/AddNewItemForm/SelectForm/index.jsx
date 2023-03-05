import React, { useState, useContext } from 'react';
import useGetAddData from 'Hooks/useGetAddData';
import { AddIcon } from 'UI/Icon/AddIcon';
import { DeleteIcon } from 'UI/Icon/DeleteIcon';
import { EditIcon } from 'UI/Icon/EditIcon';
import { Select } from 'UI/Select';
import { Modal } from 'UI/Modal';
import { Loading } from 'UI/Loading';
import FormModal from '../FormModal';
import { InventaryContext } from 'context';

export default function SelectForm({name, endPoint, placeholder, type}) {    
    const { loading, data, error } = useGetAddData({endPoint})
    const [mode, setMode] = useState("");
    const [targetMode, setTargetMode] = useState("");
    const { setOpenModal, openModal } = useContext(InventaryContext)

    function onOpenModal({modeUI, targetModeUI}) {           
        setMode(modeUI)
        setTargetMode(targetModeUI)
        setOpenModal(true)
    }
    
    return (
        <div className='AddNewItemForm--field'>
            <AddIcon
                onHandle={() => onOpenModal({ modeUI: "add", targetModeUI: {type} })}
            />
            <Select
                name={name}
                // setValue={setCategory}
                isDisabled={false}
                options={data}
                placeholder={`-- Seleccione ${placeholder} --`}
                isAutoFocus={true}
            />
            <div>
                <EditIcon
                    onHandle={() => onOpenModal({ modeUI: "edit", targetModeUI: {type} })}
                />
                <DeleteIcon
                    onHandle={() => onOpenModal({ modeUI: "delete", targetModeUI: {type} })}
                />
            </div>
            {(openModal || loading) && <Modal>
                {openModal &&<FormModal mode={mode} setMode={setMode} targetMode={targetMode} setTargetMode={setTargetMode} />}
                {loading && <Loading/>}
            </Modal>}
        </div>
    )
}

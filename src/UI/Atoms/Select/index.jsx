import React from 'react';
import './Select.css'

export default function Select({
    name, 
    value, 
    options, 
    onChange, 
    placeholder, 
    isDisabled, 
    isAutoFocus = false, 
    hidden=true, 
    disabled=true, 
    size=undefined
}) {

    return (
        <div className={`AddNewItemForm--select ${size}`}>
            <select 
                name={name}
                value={value}                              
                onChange={onChange} 
                autoFocus={isAutoFocus ? true : undefined}
                disabled={isDisabled}
            >
                <option value={''} disabled={disabled} hidden={hidden}>{placeholder}</option>
                {options?.map((elem, index) =>
                    <option 
                        key={index}                        
                        name={elem?.name} 
                        value={elem?.id}
                    >
                        {elem?.name}
                    </option>)}
            </select>
        </div>
    )
}

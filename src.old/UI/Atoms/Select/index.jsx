import React from 'react';
import './Select.css'

export default function Select({name, value, options, onChange, placeholder, isDisabled, isAutoFocus = false}) {

    return (
        <div className='AddNewItemForm--select'>
            <select 
                name={name}
                value={value}                              
                onChange={onChange} 
                autoFocus={isAutoFocus ? true : undefined}
                disabled={isDisabled}
            >
                <option value={''} disabled hidden>{placeholder}</option>
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

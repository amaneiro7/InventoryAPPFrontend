import React from 'react';
import './Select.css'

export function Select({name, defaultValue = 'none', setValue, setValueName = null,options, placeholder, isDisabled, isAutoFocus = false}) {
    const onHandle = ({target}) => {        
        setValue(target.value)
        if(setValueName !== null) {
            setValueName(target.name)
        }
    }
    return (
        <div className='AddNewItemForm--select'>
            <select 
                defaultValue={defaultValue}
                name={name} 
                aria-label={name}
                id={name}                
                disabled={isDisabled}
                autoFocus={isAutoFocus ? true : undefined} 
                onChange={onHandle} 
            >
                <option value={'none'} disabled hidden>{placeholder}</option>
                {options?.map((elem, index) =>
                    <option key={index} name={elem?.name} value={elem?.id}
                    >
                        {elem?.name}
                    </option>)}
            </select>
        </div>
    )
}

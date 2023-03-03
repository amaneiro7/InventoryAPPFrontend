import React from 'react';

export function Select({name, setValue, setValueName = null,options, placeholder, isDisabled, isAutoFocus = false}) {
    const onHandle = ({target}) => {        
        setValue(target.value)
        if(setValueName !== null) {
            setValueName(target.name)
        }
    }
    return (
        <div className='AddNewItemForm--input'>
            <select 
                defaultValue={'none'}
                name={name} 
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

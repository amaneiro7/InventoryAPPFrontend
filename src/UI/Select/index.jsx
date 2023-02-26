import React from 'react';

export function Select({name, setValue, options, placeholder, isDisabled}) {    
    return (
        <div className='AddNewItemForm--input'>
            <select 
                defaultValue={'none'} 
                name={name} id={name}
                disabled={isDisabled}
                onChange={({ target: { value } }) => setValue(value)} 
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

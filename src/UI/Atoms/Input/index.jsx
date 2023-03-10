import React from 'react';
import './Input.css'

export default function Input({name, placeholder, value,defaultValue, setInputValue, type = 'text', isAutoFocus = false}) {
    const onSearchValueChange = ({target}) => setInputValue(target)
    return (
        <>
            <input 
                className='input'
                name={name}
                type={type} 
                placeholder={placeholder}
                // defaultValue={defaultValue}
                defaultValue={value}
                onChange={onSearchValueChange}
                autoFocus={isAutoFocus ? true : undefined}
            />
        </>
    )
}

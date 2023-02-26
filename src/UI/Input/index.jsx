import React from 'react';
import './Input.css'

export function Input({name, placeholder, value, setInputValue, type = 'text'}) {
    const onSearchValueChange = ({target: {value}}) => setInputValue(value)    
    return (
        <>
            <input 
                className='input'
                name={name}
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={onSearchValueChange}
            />
        </>
    )
}

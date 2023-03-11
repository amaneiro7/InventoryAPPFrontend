import React from 'react';
import './Input.css'

export default function Input({name, placeholder, value, setInputValue, type = 'text', isAutoFocus = false}) {
    const onSearchValueChange = ({target}) => setInputValue(target)
    return (
        <>
            <input 
                className='input'
                name={name}
                type={type} 
                placeholder={placeholder}                
                defaultValue={value}
                onChange={onSearchValueChange}
                onClick={({target}) => target.select()}
                autoFocus={isAutoFocus ? true : undefined}
            />
        </>
    )
}

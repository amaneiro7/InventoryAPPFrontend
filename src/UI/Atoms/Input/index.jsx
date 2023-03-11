import React from 'react';
import './Input.css'

export default function Input({name, placeholder, value, onChange, type = 'text', isAutoFocus = false, size}) {
    
    return (
        <>
            <input 
                className={`input ${size}`}
                name={name}
                type={type} 
                placeholder={placeholder}                
                defaultValue={value}
                onChange={onChange}
                onClick={({target}) => target.select()}
                autoFocus={isAutoFocus ? true : undefined}
            />
        </>
    )
}

import React from 'react';
import './Input.css'

export function Input({value, searchValue, setSearchValue}) {
    const onSearchValueChange = ({target: {value}}) => setSearchValue(value)
    return (
        <>
            <input 
                className='input' 
                type="text" 
                placeholder={value}
                value={searchValue}
                onChange={onSearchValueChange}
            />
        </>
    )
}

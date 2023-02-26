import React from 'react';
import './Button.css'

export function Button({type, onHandle, name}) {

    return (
        <>
            <button 
                className='btn'
                onClick={onHandle}
                type={type}
            >
                {name}
            </button>
        </>
    )
}

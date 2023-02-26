import React from 'react';
import './Button.css'

export function Button({type, onHandle, name, action = 'actionType'}) {

    return (
        <>
            <button 
                className={`btn ${action}`}
                onClick={onHandle}
                type={type}
            >
                {name}
            </button>
        </>
    )
}

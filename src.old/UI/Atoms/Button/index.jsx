import React from 'react';
import './Button.css'

export default function Button({type, onHandle, name, action = 'actionType', isDisabled = false}) {

    return (
        <>
            <button 
                className={`btn ${action}`}
                onClick={onHandle}
                type={type}
                disabled={isDisabled}
            >
                {name}
            </button>
        </>
    )
}

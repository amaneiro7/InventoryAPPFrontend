import React from 'react';
import './Button.css'

export function Button(props) {

    return (
        <>
            <button 
                className='btn'
                onClick={props.onHandle}
            >
                {props.name}
            </button>
        </>
    )
}

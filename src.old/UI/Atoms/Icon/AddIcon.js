import React from "react";
import { Icon } from ".";

export function AddIcon({onHandle}) {
    return (
        <Icon
            type='add'
            color={'#ff8a00'}
            onClick={onHandle}            
        />
    )    
}


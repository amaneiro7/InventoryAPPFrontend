import React from "react";
import { Icon } from ".";

export function DeleteIcon({onHandle}) {
    return (
        <Icon
            type='delete'
            color={'red'}
            onClick={onHandle}
        />
    )    
}


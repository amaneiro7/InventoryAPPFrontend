import React from "react";
import { Icon } from "./";

export function EditIcon({onHandle}) {
    return (
        <Icon
            type='edit'
            color={'#062e5c'}
            onClick={onHandle}
        />
    )    
}
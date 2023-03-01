import React from 'react';
import { ReactComponent as AddSVG} from './add.svg';
import { ReactComponent as EditSVG} from './edit.svg';
import { ReactComponent as DeleteSVG} from './delete.svg';
import './Icon.css';

const iconTypes = {
    "add": color => (
        <AddSVG className='Icon-svg Icon-svg--add' fill={color} />
    ),
    "edit": color => (
        <EditSVG className='Icon-svg Icon-svg--edit' fill={color} />
    ),
    "delete": color => (
        <DeleteSVG className='Icon-svg Icon-svg--delete' fill={color} />
    ),
    
}

export function Icon({type, color, onClick}) {
    return (
        <span
            className={`Icon-container Icon-container--${type}`}
            onClick={onClick}
        >
            {iconTypes[type](color)}
        </span>
    );
}
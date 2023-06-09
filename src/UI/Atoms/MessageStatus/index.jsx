import React from "react";
import './MessageStatus.css'

export default function MessageStatus({ message, status, messageInfo = null}) {
    return (
        <div className={`MessageStatus ${status}`}>
            <p>{messageInfo}  {message}</p>
        </div>
    )
}
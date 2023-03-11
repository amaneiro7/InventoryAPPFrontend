import { createPortal } from "react-dom";
import './Modal.css'


export default function Modal({ children }) {
    return createPortal(
        <div className="ModalBackground">
            {children}
        </div>,
        document.getElementById('modal')
    )
}

import React, { createContext, useState } from "react";

export const InventaryContext = createContext();

export function InventaryProvider(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [upload, setUpload] = useState(false);
    const [openModal, setOpenModal] = useState(false);



    return (
        <InventaryContext.Provider
            value={{

                loading,
                setLoading,
                error,
                setError,
                openModal,
                setOpenModal,

            }}
        >
            {props.children}
        </InventaryContext.Provider>
    );
}

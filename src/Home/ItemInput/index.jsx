import React, { useEffect, useState } from 'react';
import { getItems } from '../../services/getData';


export function ItemInput(props) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getItems().then(response => {
            setItems(response.data);
            setError(false);
            console.log(response.data);
        }).catch(error => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return (
        <section className='main-input'>
            <label htmlFor="Descripcion">Serial</label>
            <select name="Serial" id="Serial">
                {items.map(item => {
                    return (
                        <option key={item.id} value={item.serial}>{item.serial}</option>
                    );
                })}
            </select>
            <label htmlFor="Descripcion">Activo</label>
            <select name="Activo" id="Activo">
                {items.map(item => {
                    return (
                        <option key={item.id} value={item.actvi}>{item.activo}</option>
                    );
                })}
            </select>
        </section>
    )
}

import React, { useEffect, useState } from 'react';
import { getModels } from '../../services/getData';


export function ModelsInput(props) {
    const [models, setModels] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getModels().then(response => {
            setModels(response.data);
            setError(false);
        }).catch(error => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return (
        <section className='main-input'>
            <label htmlFor="Descripcion">Modelo</label>
            <select name="Categoria" id="Categoria">
                {models.map(model => {
                    return (
                        <option key={model.id} value={model.id}>{model.name}</option>
                    );
                })}
                <button type='button' onClick={() => console.log('he clickeado')}>Agrega una nueva categoria</button>
            </select>
        </section>
    )
}

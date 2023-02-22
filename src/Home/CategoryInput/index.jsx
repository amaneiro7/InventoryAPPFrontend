import React, { useEffect, useState } from 'react';
import { getCategories } from '../../services/getData';


export function CategoryInput(props) {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then(response => {
            setCategories(response.data);
            setError(false);
        }).catch(error => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return (
        <section className='main-input'>
            <label htmlFor="Descripcion">Categoria</label>
            <select name="Categoria" id="Categoria">
                {categories.map(category => {
                    return (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    );
                })}
                <button type='button' onClick={() => console.log('he clickeado')}>Agrega una nueva categoria</button>
            </select>
        </section>
    )
}

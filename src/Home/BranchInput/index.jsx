import React, { useEffect, useState } from 'react';
import { getBranches } from '../../services/getData';


export function BranchInput(props) {
    const [branches, setBranches] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getBranches().then(response => {
            setBranches(response.data);
            setError(false);
        }).catch(error => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return (
        <section className='main-input'>
            <label htmlFor="Descripcion">Marca</label>
            <select name="Categoria" id="Categoria">
                {branches.map(branch => {
                    return (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                    );
                })}
                <button type='button' onClick={() => console.log('he clickeado')}>Agrega una nueva categoria</button>
            </select>
        </section>
    )
}

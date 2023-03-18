import { InventaryContext } from 'context';
import React, { useContext } from 'react';
import { BalanceTable } from './BalanceTable';
import './Dashboard.css'

export default function Dashboard() {
const {dataCategory} = useContext(InventaryContext);

    return (
        <main className="main-inputs">
            <div>
                <h1>Balance General</h1>
            </div>
            <section className='Balance__Container'>
                {dataCategory.map(categories => {
                    return (
                        <BalanceTable
                            key={categories.id}
                            data={categories}
                        />)
                })}
            </section>
        </main>
    )
}

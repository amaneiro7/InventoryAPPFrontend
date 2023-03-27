import { InventaryContext } from 'context';
import React, { lazy, useContext } from 'react';
import './Dashboard.css'

const BalanceTable = lazy(() => import('./BalanceTable'))

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

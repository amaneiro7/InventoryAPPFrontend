import { InventaryContext } from 'context';
import React, { lazy, Suspense, useContext } from 'react';
import './Dashboard.css'

const BalanceTable = lazy(() => import('./BalanceTable'))

export default function Dashboard() {
    const { dataCategory } = useContext(InventaryContext);

    return (
        <main className="main-inputs">
            <div>
                <h1>Balance General</h1>
            </div>
            <section className='Balance__Container'>
                <Suspense>
                    {dataCategory.map(categories => 
                        <BalanceTable 
                            key={categories.id} 
                            data={categories}
                        />
                    )}
                </Suspense>
            </section>
        </main>
    )
}

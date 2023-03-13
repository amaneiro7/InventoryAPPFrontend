import useGetData from 'Hooks/useGetData';
import React, { useEffect } from 'react';
import { BalanceTable } from './BalanceTable';
import './Dashboard.css'

export default function Dashboard() {
    // useEffect(() => {
    const { state: { data } } = useGetData({ endPoint: "categories" })
    // }, [])

    return (
        <main className="main-inputs">
            <div>
                <h1>Balance General</h1>
            </div>
            <section className='Balance__Container'>
                {data.map(categories => {
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

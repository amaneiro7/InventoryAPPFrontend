import React from 'react';
import { CategoryInput } from './CategoryInput';
import { ItemInput } from "./ItemInput";
import { BranchInput } from "./BranchInput";
import { ModelsInput } from "./ModelsInput";
import './Home.css'

export function Home() {
    return (
        <main className='main-inputs'>
            <h1>InventarioAPP</h1>
            <section className='main-section'>
                <CategoryInput />
                <ItemInput/>
                <BranchInput/>
                <ModelsInput/>
            </section>
        </main>
    )
}

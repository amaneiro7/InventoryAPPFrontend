import React from 'react';
import { CategoryInput } from './CategoryInput';
import { ItemInput } from "./ItemInput";
import { BranchInput } from "./BranchInput";
import { ModelsInput } from "./ModelsInput";
import './Menu.css';

export function Home() {
    return (
        <main>
            <h1>InventarioAPP</h1>
            <section>
                <CategoryInput />
                <ItemInput/>
                <BranchInput/>
                <ModelsInput/>
            </section>
        </main>
    )
}

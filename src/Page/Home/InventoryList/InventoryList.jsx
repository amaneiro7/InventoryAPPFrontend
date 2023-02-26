import React, { useContext } from 'react';
import { InventaryContext } from "../../../Hooks";

export function InventoryList() {
    const {searchedItems} = useContext(InventaryContext)
    return (
        <>
            {searchedItems?.map(item => {
                return (
                    <tr key={item.id}>
                        <td>{item.category.name}</td>
                        <td>{item.serial}</td>
                        <td>{item.activo}</td>
                        <td>{item.brand.name}</td>
                        <td>{item.model.name}</td>
                    </tr>
                )
            })}
        </>
    )
}

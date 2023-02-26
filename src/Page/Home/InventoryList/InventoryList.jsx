import React, { useContext } from 'react';
import { InventaryContext } from "../../../useContext/index";

export function InventoryList() {
    const {searchedItems} = useContext(InventaryContext)
    return (
        <>
            {searchedItems.map(item => {
                return (
                    <tr key={item.id}>
                        <td>{item.category.name}</td>
                        <td>{item.serial}</td>
                        <td>{item.activo}</td>
                        <td>{item.branch.name}</td>
                        <td>{item.model.name}</td>
                    </tr>
                )
            })}
        </>
    )
}

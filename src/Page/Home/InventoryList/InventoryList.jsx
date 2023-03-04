import React, { useContext } from 'react';
import { InventaryContext } from "../../../Hooks";
import { useNavigate } from 'react-router-dom';

export function InventoryList() {
    const {searchedItems} = useContext(InventaryContext)
    const navigate = useNavigate()
    
    return (
        <>
            {searchedItems?.map(item => {
                
                return (
                    <tr key={item?.id}
                        onDoubleClick={() => navigate(
                            `viewdetail/${item?.id}`,
                            {
                                state: {item}
                            }
                            )}>
                        <td>{item?.category?.name}</td>
                        <td>{item?.serial}</td>
                        <td>{item?.activo}</td>
                        <td>{item?.brand?.name}</td>
                        <td>{item?.model?.name}</td>
                    </tr>
                )
            })}
        </>
    )
}

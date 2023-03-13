import React, { Suspense, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventaryContext } from 'context';


export default function InventoryList() {
    const { searchedItems } = useContext(InventaryContext)
    
    const navigate = useNavigate()
    
    return (
        <>  
            <Suspense fallback={<p>...Loading</p>}>
                {searchedItems?.map(item => {
                    return (
                        <tr 
                            key={item?.id}
                            onDoubleClick={() => 
                                navigate(`viewdetail/${item?.id}`, {
                                    state: { item },
                                })
                            }
                        >
                            <td>{item?.category?.name}</td>
                            <td>{item?.serial}</td>
                            <td>{item?.activo}</td>
                            <td>{item?.brand?.name}</td>
                            <td>{item?.model?.name}</td>
                        </tr>
                    )
                })}
            </Suspense>
        </>
    )
}

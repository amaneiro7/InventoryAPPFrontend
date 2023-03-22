import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InventoryList({searchedItems}) {
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
                            <td>{item?.status ? 'Operativo' : 'Dañado'}</td>
                            <td>{item?.obsolete ? 'Si' : 'No'}</td>
                        </tr>
                    )
                })}
            </Suspense>
        </>
    )
}

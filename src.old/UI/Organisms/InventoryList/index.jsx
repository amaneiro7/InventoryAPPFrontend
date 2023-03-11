import React, { useTransition, Suspense } from 'react';
import useGetSearch from 'Hooks/useGetDataHome';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'UI/Atoms/Loading';
import { Modal } from 'UI/Atoms/Modal';


export default function InventoryList() {
    const { searchedItems } = useGetSearch()
    const [isPending, startTransition] = useTransition();

    const navigate = useNavigate()

    return (
        <>
            <Suspense fallback={<p>...Loading</p>}>
                {searchedItems?.map(item => {
                    return (
                        <tr 
                            key={item?.id}
                            onDoubleClick={() => 
                                // Envolvemos la navegacion en un transicion
                                startTransition(() => 
                                    navigate(`viewdetail/${item?.id}`, {
                                        state: { item },
                                    })
                                )
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
            {/* Indicador para la transicion pendiente */}
            {isPending ? <p>...Loading</p> : null}
        </>
    )
}

// <Modal><Loading /></Modal>
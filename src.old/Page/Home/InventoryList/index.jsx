import useGetSearch from 'Hooks/useGetDataHome';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'UI/Loading';
import { Modal } from 'UI/Modal';


export default function InventoryList() {
    const { searchedItems, loading } = useGetSearch()
    const navigate = useNavigate()

    return (
        <>
            <Suspense fallback={<Modal><Loading /></Modal>}>
                {searchedItems?.map(item => {

                    return (
                        <tr key={item?.id}
                            onDoubleClick={() => navigate(
                                `viewdetail/${item?.id}`,
                                {
                                    state: { item }
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
            </Suspense>
        </>
    )
}
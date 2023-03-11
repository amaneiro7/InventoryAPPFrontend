import React, { Suspense, lazy, useContext } from 'react';
import { InventaryContext } from 'context';
import Modal from 'UI/Atoms/Modal';
import Loading from 'UI/Atoms/Loading';

const Input = lazy(() => import('UI/Atoms/Input'));

export default function TableTitle() {
    const {
        searchValueCategory,
        searchValueSerial,
        searchValueActivo,
        searchValueBrand,
        searchValueModel,
        setSearchValueCategory,
        setSearchValueSerial,
        setSearchValueActivo,
        setSearchValueBrand,
        setSearchValueModel,
    } = useContext(InventaryContext)

    return (
        <Suspense fallback={<Modal><Loading/></Modal>}>
            <tr className='main-table--title'>
                <th>
                    <h3>
                        Categoria
                    </h3>
                    <Input
                        name={''}
                        type={'text'}
                        placeholder={"Categoria"}
                        value={searchValueCategory}
                        onChange={({ target: { value } }) => setSearchValueCategory(value)}
                        isAutoFocus={false}
                    />
                </th>
                <th>
                    <h3>Serial</h3>
                    <Input
                        name={''}
                        type={'text'}
                        placeholder={"Serial"}
                        value={searchValueSerial}
                        onChange={({ target: { value } }) => setSearchValueSerial(value)}
                        isAutoFocus={true}
                    />
                </th>
                <th>
                    <h3>Activo</h3>
                    <Input
                        name={''}
                        type={'text'}
                        placeholder={"Activo"}
                        value={searchValueActivo}
                        onChange={({ target: { value } }) => setSearchValueActivo(value)}
                        isAutoFocus={false}
                    />
                </th>
                <th>
                    <h3>Marca</h3>
                    <Input
                        name={''}
                        type={'text'}
                        placeholder={"Marca"}
                        value={searchValueBrand}
                        onChange={({ target: { value } }) => setSearchValueBrand(value)}
                        isAutoFocus={false}
                    />
                </th>
                <th>
                    <h3>Modelo</h3>
                    <Input
                        name={''}
                        type={'text'}
                        placeholder={"Modelo"}
                        value={searchValueModel}
                        onChange={({ target: { value } }) => setSearchValueModel(value)}
                        isAutoFocus={false}
                    />
                </th>
            </tr>
        </Suspense>
    )
}

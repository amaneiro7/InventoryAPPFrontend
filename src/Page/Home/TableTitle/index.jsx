import React, { useContext } from 'react';
import { Input } from "../../../UI/Input"
import { InventaryContext } from "../../../useContext/index";

export function TableTitle() {
    const {
        searchValueCategory,
        searchValueSerial,
        searchValueActivo,
        searchValueBranch,
        searchValueModel,
        setSearchValueCategory,
        setSearchValueSerial,
        setSearchValueActivo,
        setSearchValueBranch,
        setSearchValueModel,
    } = useContext(InventaryContext)

    return (
        <tr className='main-table--title'>
            <th>Categoria<Input
                name={''}
                type={'text'}
                placeholder={"Categoria"}
                value={searchValueCategory}
                setInputValue={setSearchValueCategory} />
            </th>
            <th>Serial<Input
                name={''}
                type={'text'}
                placeholder={"Serial"}
                value={searchValueSerial}
                setInputValue={setSearchValueSerial} />
            </th>
            <th>Activo<Input
                name={''}
                type={'text'}
                placeholder={"Activo"}
                value={searchValueActivo}
                setInputValue={setSearchValueActivo} />
            </th>
            <th>Marca<Input
                name={''}
                type={'text'}
                placeholder={"Marca"}
                value={searchValueBranch}
                setInputValue={setSearchValueBranch} />
            </th>
            <th>Modelo<Input
                name={''}
                type={'text'}
                placeholder={"Modelo"}
                value={searchValueModel}
                setInputValue={setSearchValueModel} />
            </th>
        </tr>
    )
}

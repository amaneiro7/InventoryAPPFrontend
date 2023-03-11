import React, { lazy, Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import logo from 'assets/Logo.png';
import './Menu.css';

const Loading = lazy(() => import('UI/Atoms/Loading'));

export default function Menu() {
    return (
        <>
            <header className='header'>
                <nav className='menu'>
                    <div className='menu-column menu-logo'>
                        <a href="/">
                            <img src={logo} alt="Logo" />
                        </a>
                    </div>
                    <div className='menu-colum menu-list'>
                        <NavLink className={({isActive}) => isActive ? "selected" : undefined} to={'/'}>Home <br /></NavLink>
                        <NavLink className={({isActive}) => isActive ? "selected" : undefined} to={'/addnewitem'}>Agregar <br /></NavLink>
                        <NavLink className={({isActive}) => isActive ? "selected" : undefined} to={'/dashboard'}>Dashboard <br /></NavLink>                    
                    </div>
                </nav>
            </header>
            <Suspense fallback={<Loading/>}>
                <Outlet />
            </Suspense>
        </>
    )
}

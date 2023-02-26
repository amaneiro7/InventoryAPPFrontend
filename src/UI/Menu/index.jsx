import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import './Menu.css';

export function Menu() {
    return (
        <header className='header'>
            <nav className='menu'>
                <div className='menu-column menu-logo'>
                    <a href="/">
                        <img src={logo} alt="Logo" />
                    </a>
                </div>
                <div className='menu-colum menu-list'>
                    <NavLink className={({isActive}) => isActive ? "selected" : undefined} to={'/'}>Home <br /></NavLink>
                    <NavLink className={({isActive}) => isActive ? "selected" : undefined} to={'/dashboard'}>Dashboard <br /></NavLink>
                </div>
            </nav>
        </header>
    )
}

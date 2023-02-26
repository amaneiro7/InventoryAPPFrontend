import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from '../Page/Dashboard';
import { Home } from '../Page/Home';
import { AddNewItemForm } from '../Page/AddNewItemForm';
import { Menu } from '../UI/Menu';
import { InventaryProvider } from '../Hooks';
import './App.css';

function App() {
  return (
    <InventaryProvider>
      <HashRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addnewitem" element={<AddNewItemForm/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path='*' element={<p>Not Found</p>}/>
        </Routes>
      </HashRouter>
    </InventaryProvider>    
  );
}

export default App;

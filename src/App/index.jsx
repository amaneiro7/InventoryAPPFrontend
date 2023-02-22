import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from '../Dashboard';
import { Home } from '../Home';
import { Menu } from '../Menu';
import { InventaryProvider } from '../useContext';


import './App.css';


function App() {
  return (
    // <InventaryProvider>
      <HashRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path='*' element={<p>Not Found</p>}/>
        </Routes>
      </HashRouter>
    // </InventaryProvider>    
  );
}

export default App;

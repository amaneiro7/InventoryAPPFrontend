import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../Page/Home';
import { AddNewItemForm } from '../Page/AddNewItemForm';
import { Dashboard } from '../Page/Dashboard';
import { ViewDetail } from '../Page/ViewDetail';
import { Menu } from '../UI/Menu';
import { InventaryProvider } from '../Hooks';
import './App.css';

function App() {
  return (
    <InventaryProvider>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addnewitem" element={<AddNewItemForm/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/viewdetail/:id" element={<ViewDetail/>} />
          <Route path='*' element={<p>Not Found</p>}/>
        </Routes>
      </BrowserRouter>
    </InventaryProvider>    
  );
}

export default App;

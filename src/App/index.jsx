import React, { lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { InventaryProvider } from 'context';
import './App.css';

const Menu = lazy(() => import('UI/Molecules/Menu'))
const Home = lazy(() => import('Page/Home'))
const AddNewItemForm  = lazy(() => import('Page/AddNewItemForm'))
const Dashboard = lazy(() => import('Page/Dashboard'))
const ViewDetail = lazy(() => import('Page/ViewDetail'))

function App() {
  return (
    <InventaryProvider>
      <BrowserRouter>        
        <Routes>
          <Route path='/' element={<Menu/>}>
            <Route path="/" element={<Home/>} />            
            <Route path="/addnewitem" element={<AddNewItemForm/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/viewdetail/:id" element={<ViewDetail/>} />
            <Route path='*' element={<p>Not Found</p>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </InventaryProvider>    
  );
}

export default App;

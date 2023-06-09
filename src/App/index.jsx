import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { InventaryProvider } from 'context';
import ErrorBoundary from './ErrorBoundary';
import Loading from 'UI/Atoms/Loading';
import './App.css';

const Menu = lazy(() => import('UI/Molecules/Menu'))
const Home = lazy(() => import('Page/Home'))
const AddNewItemForm = lazy(() => import('Page/AddNewItemForm'))
const Dashboard = lazy(() => import('Page/Dashboard'))
const ViewDetail = lazy(() => import('Page/ViewDetail'))

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading/>}>
        <InventaryProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Menu />}>
                <Route path="/" element={<Home />} />
                <Route path="/addnewitem" element={<AddNewItemForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/viewdetail/:id" element={<ViewDetail />} />
                <Route path='*' element={<p>Not Found</p>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </InventaryProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

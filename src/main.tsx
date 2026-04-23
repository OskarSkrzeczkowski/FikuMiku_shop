import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductPage } from './components/productPage';
import './App.css';
import Home from './Home';
import { Layout } from './components/layout';

/*Komponent główny, którego zadaniem jest nawigacja po aplikacji*/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Layout />}>
          
         
          <Route index element={<Home />} />
          
     
          <Route path="produkt/:slug" element={<ProductPage />} />
          
        
          <Route path="*" element={<div className="py-20 text-center">Nie znaleziono strony</div>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

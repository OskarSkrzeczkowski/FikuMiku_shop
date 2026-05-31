import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsPage } from './components/productsPage';
import { ProductPage } from './components/productPage';
import { LoginPage } from './components/loginPage';
import { BrandsPage } from './navComponents/brands';
import { ContactPage } from './navComponents/contact';
import { AboutPage } from './navComponents/aboutPage';
import { FavoritesPage } from './components/productList';
import { CartPage } from './components/cartPage';
import './App.css';
import Home from './Home';
import { Layout } from './components/layout';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { SearchPage } from './navComponents/searchPage';
import { OrdersHistoryPage } from './components/OrdersHistoryPage';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <CartProvider>
     <FavoritesProvider>
       <BrowserRouter>
        <Routes>
       
          <Route path="/" element={<Layout />}>
          
          <Route index element={<Home />} />
          
          <Route path="produkt/:slug" element={<ProductPage />} />

          <Route path="sklep/:type/:value" element={<ProductsPage />} />  

          <Route path="logowanie" element={<LoginPage />} />

          <Route path="marki" element={<BrandsPage />} />

          <Route path="kontakt" element={<ContactPage />} />

          <Route path="onas" element={<AboutPage />} />

          <Route path="ulubione" element={<FavoritesPage />} />

          <Route path="koszyk" element={<CartPage />} />

          <Route path="polityka" element={<PrivacyPolicy />} />

          <Route path="/szukaj" element={<SearchPage />} />

          <Route path="zamowienia" element={<OrdersHistoryPage />} />
        
          <Route path="*" element={<div className="py-20 text-center">Element strony w trakcie prac</div>} />
  
          </Route>
        </Routes>
      </BrowserRouter>
     </FavoritesProvider>
    </CartProvider>
    </AuthProvider>
  </StrictMode>
);

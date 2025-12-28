import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './landingpage/home/HomePage';
import AboutPage from './landingpage/about/AboutPage';
import PricingPage from './landingpage/pricing/PricingPage';
import ProductsPage from './landingpage/products/ProductsPage';
import SupportPage from './landingpage/support/SupportPage';
import Navbar from './landingpage/Navbar';
import Footer from './landingpage/Footer';
import NotFound from './landingpage/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/about' element={<AboutPage/>}/>
    <Route path='/pricing' element={<PricingPage/>}/>
    <Route path='/product' element={<ProductsPage/>}/>
    <Route path='/support' element={<SupportPage/>}/>
    <Route path='*' element={<NotFound/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
);



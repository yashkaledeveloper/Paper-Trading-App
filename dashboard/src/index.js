import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { CookiesProvider } from 'react-cookie';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './components/Login';
import Signup from './components/Signup';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider> 
     <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

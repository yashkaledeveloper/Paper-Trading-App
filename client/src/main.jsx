import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import NotFound from './Pages/NotFound';
import './index.css'
import App from './App'
import { CookiesProvider } from 'react-cookie';
import Hero from './Pages/Hero';
import ProtectedRoute from './Pages/ProtectedRoute';


createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<ProtectedRoute><App/></ProtectedRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/hero' element={<Hero/>}/>
    </Routes>
  </BrowserRouter>
  </CookiesProvider>
)

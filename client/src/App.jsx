import React from 'react'
import SideBar from './Pages/components/SideBar'
import Navbar from './Pages/components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Search from './Pages/Search'
import Portfolio from './Pages/Portfolio'
import WatchList from './Pages/WatchList'
import Holding from './Pages/Holding'
import NotFound from './Pages/NotFound'
import Order from './Pages/Order'
import Positions from './Pages/Positions'
import Wallet from './Pages/Wallet'
import BuyPopup from './Pages/components/BuyPopup'
import './App.css'
import Hero from './Pages/Hero'
import "./Pages/css/Hero.css"
import ProtectedRoute from './Pages/ProtectedRoute'

const App = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <SideBar />
        <div className="mainBar">
            <Routes>
              {/* <Route path='/' element={<Hero/>}/> */}
              <Route path='/search' element={<Search/>}/>
              <Route path='/' element={<WatchList/>}/>
              <Route path='/orders' element={<Order/>}/>
              <Route path='/holdings' element={<Holding/>}/>
              <Route path='/positions' element={<Positions/>}/>
              <Route path='/portfolio' element={<Portfolio/>}/>
              <Route path='/wallet' element={<WatchList/>}/>
              <Route path='/congrats' element={<Hero/>}/>
              {/* <Route path='/ex' element={<BuyPopup/>}/> */}
              <Route path='*' element={<NotFound/>}/>
            </Routes>
            
        </div>
      </div>
    </>
  )
}

export default App
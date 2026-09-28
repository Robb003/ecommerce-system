import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Myorders from './pages/Myorders'
import OrderDetails from './pages/OrderDetails'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Collection from './pages/Collection'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Product/>} />
      <Route path='/collection' element={<Collection/>}  />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/myorders' element={<Myorders/>} />
      <Route path='/orders/:orderId' element={<OrderDetails/>} />
    </Routes> 
    <Footer />
    </>
  )
}
export default App
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Products'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Myorders from './pages/Myorders'
import ProductDetails from './pages/ProductDetails'
import OrderDetails from './pages/OrderDetails'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Product/>} />
      <Route path='/category' element={<Category/>}  />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/myorders' element={<Myorders/>} />
      <Route path='/products/:productId' element={<ProductDetails/>} />
      <Route path='/orders/:orderId' element={<OrderDetails/>} />
    </Routes> 
    <Footer />
    </>
  )
}
export default App
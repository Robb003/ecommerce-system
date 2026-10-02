import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Myorders from './pages/Myorders'
import OrderDetails from './pages/OrderDetails'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Collection from './pages/Collection'
import Searchbar from './components/Searchbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import About from './pages/About'
import { Contact } from 'lucide-react'

const App = () => {
  return (
    <>
    <ToastContainer />
    <Navbar />
    <Searchbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/product/:productId' element={<Product/>} />
      <Route path='/collection' element={<Collection/>}  />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/myorders' element={<Myorders/>} />
      <Route path='/orders/:orderId' element={<OrderDetails/>} />
    </Routes> 
    <Footer />
    </>
  )
}
export default App
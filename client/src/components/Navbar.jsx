import React from 'react'
import { useState } from 'react';
import {Link, NavLink } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X} from 'lucide-react'
import {assets} from "../assets/assets"


function Navbar() {
    const [visible, setVisible] = useState(false);
  return (
    <div className=' flex items-center justify-between py-5 font-medium'>
        <Link to='/'><img src={assets.Logo} className='w-36' alt="" /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/cart' className='flex flex-col items-center gap-1'>
                <p>CART</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/products' className='flex flex-col items-center gap-1'>
                <p>PRODUCTS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/myorders' className='flex flex-col items-center gap-1'>
                <p>MY ORDERS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

        </ul>
        <div className="flex items-center">
             <Search className="w-5 h-5 text-gray-700 cursor-pointer hover:text-black transition" />
        </div>

{/* Cart */}
        <div>
         <Link
          to="/cart"
         className="relative flex items-center justify-center"
         >
         <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black transition" />
         </Link>
         <Menu onClick={()=>setVisible(true)} className='w-6 h-6 cursor-pointer sm:hidden' />
        </div>
        {/*sidebar menu for small screens*/}
        <div className={`absolute top-0 bottom-0 overflow-hidden bg-white transition-all ${visible ?'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className=' flex items-center gap-4 p-3 cursor-pointer'>
                    <X className='h-4' />
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} to='/'>Home</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/cart'>Cart</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/collection'>Collection</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/products'>Products</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/myorders'>MY ORDERS</NavLink>
            </div>

        </div>
    </div>
  )
}

export default Navbar

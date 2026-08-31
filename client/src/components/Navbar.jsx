import React from 'react'
import { useState } from 'react';
import {Link, NavLink } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X} from 'lucide-react'


function Navbar() {
    const [visble, setVisble] = useState(false);
  return (
    <div className=' flex items-center justify-between py-5 font-medium'>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700 hidden'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/cart' className='flex flex-col items-center gap-1'>
                <p>CART</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            <NavLink to='/categories' className='flex flex-col items-center gap-1'>
                <p>CATEGORIES</p>
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
         <Menu onClick={()=>setVisble(true)} className='w-6 h-6 cursor-pointer sm:hidden' />
        </div>
        {/*sidebar menu for small screens*/}
        <div className={`absolute top-0 bottom-0 overflow-hidden bg-white transition-all ${visble ?'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisble(false)} className=' flex items-center gap-4 p-3 cusor-pointer'>
                    <X className='h-4' />
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisble(false)} to='/'>Home</NavLink>
                <NavLink onClick={()=>setVisble(false)} to='/cart'>Cart</NavLink>
                <NavLink onClick={()=>setVisble(false)} to='/categories'>Categories</NavLink>
                <NavLink onClick={()=>setVisble(false)} to='/products'>Products</NavLink>
                <NavLink onClick={()=>setVisble(false)} to='/myorders'>MY ORDERS</NavLink>
            </div>

        </div>
    </div>
  )
}

export default Navbar

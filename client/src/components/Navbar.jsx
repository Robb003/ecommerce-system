import React from 'react'
import { useState } from 'react';
import {Link, NavLink } from 'react-router-dom'
import {assets} from "../assets/assets"
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';


function Navbar() {
    const [visible, setVisible] = useState(false);
    const {setShowSearch} = useContext(ShopContext);
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
            <NavLink to='/myorders' className='flex flex-col items-center gap-1'>
                <p>MY ORDERS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

        </ul>
        <div className="flex items-center">
            <img onClick={()=>setShowSearch(true)} className='w-15 cursor-pointer' src= {assets.search_icone} alt= " " />
        </div>

{/* Cart */}
        <div>
         <Link
          to="/cart"
         className="relative"
         >
         <img src={assets.carticon} className='w-15 min-w-15' alt= " " />
         </Link>
         <img onClick={()=>setVisible(true)} src={assets.menuIcon} className='w-10 h-10 cursor-pointer sm:hidden' />
        </div>
        {/*sidebar menu for small screens*/}
        <div className={`absolute top-0 bottom-0 overflow-hidden bg-white transition-all ${visible ?'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className=' flex items-center gap-4 p-3 cursor-pointer'>
                    <img src={assets.Xicon} className='h-10' />
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} to='/'>Home</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/cart'>Cart</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/collection'>Collection</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/myorders'>MY ORDERS</NavLink>
            </div>

        </div>
    </div>
  )
}

export default Navbar

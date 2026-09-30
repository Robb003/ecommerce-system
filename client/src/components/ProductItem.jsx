import React from 'react'
import { Link } from 'react-router-dom'
import {  ShopContext } from '../context/ShopContext'
import { useContext } from 'react'


function ProductItem({id, image, name, price}) {
   // const ProductItem = ({id, image, name, price})
   const {Currency} = useContext(ShopContext)
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='w-full h-[300px] object-contain hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'> {Currency}{price}</p>

    </Link>
  )
}

export default ProductItem

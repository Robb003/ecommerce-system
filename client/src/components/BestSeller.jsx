import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react';
import { useEffect } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
    //get all the products using the products api
    const {products} = useContext(ShopContext);
    //add a state variable
    const [bestSeller, setBestSeller] = useState([]);

    //find the best seller products
    useEffect(()=>{
        const bestProduct = products.filter((items)=>(items.bestSeller));
        setBestSeller(bestProduct.slice(0,5));

    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='w-3/4 m-auto text-xs md:text-base text-gray-600'>
                 Discover the styles our customers love most — carefully selected
                 bestsellers that combine quality, comfort, and timeless fashion.
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {/*map bestseller*/}
            {
                bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price} />

                ))
            }

        </div>
      
    </div>
  )
}

export default BestSeller

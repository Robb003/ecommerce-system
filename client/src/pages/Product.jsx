import React from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { useEffect } from 'react';

const Product=()=> {
  const {productId} = useParams();
  console.log(productId)
  const {products} = useContext(ShopContext);
  const [productData, setProductData] =useState(false);
  

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item.id == productId){
        setProductData(item)
        console.log(item)
        return null;
      }
    })
    
  }

  useEffect(()=>{
    fetchProductData()

  }, [productId, products])
  return (
    <div>
      
    </div>
  )
}

export default Product

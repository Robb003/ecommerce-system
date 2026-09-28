//filtering products based on categories
//sorting products based on prices


import React from 'react'
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { useEffect } from 'react';
import ProductItem from '../components/ProductItem';

const Collection= ()=> {
  const {products} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  //toggle functions for categories
  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  //toggle functions for subcategories

  const toggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item=> item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }

  }

  //create one filter with the category and subcategory
  const applyFilter = ()=>{
    let productsCopy = products.slice();

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy)
  }
  //create a useeffect for fetching the products

  useEffect(()=>{
    applyFilter();

  },[category, subCategory])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/*filters on the left side*/}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.Dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}  alt="" />
        </p>
        {/*Category filters*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Men' onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Women' onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Kids' onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        {/*Subcategory filter*/}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory} />Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/*Right side diplaying the images*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/*PRODUCT SORT*/}
          <select className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>

        </div>
        {/*Map products*/}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {/*map all the products*/}
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }

        </div>

      </div>

      
    </div>
  )
}

export default Collection

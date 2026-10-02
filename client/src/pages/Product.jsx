//handle details of one specific product item
import React from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product=()=> {
  const {productId} = useParams();
  console.log(productId)
  const {products, Currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] =useState(false);
  const [image, setImage] = useState('');
  const [sizes, setSizes] = useState('')
  

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item.id == productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
    
  }

  useEffect(()=>{
    fetchProductData()

  }, [productId, products])
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*Displaying product data*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*displaying product images*/}
        <div className='flex sm:flex overflow-x-auto sm:overflow-y-scroll justify-between sm:justitfy-normal sm:w-[18.7%] w-full'>
          <div className='flex flex-col sm:w-[18.7%] w-full gap-3'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full max-h-[600px] object-contain' src={image} alt="" />
          </div>
        </div>
        {/*product information*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.starIcon} alt="" className="w-5 5" />
            <img src={assets.starIcon} alt="" className="w-5 5" />
            <img src={assets.starIcon} alt="" className="w-5 5" />
            <img src={assets.starIcon} alt="" className="w-5 5" />
            <img src={assets.dullIcon} alt="" className="w-5 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{Currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
    
          <div className='flex flex-col gap-4 my-8'>
            
            <p>Select Sizes</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index)=>(
                <button onClick={()=>setSizes(item)} className={`border py-2 px-4 bg-gray-100 ${item === sizes ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData.id,sizes)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/*----Description and review section*/}

      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>
            This product is designed with comfort and style in mind, making it suitable for different occasions. It can be easily paired with other pieces in your wardrobe to create a stylish and comfortable outfit
          </p>
          <p>Please select your preferred size before adding the product to your cart</p>

        </div>
      </div>
      {/*----Display Related Products----*/}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
